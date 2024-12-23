import project from 'platformxdb-clientmodule/db/models/project.js';
import client from "platformxdb-clientmodule/db/models/client.js";
import sow from "platformxdb-clientmodule/db/models/sow.js";
import projectPostingGroup from "platformxdb-clientmodule/db/models/project_posting_group.js";
import wipMethods from "platformxdb-clientmodule/db/models/wip_method.js";
import location from "platformxdb-clientmodule/db/models/location.js";
import constants from '../../config/constants.js';
import logger from '../../logging/logger.js';
import { Sequelize, Op } from "sequelize";

// Create a new project under SOW
const createProject = async (newProject) => {
    try {
        // Fetch the last project record based on the projectNo
        const lastProject = await project.findOne({
            order: [['id', 'DESC']],
            limit: 1
        });

        // Initialize projectNo
        let projectNo;

        if (lastProject && lastProject.id) {
            // Increment and format to five digits
            const nextProjectId = lastProject.id + 1;
            projectNo = `${newProject.sowNo}-PRJ${nextProjectId.toString().padStart(4, '0')}`;
        } else {
            projectNo = `${newProject.sowNo}-PRJ0001`;
        }

        // Update the newProject object with the new projectNo and createdAt
        newProject.projectNo = projectNo;

        // Create the new project in the database
        const createdProject = await project.create(newProject);
        logger.logger.info(constants.PROJECT_API.LOGGER.INFO.PROJECT_CREATION_SUCCESS);

        // Return only project and its properties
        return createdProject.get({ plain: true });
    } catch (error) {
        throw new Error(`${constants.PROJECT_API.ERROR_MESSAGES.ERROR}: ${error.message}`);
    }
};

const getProjectByProjectId = async (clientId, sowId, projectId) => {
    try {
        const foundProject = await project.findOne({
            include: [
                {
                    model : client,
                    as: 'client',
                    attributes: ['id', 'customerNo', 'name'],
                    required: false,
                },
                {
                    model : sow,
                    as: 'sow',
                    attributes: ['id', 'sowNo'],
                    required: false,
                },
                {
                    model : projectPostingGroup,
                    as: 'projectPostingGroup',
                    attributes: ['id', 'description'], 
                    required: false,
                },
                {
                    model : wipMethods,
                    as: 'wipMethod',
                    attributes: ['id', 'description'], 
                    required: false,
                },
                {
                    model : location,
                    as: 'location',
                    attributes: ['id', 'name'],
                    required: false,
                }
            ],
            where: { 
                sowId: sowId,
                customerId: clientId,
                id: projectId
            },
        });
        return mapProject(foundProject);
    } catch (error) {
        console.error(error.message);
        logger.logger.error(error);
        throw new Error(`Error while getting project: ${error.message}`);
    }
};

const getAllProjects = async (clientId, sowId, searchTerm, sortField = 'projectNo', sortOrder = 'ASC', pageNumber = 1, pageSize = 0) => {
    try { 
        // If pageNumber or pageSize is 0, skip pagination
        let projects;
        let totalRecords;

        if (pageSize === 0) {
            // Fetch all Projects without pagination
            [totalRecords, projects] = await Promise.all([
                getTotalProjectRecords(clientId, sowId, searchTerm),
                getProjectsBySearchTerm(clientId, sowId, searchTerm, sortField, sortOrder),
            ]);
        }else {
            // Calculate offset for pagination
            const offset = (pageNumber - 1) * pageSize;

            // Fetch total record count and paginated results in parallel
            [totalRecords, projects] = await Promise.all([
                getTotalProjectRecords(clientId, sowId, searchTerm),
                getProjectsBySearchTerm(clientId, sowId, searchTerm, sortField, sortOrder, offset, pageSize),
            ]);
        }

        // Return result with total records and data
        return {
            pageNumber,
            pageSize,
            totalRecords,
            totalPages: pageSize === 0 ? 1 : Math.ceil(totalRecords / pageSize),
            data: mapProjects(projects),
        };
    } catch (error) {
        console.error(`Error fetching Projects: ${error.message}`);
        throw new Error(`Error fetching Projects: ${error.message}`);
    }
};

// Private method to fetch projects
const getProjectsBySearchTerm = async (clientId, sowId, searchTerm, sortField, sortOrder, offset = 0, pageSize = null) => {
    try {
        const queryOptions = buildQueryOptions(clientId, sowId, searchTerm, sortField, sortOrder, pageSize, offset);
        const projects = await project.findAll(queryOptions);
        return projects;
    } catch (error) {
        throw error;
    }
};

const buildQueryOptions = (clientId, sowId, searchTerm, sortField, sortOrder, pageSize, offset) => {
    const isDateSearchTerm = !isNaN(Date.parse(searchTerm));
    const options = {
        include: [
            {
                model : client,
                as: 'client',
                attributes: ['id', 'customerNo', 'name'],
                required: false,
            },
            {
                model : sow,
                as: 'sow',
                attributes: ['id', 'sowNo'],
                required: false,
            },
            {
                model : projectPostingGroup,
                as: 'projectPostingGroup',
                attributes: ['id', 'description'], 
                required: false,
            },
            {
                model : wipMethods,
                as: 'wipMethod',
                attributes: ['id', 'description'],
                required: false,
            },
            {
                model : location,
                as: 'location',
                attributes: ['id', 'name'],
                required: false,
            }
        ],
        where: {
            [Sequelize.Op.and]: [
                { 
                    sowId: sowId,
                    customerId: clientId,
                }, // Ensure clientId and sowId matches
                searchTerm
                    ?  // Handle date separately if searchTerm is a valid date
                    (isDateSearchTerm
                        ? {
                            [Sequelize.Op.or]: [
                                { createdAt: { [Sequelize.Op.gte]: new Date(searchTerm) } },
                                { updatedAt: { [Sequelize.Op.gte]: new Date(searchTerm) } },
                                { startDate: { [Sequelize.Op.gte]: new Date(searchTerm) } },
                                { endDate: { [Sequelize.Op.gte]: new Date(searchTerm) } },
                                { projectCreatedDate: { [Sequelize.Op.gte]: new Date(searchTerm) } }
                            ]
                        }
                        :
                        {
                            [Sequelize.Op.or]: [
                                //Project fields
                                { projectNo: { [Op.iLike]: `%${searchTerm}%` } },
                                { description: { [Op.iLike]: `%${searchTerm}%` } },
                                { createdBy: { [Op.iLike]: `%${searchTerm}%` } },
                                { modifiedBy: { [Op.iLike]: `%${searchTerm}%` } },

                                // Customer fields
                                { '$client.customerNo$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$client.name$': { [Op.iLike]: `%${searchTerm}%` } },

                                // SOW
                                { '$sow.sowNo$': { [Op.iLike]: `%${searchTerm}%` } },

                                // Project Posting Group
                                { '$projectPostingGroup.description$': { [Op.iLike]: `%${searchTerm}%` } },
                                
                                // WIP Methods
                                { '$wipMethod.description$': { [Op.iLike]: `%${searchTerm}%` } },

                                // Location
                                { '$location.name$': { [Op.iLike]: `%${searchTerm}%` } },
                            ]
                        }
                    ) : {},
            ],
        },
        raw: true,
        nest: true,
        logging: console.log
    };

    // Add sorting if sorting is specified
    if (sortField) {
        options.order = [[sortField, sortOrder]];
    }

    // Add pagination if pageSize is specified
    if (pageSize) {
        options.limit = pageSize;
        options.offset = offset;
    }

    return options;
};

// Private method to get total Project record count
const getTotalProjectRecords = async (clientId, sowId, searchTerm) => {
    try {
        const searchConditions = buildQueryOptions(clientId, sowId,searchTerm);
        const ProjectCount = await project.count(searchConditions);
        return ProjectCount;
    } catch (error) {
        throw error;
    }
};

//Priveate method to map Projects
const mapProjects = (projects) => {
    return projects.map(mapProject);
};

//Priveate method to map each Project
const mapProject = (project) => ({
    id: project.id,
    customerId: project.clientId,
    customerNo: project['client']?.customerNo || null,
    customerName: project['client']?.name || null,
    sowId: project.sowId,
    sowNo: project['sow']?.sowNo || null,
    projectNo: project.projectNo,
    description: project.description,
    projectPostingGroupId: project['projectPostingGroup']?.id || null, 
    projectPostingGroupName: project['projectPostingGroup']?.description || null,
    wipMethodId: project['wipMethod']?.id || null,
    wipMethodName: project['wipMethod']?.description || null,
    locationId: project['location']?.id || null,
    locationName: project['location']?.name || null,
    createdBy: project.createdBy,
    modifiedBy: project.modifiedBy,
    projectCreatedDate: project.projectCreatedDate,
    startDate: project.startDate,
    endDate: project.endDate,
    createdAt: project.createdAt,
    updatedAt: project.updatedAt,
});

// Update existing project data
const updateProject = async (projectId, projectDataToUpdate) => {
    try {
        // Find the existing project by primary key
        const existingProject = await getProjectById(projectId);
        // Check if the client exists
        if (existingProject) {
            // Only update the fields that are present in the input data
            Object.keys(projectDataToUpdate).forEach((key) => {
                console.log("Key - :",key);
                console.log("Value - :",existingProject[key]);

                // Check for restricted fields that should not be updated
                if (key === 'id' || key === 'projectNo' || key === 'createdAt') {
                    throw new Error(constants.HTTP_STATUS_CODE.BAD_REQUEST);
                }
            });

            // Update the existing client with new data
            await existingProject.update(projectDataToUpdate);

            // Return the updated client object with only relevant properties
            return existingProject.get({ plain: true });
        }
        else {
            return existingProject;
        }

    } catch (error) {
        throw error;
    }
};

// Filtering specific project by project id
const getProjectById = async (projectId) => {
    try {
        return await project.findByPk(projectId);
    } catch (error) {
        throw error;
    }
}


export default {
    createProject,
    getProjectByProjectId,
    getAllProjects, 
    updateProject,
    getProjectById
};

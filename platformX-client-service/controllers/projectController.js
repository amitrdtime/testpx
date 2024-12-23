import projectService from '../services/projectService.js';
import camelcaseConverter from '../helper/camelcaseConverter.js';
import logger from '../logging/logger.js';
import constants from "../config/constants.js";

// Create a new project
const createProject = async (req, res) => {
  const newProject = req.body;
  const { sowId, clientId } = req;
  const projectAPI = constants.PROJECT_API;
  try {
    // Basic validation
    if (!newProject.description || newProject.description.trim() === '') {
      return res.status(400).json({ error: projectAPI.VALIDATION_MESSAGES.NAME_REQUIRED });
    }
  
    if (!newProject.createdBy || newProject.createdBy.trim() === '') {
      return res.status(400).json({ error: projectAPI.VALIDATION_MESSAGES.CREATEDBY_REQUIRED });
    }
    const createdProject = await projectService.createProject(newProject, sowId, clientId);
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(createdProject);
    return res.status(201).json(camelCaseResponse);
  } catch (err) {
    // Log the error for debugging purposes
    logger.logger.error(`${projectAPI.ERROR_MESSAGES.ERROR}: ${err.message}`);
    // General error response for unexpected issues
    return res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getProjectByProjectId = async (req, res) => {
  const { clientId, sowId } = req;   // Get clientId and sowId from req object
  const { projectId } = req.params;  // Get projectId from req.params
  try {
    const projectById = await projectService.getProjectByProjectId(clientId, sowId, projectId);
    if (!projectById || projectById.length === 0) {
      return res.status(404).json({ error: "Project " + constants.COMMON_ERROR_MESSAGES.NOT_FOUND });
    }
    res.status(200).json(projectById);
  } catch (error) {
    logger.logger.error(error);
    if (error.response) {
      if (error.response.status === 401) {
        return res.status(401).json({ error: constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED });
      } else if (error.response.status === 400) {
        return res.status(400).json({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST});
      }
    }
    res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

const getAllProjects = async (req, res) => {
  const { clientId, sowId } = req;  // Get clientId and sowId from req
  const { searchTerm = '', sortField = 'projectNo', sortOrder = 'asc', pageNumber = 1, pageSize = 0 } = req.query; // Get search, sort, pagination params from query

  try {
    const projects = await projectService.getAllProjects(clientId, sowId, searchTerm, sortField, sortOrder, parseInt(pageNumber), parseInt(pageSize));
    
    // Check if no projects found
    if (!projects || projects.length === 0) {
      return res.status(404).json({ error: "No projects found." });
    }

    // Convert keys to camelCase if necessary
    res.status(200).json(projects);
  } catch (error) {
    logger.logger.error(error);
    if (error.response) {
      if (error.response.status === 401) {
        return res.status(401).json({ error: constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED });
      } else if (error.response.status === 400) {
        return res.status(400).json({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
      }
    }
    res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// PATCH API : /clients/{clientId}/sow/{sowId}/project/{projectId} - Update specific project record with passed specific project data
const updateProject = async (req, res) => {
  const { clientId, sowId } = req;   // Get clientId and sowId from req object
  const { projectId } = req.params;
  console.log(req.body);
  const projectAPI = constants.PROJECT_API;
  try 
  {
    const projectDataToUpdate = req.body;
    //console.log('projectDataToUpdate-: ',projectDataToUpdate);

    if (!projectDataToUpdate || Object.keys(projectDataToUpdate).length === 0) {
      return res.status(400).json({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
    }

    //Update project
    const updatedProjectResponse = await projectService.updateProject(clientId, sowId, projectId, projectDataToUpdate);

    if (!updatedProjectResponse || Object.keys(updatedProjectResponse).length === 0) {
      return res.status(404).json({ error: projectAPI.ERROR_MESSAGES.PROJECT_NOT_FOUND.replace('{projectId}', projectId) });
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(updatedProjectResponse);
    res.status(200).json(camelCaseResponse);

  } catch (error) {
    logger.logger.error(error);
    if (error.message == constants.HTTP_STATUS_CODE.BAD_REQUEST) {
      return res.status(400).json({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
    }
    res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

export default {
  createProject, getProjectByProjectId, getAllProjects, updateProject
};
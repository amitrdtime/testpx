import logger from "../logging/logger.js";
import mockRepository from "../data/repositories/clientsMockDataRepository.js";
import projectRepository from "../data/repositories/projectRepository.js";
import constants from "../config/constants.js";

// Create a project
const createProject = async (newProject, sowId, clientId) => {
  try {
    newProject.sowId = sowId;
    newProject.customerId = clientId;
    const createdProject = await projectRepository.createProject(newProject);
    return createdProject;
  } catch (error) {
    throw new Error(`${constants.PROJECT_API.ERROR_MESSAGES.ERROR}: ${error.message}`);
  }
};

// Get Project by Id
const getProjectByProjectId = async (clientId, sowId, projectId) => {
  try {
    const projectById = await projectRepository.getProjectByProjectId(clientId, sowId, projectId);
    if (projectById || projectById.length > 0) {
      return projectById
    }
  } catch (error) {
    logger.logger.error(error);
    throw error;
  }
};

const getAllProjects = async (clientId, sowId, searchTerm, sortField = 'projectNo', sortOrder = 'ASC', pageNumber = 1, pageSize = 0) => {
  try {
    // Validate input parameters
    validateInput(searchTerm, sortOrder, pageNumber, pageSize);

    const projects = await projectRepository.getAllProjects(clientId, sowId,
      searchTerm,
      sortField,
      sortOrder,
      pageNumber,
      pageSize);

    return projects;
  } catch (error) {
    logger.logger.error(error);
    throw error;
  }
};

// Private method to validate input parameters
const validateInput = (searchTerm, sortOrder, pageNumber, pageSize) => {
  if (typeof searchTerm !== 'string') {
    throw new Error('searchTerm must be a string');
  }
  if (!['ASC', 'DESC'].includes(sortOrder.toUpperCase())) {
    throw new Error('sortOrder must be either "ASC" or "DESC"');
  }
  if (typeof pageNumber !== 'number' || pageNumber < 1) {
    throw new Error('pageNumber must be a positive number');
  }
  if (typeof pageSize !== 'number') {
    throw new Error('pageSize must be a positive number');
  }
};

// Update existing project data in application database
const updateProject = async (clientId, sowId, projectId, projectDataToUpdate) => {
  try {
    // Call updateProject with both projectId and projectDataToUpdate
    const updatedProjectResponse = await projectRepository.updateProject(projectId, projectDataToUpdate);

    return updatedProjectResponse;
  } catch (error) {
    logger.logger.error(
      `${constants.PROJECT_API.ERROR_MESSAGES.ERROR}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

export default { createProject, getProjectByProjectId, getAllProjects, updateProject };
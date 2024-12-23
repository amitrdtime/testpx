import projectService from '../services/projectService.js';
import camelcaseConverter from '../helper/camelcaseConverter.js';
import logger from '../logging/logger.js';

// Create a new Project
const createProject = async (req, res) => {
  const projectDetails = req.body;
  try {
    logger.logger.info("Creating Project");
    const newProject = await projectService.createProject(projectDetails);
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(newProject);
    res.status(201).json(camelcaseConverter.keysToCamelCase(camelCaseResponse));
    logger.logger.info('Create Project success!!');
  } catch (err) {
    logger.logger.error(`Create Project failed!!..${err}`);
    res.status(500).json({ error: 'Error creating Project' });
  }
};
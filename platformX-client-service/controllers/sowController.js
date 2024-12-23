import sowService from '../services/sowsService.js';
import camelcaseConverter from '../helper/camelcaseConverter.js';
import logger from '../logging/logger.js';
import constants from "../config/constants.js";

// Get Sows with paginated result by applied search term with sorting
const getSows = async (req, res) => {
  const clientId  = req.params.clientid; // Extracting clientId from the path parameter
  const { searchTerm = '',
    sortField = 'createdAt',
    sortOrder = 'DESC',
    pageNumber = 1,
    pageSize = 0 } = req.query;
  try {
    const results = await sowService.getSows(clientId, searchTerm, sortField, sortOrder,
      parseInt(pageNumber),
      parseInt(pageSize)
    );
    if (!results || results.length === 0) {
      return res.status(404).json({
        error: constants.SOW_API.ERROR_MESSAGES.SOWS_NOT_FOUND.replace('{clientId}', clientId)
      });
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(results);
    res.json(camelCaseResponse);
  } catch (error) {
    logger.logger.error(error);
    if (error) {
      if (error.response && error.response.status === 401) {
        return res.status(401).json({ error: constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED });
      } else if (error.response && error.response.status === 400) {
        return res.status(400).json({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
      }
    }
    res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// Create a new Statement of Work (SOW)
const createSow = async (req, res) => {
  const newSow = req.body;
  const sowAPI = constants.SOW_API;
  // Basic validation
  if (!newSow.description) {
    return res.status(400).json({ error: sowAPI.VALIDATION_MESSAGES.DESCRIPTION_REQUIRED });
  }
  else if (!newSow.customerId) {
    return res.status(400).json({ error: sowAPI.VALIDATION_MESSAGES.CLIENT_NUMBER_REQUIRED });
  }
  else if (!newSow.createdBy || newSow.createdBy.trim() === '') {
    return res.status(400).json({ error: sowAPI.VALIDATION_MESSAGES.CREATEDBY_REQUIRED });
  }

  try {

    const createdSow = await sowService.createSow(newSow);

    // Convert response keys to camelCase
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(createdSow);

    return res.status(201).json(camelCaseResponse);
  } catch (err) {
    // Log the error for debugging purposes
    logger.logger.error(`${sowAPI.ERROR_MESSAGES.ERROR}: ${err.message}`);

    // Handle specific error responses based on status codes
    if (err.response) {
      const { status } = err.response;
      switch (status) {
        case 401:
          return res.status(401).json({ error: constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED });
        case 400:
          return res.status(400).json({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
        default:
          return res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
      }
    }
    // General error response for unexpected issues
    return res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// PATCH endpoint to update a SOW record
const updateSow = async (req, res) => {
  try {
    const sowId = req.params.sowid;
    const clientId = req.params.clientid;
    const sowDataToUpdate = req.body;

    logger.logger.info(`SOW to update : ${sowDataToUpdate}`);
    if (!sowDataToUpdate || Object.keys(sowDataToUpdate).length === 0) {
      return res.status(400).json({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
    }
    // Basic validation
    if (!sowDataToUpdate.description) {
      return res.status(400).json({ error: constants.SOW_API.VALIDATION_MESSAGES.DESCRIPTION_REQUIRED });
    }
    else if (!sowDataToUpdate.customerId) {
      return res.status(400).json({ error: constants.SOW_API.VALIDATION_MESSAGES.CLIENT_NUMBER_REQUIRED });
    } else if (!sowDataToUpdate.modifiedBy || sowDataToUpdate.modifiedBy.trim() === '') {
      return res.status(400).json({ error: constants.SOW_API.VALIDATION_MESSAGES.MODIFIEDBY_REQUIRED });
    }

    const updatedSowResponse = await sowService.updateSow(sowId, clientId, sowDataToUpdate);
    if (!updatedSowResponse || Object.keys(updatedSowResponse).length === 0) {
      return res.status(404).json({
        error: constants.SOW_API.ERROR_MESSAGES.SOW_NOT_FOUND.replace('{id}', sowId)
          .replace('{clientId}', clientId)
      });
    }

    const camelCaseResponse = camelcaseConverter.keysToCamelCase(updatedSowResponse);
    res.status(200).json(camelCaseResponse);

  } catch (error) {
    logger.logger.error(error);
    if (error) {
      if (error.response && error.response.status === 401) {
        return res.status(401).json({ error: constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED });
      } else if (error.message.includes(constants.HTTP_STATUS_CODE.BAD_REQUEST) || (error.response && error.response.status === 400)) {
        return res.status(400).json({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
      }
    }
    res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// Get API to Get specific SOW by client Id and SOW Id
const getSowByClientIdSowId = async (req, res) => {

  const sowId = req.params.sowid;
  const clientId = req.params.clientid;
  try {

    const sow = await sowService.getSowByClientIdSowId(clientId, sowId);

    if (!sow || Object.keys(sow).length === 0) {
      return res.status(404).json({
        error: constants.SOW_API.ERROR_MESSAGES.SOW_NOT_FOUND.replace('{id}', sowId)
          .replace('{clientId}', clientId)
      });
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(sow);
    return res.status(200).json(camelCaseResponse);
  } catch (error) {
    logger.logger.error(error);
    res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

export default {
  getSows,
  createSow,
  updateSow,
  getSowByClientIdSowId
};
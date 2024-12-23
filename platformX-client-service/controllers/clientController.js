import clientService from '../services/clientService.js';
import camelcaseConverter from '../helper/camelcaseConverter.js';
import logger from '../logging/logger.js';
import constants from "../config/constants.js";

// POST API : /clients - Create a new customer
const createCustomer = async (req, res) => {
  const newCustomer = req.body;
  const clientAPI = constants.CLIENT_API;

  // Basic validation for required fields
  if (!newCustomer.name || newCustomer.name.trim() === '') {
    return res.status(400).json({ error: clientAPI.VALIDATION_MESSAGES.NAME_REQUIRED });
  }

  if (!newCustomer.createdBy || newCustomer.createdBy.trim() === '') {
    return res.status(400).json({ error: clientAPI.VALIDATION_MESSAGES.CREATEDBY_REQUIRED });
  }

  // Validate ID fields
  const idFields = [
    'countryRegionId',
    'languageId',
    'formatRegionId',
    'contactId'
  ];

  for (const field of idFields) {
    const value = newCustomer[field];
    if (value !== null && value !== undefined && isNaN(value)) {
      return res.status(400).json({ error: `${field + clientAPI.VALIDATION_MESSAGES.IDFIELD_VALUE_REQUIRED_IFNOTNULL}` });
    }
  }

  try {
    // Customer creation
    const createdCustomer = await clientService.createCustomer(newCustomer);

    // Convert response keys to camelCase
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(createdCustomer);

    return res.status(201).json(camelCaseResponse);
  } catch (err) {
    // Log the error for debugging purposes
    logger.logger.error(`${clientAPI.ERROR_MESSAGES.ERROR}: ${err.message}`);
    // General error response for unexpected issues
    return res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// PATCH API : /clients/{id} - Update specific customer record with passed specific customer properties
const updateCustomer = async (req, res) => {
  const clientAPI = constants.CLIENT_API;
  try {
    const customerId = req.params.id;
    const customerDataToUpdate = req.body;

    if (!customerDataToUpdate || Object.keys(customerDataToUpdate).length === 0) {
      return res.status(400).json({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
    }
    if (!customerDataToUpdate.modifiedBy || customerDataToUpdate.modifiedBy.trim() === '') {
      return res.status(400).json({ error: clientAPI.VALIDATION_MESSAGES.MODIFIEDBY_REQUIRED });
    }

    // Validate ID fields
    const idFields = [
      'countryRegionId',
      'languageId',
      'formatRegionId',
      'contactId'
    ];

    for (const field of idFields) {
      const value = customerDataToUpdate[field];
      if (value !== null && value !== undefined && isNaN(value)) {
        return res.status(400).json({ error: `${field} ${clientAPI.VALIDATION_MESSAGES.IDFIELD_VALUE_REQUIRED_IFNOTNULL}` });
      }
    }

    //Update customer
    const updatedCustomerResponse = await clientService.updateCustomer(customerId, customerDataToUpdate);

    if (!updatedCustomerResponse || Object.keys(updatedCustomerResponse).length === 0) {
      return res.status(404).json({ error: clientAPI.ERROR_MESSAGES.CLIENT_NOT_FOUND.replace('{clientId}', customerId) });
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(updatedCustomerResponse);
    res.status(200).json(camelCaseResponse);

  } catch (error) {
    logger.logger.error(error);
    if (error.message == constants.HTTP_STATUS_CODE.BAD_REQUEST) {
      return res.status(400).json({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
    }
    res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// GET API : /clients - Get customers with pagination/without pagination
const getCustomers = async (req, res) => {
  const { searchTerm = '', sortField = 'name', sortOrder = 'asc', pageNumber = 1, pageSize = 0 } = req.query;
  try {
    const results = await clientService.getCustomers(searchTerm, sortField, sortOrder, parseInt(pageNumber), parseInt(pageSize));

    // Check if results are empty
    if (!results || results.length === 0) {
      return res.status(404).json({ error: constants.CLIENT_API.ERROR_MESSAGES.CLIENTS_NOT_FOUND });
    }

    res.json(results);
  } catch (error) {
    logger.logger.error(error);
    res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// Get API : /clients/{id} - Get specific customer by Id
const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {

    //Get specific customer by customer id
    const customer = await clientService.getCustomerById(id);

    if (!customer || Object.keys(customer).length === 0) {
      return res.status(404).json({ error: constants.CLIENT_API.ERROR_MESSAGES.CLIENT_NOT_FOUND.replace('{clientId}', id) });
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(customer);
    return res.status(200).json(camelCaseResponse);
  } catch (error) {
    logger.logger.error(error);
    res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

export default {
  createCustomer,
  updateCustomer,
  getCustomers,
  getCustomerById
};
import axios from "axios";
import config from "../config/config.js";
import constants from "../config/constants.js";
import accessTokenService from "../services/accessTokenService.js";
import logger from "../logging/logger.js";
import customer from "../domain/models/customer.js";
import mockRepository from "../data/repositories/clientsMockDataRepository.js";
import clientRepository from "../data/repositories/clientRepository.js";
import clientsMockDataRepository from "../data/repositories/clientsMockDataRepository.js";

// Create a customer in application database 
const createCustomer = async (newCustomer) => {
  try {
    const newClient = await clientRepository.createCustomer(newCustomer);
    return newClient;
  } catch (error) {
    throw new Error(`${constants.CLIENT_API.ERROR_MESSAGES.ERROR}: ${error.message}`);
  }
};

// Update a customer data in application database
const updateCustomer = async (customerId, customerDataToUpdate) => {
  try {
    // Call updateCustomer with both customerId and customerDataToUpdate
    const updatedCustomerResponse = await clientRepository.updateCustomer(customerId, customerDataToUpdate);

    return updatedCustomerResponse;
  } catch (error) {
    logger.logger.error(
      `${constants.CLIENT_API.ERROR_MESSAGES.ERROR}:`,
      error.response ? error.response.data : error.message
    );
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

// Service to get customers based on search term, pagination, and sorting
const getCustomers = async (searchTerm, sortField = 'createdAt', sortOrder = 'DESC', pageNumber = 1, pageSize = 10) => {
  try {
    // Validate input parameters
    validateInput(searchTerm, sortOrder, pageNumber, pageSize);

    // Default to sorting by createdAt if no sortField is provided
    const sortCriteria = [[sortField, sortOrder.toUpperCase()]];

    // Get the customer data with search, pagination, and sorting
    const customerData = await clientRepository.getCustomers(
      searchTerm,
      sortField,
      sortOrder,
      pageNumber,
      pageSize
    );

    return customerData;
  } catch (error) {
    console.error(`${constants.CLIENT_API.ERROR_MESSAGES.CLIENT_FETCH_FAILED}: ${error.message}`);
    throw new Error(`${constants.CLIENT_API.ERROR_MESSAGES.CLIENT_FETCH_FAILED}: ${error.message}`);
  }
};

// Get customer by Id
const getCustomerById = async (id) => {
  try {
    const customer = await clientRepository.getCustomerById(id);
    // Check if the client exists
    if (customer) {
      // Return only customer customer and its properties
      const plainCustomerObject= customer.get({ plain: true });
      return clientRepository.mapCustomer(plainCustomerObject);
    }
    return customer;
  } catch (error) {
    logger.logger.error(error);
    throw error;
  }
};

const d365API = axios.create({
  baseURL: config.D365_API_URL,
});

// Interceptor to set the token
d365API.interceptors.request.use(
  async (request) => {
    if (!config.ACCESS_TOKEN) {
      config.ACCESS_TOKEN = await accessTokenService.getDynamicTokenvalue();
    }
    request.headers.Authorization = `Bearer ${config.ACCESS_TOKEN}`;
    return request;
  },
  (error) => {
    logger.logger.error(
      `Error resolving promise for d365 intereceptor: ${error}`
    );
    return Promise.reject(error);
  }
);

// Create a customer in D365
const createD365Customer = async (newCustomer) => {
  try {
    const customerCreationAPIURL = `${config.D365_API_Base_URL}/${config.API_Version}/${config.tenantId}/${config.D365_env}/api/${config.API_Version}/companies(${config.companyId})/customers`;
    const response = await d365API.post(customerCreationAPIURL, newCustomer);
    const createdCustomer = new customer(response.data);
    return createdCustomer;
  } catch (error) {
    console.error(
      `${constants.CLIENT_API.ERROR_MESSAGES.ERROR}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Update a customer in D365
const updateD365Customer = async (customerId, odataEtag, customerDataToUpdate) => {
  try {
    const customerUpdateAPIURL = `${config.D365_API_Base_URL}/${config.API_Version}/${config.tenantId}/${config.D365_env}/api/${config.API_Version}/companies(${config.companyId})/customers(${customerId})`;
    const response = await d365API.patch(
      customerUpdateAPIURL,
      customerDataToUpdate,
      {
        headers: {
          "If-Match": odataEtag, // Set If-Match header to handle optimistic concurrency
          "Content-Type": "application/json",
        },
      }
    );
    const updatedCustomer = new customer(response.data);
    return updatedCustomer;
  } catch (error) {
    console.error(
      `${constants.CLIENT_API.ERROR_MESSAGES.ERROR}:`,
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};

// Get customer by Id
const getD365CustomerById = async (id) => {
  try {
    const customerAPIURL = `${config.D365_API_Base_URL}/${config.API_Version}/${config.tenantId}/${config.D365_env}/api/${config.API_Version}/companies(${config.companyId})/customers(${id})`;

    const response = await d365API.get(customerAPIURL);
    return response.data;
  } catch (error) {
    logger.logger.error(error);
    throw error;
  }
};

export default {
  createCustomer,
  updateCustomer,
  getCustomers,
  getCustomerById
};

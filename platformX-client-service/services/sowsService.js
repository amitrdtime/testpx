import axios from "axios";
import config from "../config/config.js";
import accessTokenService from "./accessTokenService.js";
import logger from "../logging/logger.js";
import sowDetail from "../domain/models/sowDetail.js";
import crypto from 'crypto';
import sowRepository from "../data/repositories/sowRepository.js";
import constants from "../config/constants.js";

const d365API = axios.create({
  baseURL: config.D365_API_MetaData_URL,
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

// Create a SOWs in D365
const createSow = async (newSow) => {
  try {
    const newSowData = await sowRepository.createSow(newSow);
    return newSowData;
  } catch (error) {
    throw new Error(`${constants.SOW_API.ERROR_MESSAGES.ERROR}: ${error.message}`);
  }
};

// Update a SOW data in application database
const updateSow = async (sowId, clientId, sowDataToUpdate) => {
  try {
    // Call updateSow with both sowId and sowDataToUpdate
    const updatedSowResponse = await sowRepository.updateSow(sowId, clientId, sowDataToUpdate);
    if (updatedSowResponse) {
      return sowRepository.mapSOW(updatedSowResponse);
      }
    return updatedSowResponse;
  } catch (error) {
    logger.logger.error(
      `${constants.SOW_API.ERROR_MESSAGES.ERROR_UPDATING_SOW}:`,
      error.response ? error.response.data : error.message
    );
    throw new Error(`${constants.SOW_API.ERROR_MESSAGES.ERROR_UPDATING_SOW}: ${error.message}`);
  }
};

// Get customer by Id
const getSowByClientIdSowId = async (clientId, sowId) => {
  try {
    const  sowPlain  = (await sowRepository.getSowByClientIdAndSowId(sowId,clientId)).sowPlain;
    if (sowPlain) {
    return sowRepository.mapSOW(sowPlain);
    }
  } catch (error) {
    logger.logger.error(error);
    throw error;
  }
};

// Service to get SOWs based on search term, pagination, and sorting
const getSows = async (clientId,searchTerm, sortField = 'createdAt',
   sortOrder = 'DESC', 
   pageNumber = 1, pageSize = 0) => {
  try {
      // Validate input parameters
      validateInput(searchTerm, sortOrder, pageNumber, pageSize);    

      // Get the SOW data with search, pagination, and sorting
      const sowData = await sowRepository.getSOWs(clientId,
          searchTerm, 
          sortField,sortOrder, 
          pageNumber, 
          pageSize
      );

      return sowData;
  } catch (error) {
    logger.logger.error(
      `${constants.SOW_API.ERROR_MESSAGES.SOW_FETCH_FAILED}: ${error.message}`
    );
      throw new Error(`${constants.SOW_API.ERROR_MESSAGES.SOW_FETCH_FAILED}: ${error.message}`);
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

// Get SOWs with paginated result by applied search term with sorting from D365
const getD365Sows = async (
  clientNo,
  searchTerm,
  sortField = "Description",
  sortOrder = "asc",
  pageNumber = 1,
  pageSize = 10
) => {
  try {
    const sowAPIURL = `${config.D365_API_MetaData_URL}/Job_List`;
    let filters = [];

    if (searchTerm) {
      // Define the filter for each field
      filters = [
        `contains(No,'${searchTerm}')`,
        `contains(Description,'${searchTerm}')`,
        `contains(Bill_to_Customer_Name,'${searchTerm}')`,
        `contains(Bill_to_Customer_No,'${searchTerm}')`,
        `contains(Status,'${searchTerm}')`,
        `contains(Person_Responsible,'${searchTerm}')`,
        `contains(PersonRespName,'${searchTerm}')`,
        `contains(Job_Type,'${searchTerm}')`,
        `contains(Custom_Project_Manager,'${searchTerm}')`,
        `contains(ProjectMgrName,'${searchTerm}')`
      ];
    }
    // Always apply filter for Bill_to_Customer_No = '0009'
    filters.push(`Bill_to_Customer_No eq '${clientNo}'`);

    let responses;
    if (filters.length > 0) {
      // Execute requests for each filter
      responses = await Promise.all(
        filters.map((filter) =>
          d365API.get(sowAPIURL, {
            params: {
              $filter: filter,
              $orderby: `${sortField} ${sortOrder}`,
            },
          })
        )
      );
    } else {
      // Execute a single request without filter
      responses = await Promise.all([
        d365API.get(sowAPIURL, {
          params: {
            $orderby: `${sortField} ${sortOrder}`,
          },
        }),
      ]);
    }

    // Combine and deduplicate results
    const combinedResults = responses.flatMap(
      (response) => response.data.value
    );

    const uniqueResults = [
      ...new Map(combinedResults.map((item) => [item.No, item])).values(),
    ];

    // Implement pagination
    const totalRecords = uniqueResults.length;
    const start = (pageNumber - 1) * pageSize;
    const paginatedResults = uniqueResults.slice(start, start + pageSize);
    const paginatedSowResults = paginatedResults.map(r => new sowDetail(r));

    const sowNumbers = paginatedSowResults.map(r => r.No);
    logger.logger.info("Sow Numbers", sowNumbers);
    const sowData = await mapLastModifiedToSows(sowNumbers, paginatedSowResults);
    const pagedResponse = {
      pageNumber: pageNumber,
      pageSize: pageSize,
      totalRecords: totalRecords,
      data: sowData,
    };

    return pagedResponse;
  } catch (error) {
    logger.logger.error(error);
    throw error;
  }
};


//Done for the D365 implementain
const mapLastModifiedToSows = async (
  sowNumbers, sows
) => {
  try {
    const sowAPIURL = `${config.D365_API_Base_URL}/${config.API_Version}/${config.tenantId}/${config.D365_env}/api/${config.API_Version}/companies(${config.companyId})/projects`;
    let response;
    let filters;

    if (sowNumbers != null && sowNumbers.length > 0) {

      const formattedSowNumbers = sowNumbers
        .map(number => `number eq '${number}'`)
        .join(' or ');

      filters = [
        `${formattedSowNumbers}`
      ];
    }

    if (filters != null && filters.length > 0) {
      // Execute requests for each filter
      response = await Promise.all(
        filters.map((filter) =>
          d365API.get(sowAPIURL, {
            params: {
              $filter: filter,
              $select: 'number,lastModifiedDateTime'
            },
          })
        )
      );
    } else {
      // Execute a single request without filter
      response = await Promise.all([
        d365API.get(sowAPIURL, {
          params: {
            $select: 'number,lastModifiedDateTime'
          },
        }),
      ]);
    }

    // Flatten the response in case there are multiple API calls
    const sowData = response.flatMap(res => res.data.value);

    // Map lastModifiedDate to corresponding SOWs based on No match
    sows.forEach(async (sow) => {
      const matchingSowData = sowData.find(data => data.number === sow.No);
      if (matchingSowData) {
        sow.lastModifiedDateTime = matchingSowData.lastModifiedDateTime;
      }
    });

    return sows;
  }
  catch (error) {
    logger.logger.error(error);
    throw error;
  }
};

const generateEtag = (data) => {
  return `W/"${crypto.createHash('sha256').update(data).digest('base64')}"`;
};


export default { getSows,  d365API, createSow, updateSow, getSowByClientIdSowId };

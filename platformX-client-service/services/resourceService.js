import axios from "axios";
import config from "../config/config.js";
import accessTokenService from "../services/accessTokenService.js";
import logger from "../logging/logger.js";
import resource from "../domain/models/resource.js";

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

  //Get Resources
const getResources = async () => {
    try {    
     const resourcesAPIURL =  `${config.D365_API_MetaData_URL}/Resources`;
     const response = await d365API.get(resourcesAPIURL);   
     const resources =response.data.value.map(r => new resource(r));
     return resources;   
    } catch (error) {
      logger.logger.error(error);
      throw error;
    }
  };
  
  export default {getResources,d365API};
  
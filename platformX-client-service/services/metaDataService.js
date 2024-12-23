import axios from "axios";
import config from "../config/config.js";
import accessTokenService from "../services/accessTokenService.js";
import logger from "../logging/logger.js";
import metadataRepository from "../data/repositories/metadataRepository.js";

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

//Returns configured countries
const getCountryRegions = async () => {
  try {
    return await metadataRepository.getCountryRegions();
  } catch (error) {
    logger.logger.error(error);
    throw error;
  };

};

//Returns configured zipcodes filtered by country/state/city
const getZipCodes = async (country) => {
  try {
    const zipCodeList = await metadataRepository.getZipCodes(country);
    if (zipCodeList && zipCodeList.length > 0) {   
      const updatedZipCodes = zipCodeList.map((zip) => ({
        id: zip.id,
        code: zip.code,
        city: zip.city,
        countryRegionCode: zip.countryRegionCode,
        state: zip.state,
        timeZone: zip.time_zone,
      }));

      return updatedZipCodes;
    }
  } catch (error) {
    logger.logger.error(error);
    throw error;
  }
};

//Returns configured customer contacts
const getContacts = async () => {
  try {
    const contactList = await metadataRepository.getContacts();
    if (contactList || contactList.length >0) {    
      const updatedContacts = contactList.map((contact) => ({
        id: contact.id,
        name: contact.name,
        number: contact.no,
      }));

      return updatedContacts;
    }
  } catch (error) {
    logger.logger.error(error);
    throw error;
  }
};

//Returns configured format regions
const getFormateRegions = async () => {
  try {
    const regionList = await metadataRepository.getFormateRegions();
    if (regionList || regionList.length > 0) {    
      const updatedRegions = regionList.map((region) => ({
        id: region.id,
        name: region.region,
        language: region.language,
        region: region.state,
      }));

      return updatedRegions;
    }
  } catch (error) {
    logger.logger.error(error);
    throw error;
  }
};

//Returns configured languages
const getLanguages = async () => {
  try {
    const languageList = await metadataRepository.getLanguages()
    if (languageList || (languageList && languageList.length > 0)) {
           const updatedLanguages = languageList.map((lang) => ({
        id: lang.id,
        code: lang.code,
        name: lang.name,
        windowsLanguageId: lang.windowsLanguageId,
        windowsLanguageName: lang.windowsLanguageName,
      }));
      return updatedLanguages
    }
  } catch (error) {
    logger.logger.error(error);
    throw error;
  };
}

//Returns configured lookup records filtered by lookup type
const getLookUpType = async (lookupType) => {
  try {
    const lookup_types = await metadataRepository.getLookUpType(lookupType);
    if (lookup_types || lookup_types.length > 0) {
          const updatedlookup_types = lookup_types.map((p) => ({
        id: p.id,
        type: p.type,
        description: p.value
      }));
      return updatedlookup_types
    }
  } catch (error) {
    logger.logger.error(error);
    throw error;
  };
}

const getWorkInProgress = async () => {
  try {
    return await metadataRepository.getWipMethods();
  } catch (error) {
    logger.logger.error(error);
    throw error;
  };
};

//Returns configured project posting groups
const getProjectPostingGroup = async () => {
  try {
    const project_posting_groups = await metadataRepository.getProjectPostingGroup();
    if (project_posting_groups || project_posting_groups.length > 0) {
           const updatedPostingGroups = project_posting_groups.map((p) => ({
        id: p.id,
        code: p.code,
        description: p.description,
      }));
      return updatedPostingGroups
    }
  } catch (error) {
    logger.logger.error(error);
    throw error;
  };
}

const getResources = async () => {
  try {
    const resources = await metadataRepository.getResources();
    return resources
  } catch (error) {
    logger.logger.error(error);
    throw error;
  };
}

const getCurrencies = async () => {
  try {
    const currencies = await metadataRepository.getCurrencies();
    if (currencies || currencies.length > 0) {
          const updatedCurrencies = currencies.map((curr) => ({
        id: curr.id,
        code: curr.code,
        description: curr.description
      }));
      return updatedCurrencies
    }
  } catch (error) {
    logger.logger.error(error);
    throw error;
  };
}

const getLocations = async () => {
  try {
    const locations = await metadataRepository.getLocations();
    if (locations || locations.length > 0) {
    
      const updatedLocations = locations.map((l) => ({
        id: l.id,
        code: l.code,
        name: l.name
      }));
      return updatedLocations
    }
  } catch (error) {
    logger.logger.error(error);
    throw error;
  };
}

export default {
  d365API,
  getCountryRegions,
  getWorkInProgress,
  getZipCodes,
  getContacts,
  getFormateRegions,
  getLanguages,
  getLookUpType,
  getProjectPostingGroup,
  getResources,
  getCurrencies,
  getLocations
};

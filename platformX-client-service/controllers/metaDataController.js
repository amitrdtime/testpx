import metaDataService from '../services/metaDataService.js';
import camelcaseConverter from '../helper/camelcaseConverter.js';
import logger from '../logging/logger.js';
import constants from "../config/constants.js";

const getCountryRegions = async (req, res) => {
  try {
    const results = await metaDataService.getCountryRegions();
    if (!results || results.length === 0) {
      return res.status(404).json({ error: "Countries " + constants.COMMON_ERROR_MESSAGES.NOT_FOUND });
    }
    res.json(results);
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

const getZipCodes = async (req, res) => {
  const { country } = req.params; // Extract country from the request parameters
  try {
    const results = await metaDataService.getZipCodes(country); // Pass country parameter to the service
    if (!results || results.length === 0) {
      return res.status(404).json({ error: "Zipcodes "+constants.COMMON_ERROR_MESSAGES.NOT_FOUND+" for the specified country" });
    }
    res.json(results);
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

const getContacts = async (req, res) => {
  try {
    const results = await metaDataService.getContacts();
    if (!results || results.length === 0) {
      return res.status(404).json({ error:"Contacts " +constants.COMMON_ERROR_MESSAGES.NOT_FOUND });
    }
    res.json(results);
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

const getFormateRegions = async (req, res) => {
  try {
    const results = await metaDataService.getFormateRegions();
    if (!results || results.length === 0) {
      return res.status(404).json({ error: "Formate Regions " +constants.COMMON_ERROR_MESSAGES.NOT_FOUND });
    }
    res.json(results);
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

const getLanguages = async (req, res) => {
  try {
    const results = await metaDataService.getLanguages();
    if (!results || results.length === 0) {
      return res.status(404).json({ error: "Languages " +constants.COMMON_ERROR_MESSAGES.NOT_FOUND });
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(results);
    res.status(200).json(camelCaseResponse);
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

const getLookUpType = async (req, res) => {
  try {
    const { lookuptype } = req.params;
    const lookupTypes = await metaDataService.getLookUpType(lookuptype);
    if (!lookupTypes || lookupTypes.length === 0) {
      return res.status(404).json({ error:"LookUp Type " +constants.COMMON_ERROR_MESSAGES.NOT_FOUND });
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(lookupTypes);
    res.status(200).json(camelCaseResponse);
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

  };
};

// Project Posting
const getProjectPostingGroup = async (req, res) => {
  try {
    const projectPostingGroups = await metaDataService.getProjectPostingGroup();
    if (!projectPostingGroups || projectPostingGroups.length === 0) {
      return res.status(404).json({ error:"Project Posting Group " +constants.COMMON_ERROR_MESSAGES.NOT_FOUND});
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(projectPostingGroups);
    res.status(200).json(camelCaseResponse);
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

  };
}

// Api used for Project Mananger , Person Responsable lookups where in we onl needto disply Id,ResourceNumber, ResourceName
//So this Api included in metadata.
const getResources = async (req, res) => {
  try {
    const resources = await metaDataService.getResources();
    if (!resources || resources.length === 0) {
      return res.status(404).json({ error: "Resources " +constants.COMMON_ERROR_MESSAGES.NOT_FOUND });
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(resources);
    res.status(200).json(camelCaseResponse);
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

  };
};

const getCurrencies = async (req, res) => {
  try {
    const currencies = await metaDataService.getCurrencies();
    if (!currencies || currencies.length === 0) {
      return res.status(404).json({ error: "Currencies " +constants.COMMON_ERROR_MESSAGES.NOT_FOUND });
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(currencies);
    res.status(200).json(camelCaseResponse);
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

  };
};

const getLocations = async (req, res) => {
  try {
    const locations = await metaDataService.getLocations();
    if (!locations || locations.length === 0) {
      return res.status(404).json({ error: "Locations " +constants.COMMON_ERROR_MESSAGES.NOT_FOUND });
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(locations);
    res.status(200).json(camelCaseResponse);
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

  };
};

const getWip = async (req, res) => {
  try {
    const options = await metaDataService.getWorkInProgress();
    if (!options || options.length === 0) {
      return res.status(404).json({ error: "WIP Methods " + constants.COMMON_ERROR_MESSAGES.NOT_FOUND });
    }
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(options);
    res.status(200).json(camelCaseResponse);
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

export default {
  getCountryRegions,
  getWip,
  getZipCodes,
  getContacts,
  getFormateRegions,
  getLanguages,
  getLookUpType,
  getProjectPostingGroup,
  getResources,
  getCurrencies,
  getLocations
}
import logger from '../../logging/logger.js';
import languages from "platformxdb-clientmodule/db/models/language.js";
import contacts from "platformxdb-clientmodule/db/models/contact.js";
import formateRegion from "platformxdb-clientmodule/db/models/formatregion.js";
import project_posting_group from "platformxdb-clientmodule/db/models/project_posting_group.js";
import lookup_type from "platformxdb-clientmodule/db/models/lookup_type.js";
import countryRegion from "platformxdb-clientmodule/db/models/country_region.js";
import location from "platformxdb-clientmodule/db/models/location.js";
import currency from "platformxdb-clientmodule/db/models/currency.js";
import zip_code from "platformxdb-clientmodule/db/models/zip_code.js";
import resources from "platformxdb-clientmodule/db/models/resource.js";
import wip_methods from "platformxdb-clientmodule/db/models/wip_method.js";
import { Op } from 'sequelize';

//Returns configured countries
const getCountryRegions = async () => {
    try {
        return await countryRegion.findAll({ raw: true });
    } catch (error) {
        logger.logger.error(error);
        throw new Error(`Error while getting Country Regions: ${error.message}`);
    };
};

//Returns configured zipcodes filtered by country/state/city
const getZipCodes = async (country) => {
    try {
        const zipCodeList = await zip_code.findAll({
            where: { countryRegionCode: country },
            raw: true,
        });

        return zipCodeList;
    } catch (error) {
        logger.logger.error(error);
        throw new Error(`Error while getting ZipCodes: ${error.message}`);
    }
};

//Returns configured customer contacts
const getContacts = async () => {
    try {
        const contactList = await contacts.findAll({ raw: true });
        return contactList;
    } catch (error) {
        logger.logger.error(error);
        throw new Error(`Error while getting Contacts: ${error.message}`);
    }
};

//Returns configured format regions
const getFormateRegions = async () => {
    try {
        const regionList = await formateRegion.findAll({ raw: true });
        return regionList;
    } catch (error) {
        logger.logger.error(error);
        throw new Error(`Error while getting Formate Regions : ${error.message}`);
    }
};

//Returns configured languages
const getLanguages = async () => {
    try {
        const languageList = await languages.findAll({ raw: true });
        return languageList
    } catch (error) {
        logger.logger.error(error);
        throw new Error(`Error while getting Languages : ${error.message}`);
    };
}

//Returns configured lookup records filtered by lookup type
const getLookUpType = async (lookupType) => {
    try {
        const lookup_types = await lookup_type.findAll({
            raw: true,
            where: {
                type: lookupType, // Apply the filter for the lookupType
            },
        });
        return lookup_types
    } catch (error) {
        logger.logger.error(error);
        throw new Error(`Error while getting LookUp Type : ${error.message}`);
    };
}

//Returns configured project posting groups
const getProjectPostingGroup = async () => {
    try {
        const project_posting_groups = await project_posting_group.findAll({ raw: true });
        return project_posting_groups
    } catch (error) {
        logger.logger.error(error);
        throw new Error(`Error while getting Project Posting Group : ${error.message}`);
    };
}

const getCurrencies = async () => {
    try {
        const currencies = await currency.findAll({ raw: true });
        return currencies
    } catch (error) {
        logger.logger.error(error);
        throw new Error(`Error while getting currencies : ${error.message}`);
    };
}

const getLocations = async () => {
    try {
        const locations = await location.findAll({ raw: true });
        return locations
    } catch (error) {
        logger.logger.error(error);
        throw new Error(`Error while getting Locations : ${error.message}`);
    };
}

const getResources = async () => {
    try {
        const today = new Date(); // Get the current date
        const resourceList = await resources.findAll({
            where: {
                [Op.or]: [
                    { endDate: { [Op.is]: null } }, // Resources with no endDate (null)
                    { endDate: { [Op.gt]: today } } // Resources with endDate greater than today
                ]
            },
            raw: true,
            attributes: ['id', 'resourceNo', 'resourceName']  // Specify the required fields here
        });
        return resourceList
    } catch (error) {
        logger.logger.error(error);
        throw new Error(`Error while getting Resources : ${error.message}`);
    };
}

// Get WIP methods for projects
const getWipMethods = async () => {
    try {
        const wipMethodsList = await wip_methods.findAll({ raw: true });
        return wipMethodsList
    } catch (error) {
        logger.logger.error(error);
        throw new Error(`Error while getting WIP methods : ${error.message}`)
    }
}

export default {
    getCountryRegions,
    getZipCodes,
    getContacts,
    getFormateRegions,
    getLanguages,
    getLookUpType,
    getProjectPostingGroup,
    getCurrencies,
    getLocations,
    getResources,
    getWipMethods
};
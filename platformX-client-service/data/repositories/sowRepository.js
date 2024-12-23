import constants from '../../config/constants.js';
import logger from '../../logging/logger.js';
import sow from "platformxdb-clientmodule/db/models/sow.js";
import client from "platformxdb-clientmodule/db/models/client.js";
import countryRegion from "platformxdb-clientmodule/db/models/country_region.js";
import contact from "platformxdb-clientmodule/db/models/contact.js";
import resource from "platformxdb-clientmodule/db/models/resource.js";
import lookupType from "platformxdb-clientmodule/db/models/lookup_type.js";
import projectPostingGroup from "platformxdb-clientmodule/db/models/project_posting_group.js";
import currency from "platformxdb-clientmodule/db/models/currency.js";
import location from "platformxdb-clientmodule/db/models/location.js";
import { Sequelize, Op } from "sequelize";

// Create a new SOW
const createSow = async (newSow) => {
    try {
        // Fetch the last SOW record based on the sowNo
        const lastSow = await sow.findOne({
            order: [['id', 'DESC']],
            limit: 1
        });

        // Initialize sowNo
        let sowNo;

        if (lastSow && lastSow.sowNo) {
            // Extract the numeric part from the sowNo
            const lastsowNo = lastSow.sowNo;
            const numericPart = parseInt(lastsowNo.replace(/[^\d]/g, '')) || 0; // Remove non-numeric characters
            // Increment and format to five digits
            const nextsowNo = numericPart + 1;
            sowNo = `SOW${nextsowNo.toString().padStart(5, '0')}`; // Ensure it's always 8 characters (SOW + 5 digits)

        } else {
            sowNo = 'SOW00001'; // If no SOW exists, start with sowNo '1'
        }

        // Update the newSow object with the new sowNo
        newSow.sowNo = sowNo;

        // Create the new SOW in the database
        const createdSow = await sow.create(newSow);
        logger.logger.info(constants.SOW_API.LOGGER.INFO.SOW_CREATION_SUCCESS);

        // Return only SOW  and its properties
        return createdSow.get({ plain: true });
    } catch (error) {
        throw new Error(`${constants.SOW_API.ERROR_MESSAGES.ERROR}: ${error.message}`);
    }
};

// Update existing SOW data
const updateSow = async (sowId, clientId, sowDataToUpdate) => {
    try {
        // Find the existing SOW
        const { existingSow, sowPlain } = await getSowByClientIdAndSowId(sowId, clientId);

        // Check if the SOW exists
        if (existingSow) {
            // Only update the fields that are present in the input data
            Object.keys(sowDataToUpdate).forEach((key) => {
                // Verifying the request fields exist in the backend
                if (!Object.prototype.hasOwnProperty.call(sowPlain, key)) {
                    throw new Error(constants.HTTP_STATUS_CODE.BAD_REQUEST);
                }

                // Check for restricted fields that should not be updated
                if (key === 'id' || key === 'sowNo' || key === 'createdAt') {
                    throw new Error(constants.HTTP_STATUS_CODE.BAD_REQUEST);
                }
            });

            // Update the existing SOW with new data
            await existingSow.update(sowDataToUpdate);
            // Return the updated SOW object with only relevant properties
            return existingSow.get({ plain: true });
        }
        else {
            return existingSow;
        }

    } catch (error) {
        throw (error);
    }
};

//Get SOW by Client Id and SOW Id
const getSowByClientIdAndSowId = async (sowId, clientId) => {
    try {
        const existingSow = await sow.findOne({
            where: {
                id: sowId,       // SOW ID condition
                customerId: clientId  // Client ID condition
            },
            include: [
                {
                    model: client,
                    as: 'client',
                    attributes: ['id', 'name', 'customerNo', 'address', 'address2', 'city', 'state',
                        'zipCode', 'phoneNo', 'mobilePhoneNo', 'email'
                    ],
                    required: false,
                    include: [
                        {
                            model: countryRegion,
                            as: 'countryRegion',
                            attributes: ['id', 'code', 'name'],
                            required: false, // Set this to false if the countryRegion is optional
                        },
                        {
                            model: contact,
                            as: 'contact',
                            attributes: ['id', 'no', 'name'],
                            required: false,
                        }
                    ],
                },
                {
                    model: resource,
                    as: 'projectManager', // Alias for project manager
                    attributes: ['id', 'resourceNo', 'resourceName'],
                    required: false,
                },
                {
                    model: resource,
                    as: 'personResponsible', // Alias for person responsible
                    attributes: ['id', 'resourceNo', 'resourceName'],
                    required: false,
                },
                {
                    model: projectPostingGroup,
                    as: 'projectPostingGroup',
                    attributes: ['id', 'code', 'description'],
                    required: false,
                },
                {
                    model: currency,
                    as: 'invoiceCurrency',
                    attributes: ['id', 'code'],
                    required: false,
                },
                {
                    model: currency,
                    as: 'currency',
                    attributes: ['id', 'code'],
                    required: false,
                },
                {
                    model: lookupType,
                    as: 'jobType',
                    attributes: ['id', 'value'],
                    required: false,
                },
                {
                    model: lookupType,
                    as: 'sowStatus',
                    attributes: ['id', 'value'],
                    required: false,
                },
                {
                    model: lookupType,
                    as: 'exchCalculationCost',
                    attributes: ['id', 'value'],
                    required: false,
                },
                {
                    model: lookupType,
                    as: 'exchCalculationPrice',
                    attributes: ['id', 'value'],
                    required: false,
                },
                {
                    model: lookupType,
                    as: 'blocked',
                    attributes: ['id', 'value'],
                    required: false,
                },
                {
                    model: location,
                    as: 'location',
                    attributes: ['id', 'code', 'name'],
                    required: false,
                }
            ]
        });

        // Check if existingSow is found
        if (existingSow) {
            const sowPlain = existingSow.get({ plain: true }); // Get the plain object
            return { existingSow, sowPlain }; // Return both the instance and the plain object
        }

        // Return nulls if not found
        return { existingSow: null, sowPlain: null };
    } catch (error) {
        throw new Error(`${constants.SOW_API.ERROR_MESSAGES.SOW_FETCH_FAILED}: ${error.message}`);
    }
}

//Get all SOWs by Client Id
const getSOWs = async (clientId, searchTerm, sortField = 'createdAt', sortOrder = 'DESC', pageNumber = 1, pageSize = 0) => {
    try {
        // If pageNumber or pageSize is 0, skip pagination
        let sows;
        let totalRecords;

        if (pageNumber === 0 || pageSize === 0) {
            // Fetch all SOWs without pagination
            [totalRecords, sows] = await Promise.all([
                getTotalSOWRecords(clientId, searchTerm),
                getSOWsBySearchTerm(clientId, searchTerm, sortField, sortOrder),
            ]);
        } else {
            // Calculate offset for pagination
            const offset = (pageNumber - 1) * pageSize;

            // Fetch total record count and paginated results in parallel
            [totalRecords, sows] = await Promise.all([
                getTotalSOWRecords(clientId, searchTerm),
                getSOWsBySearchTerm(clientId, searchTerm, sortField, sortOrder, offset, pageSize),
            ]);
        }

        // Return result with total records and data
        return {
            pageNumber,
            pageSize,
            totalRecords,
            totalPages: pageSize === 0 ? 1 : Math.ceil(totalRecords / pageSize),
            data: mapSOWs(sows),
        };
    } catch (error) {
        throw new Error(`Error fetching SOWs: ${error.message}`);
    }
};

// Private method to fetch SOWs
const getSOWsBySearchTerm = async (clientId, searchTerm, sortField, sortOrder, offset = 0, pageSize = null) => {
    try {
        const queryOptions = buildQueryOptions(clientId, searchTerm, sortField, sortOrder, pageSize, offset);
        const clients = await sow.findAll(queryOptions);
        return clients;
    } catch (error) {
        throw error;
    }
};

// Private method to build query options
const buildQueryOptions = (clientId, searchTerm, sortField, sortOrder, pageSize, offset) => {
    const isDateSearchTerm = isDateValid(searchTerm);
    const options = {
        include: [
            {
                model: client,
                as: 'client',
                attributes: ['id', 'name', 'customerNo', 'address', 'address2', 'city', 'state',
                    'zipCode', 'phoneNo', 'mobilePhoneNo', 'email'
                ],
                required: false,
                include: [
                    {
                        model: countryRegion,
                        as: 'countryRegion',
                        attributes: ['id', 'code', 'name'],
                        required: false, // Set this to false if the countryRegion is optional
                    },
                    {
                        model: contact,
                        as: 'contact',
                        attributes: ['id', 'no', 'name'],
                        required: false,
                    }
                ],
            },
            {
                model: resource,
                as: 'projectManager', // Alias for project manager
                attributes: ['id', 'resourceNo', 'resourceName'],
                required: false,
            },
            {
                model: resource,
                as: 'personResponsible', // Alias for person responsible
                attributes: ['id', 'resourceNo', 'resourceName'],
                required: false,
            },
            {
                model: projectPostingGroup,
                as: 'projectPostingGroup',
                attributes: ['id', 'code', 'description'],
                required: false,
            },
            {
                model: currency,
                as: 'invoiceCurrency',
                attributes: ['id', 'code'],
                required: false,
            },
            {
                model: currency,
                as: 'currency',
                attributes: ['id', 'code'],
                required: false,
            },
            {
                model: lookupType,
                as: 'jobType',
                attributes: ['id', 'value'],
                required: false,
            },
            {
                model: lookupType,
                as: 'sowStatus',
                attributes: ['id', 'value'],
                required: false,
            },
            {
                model: lookupType,
                as: 'exchCalculationCost',
                attributes: ['id', 'value'],
                required: false,
            },
            {
                model: lookupType,
                as: 'exchCalculationPrice',
                attributes: ['id', 'value'],
                required: false,
            },
            {
                model: lookupType,
                as: 'blocked',
                attributes: ['id', 'value'],
                required: false,
            },
            {
                model: location,
                as: 'location',
                attributes: ['id', 'code', 'name'],
                required: false,
            }
        ],
        where: {
            [Sequelize.Op.and]: [
                { customerId: clientId }, // Ensure clientId matches
                searchTerm
                    ? // Handle date separately if searchTerm is a valid date
                    (isDateSearchTerm
                        ? {
                            [Sequelize.Op.or]: [
                                { createdAt: { [Sequelize.Op.gte]: new Date(searchTerm) } },
                                { updatedAt: { [Sequelize.Op.gte]: new Date(searchTerm) } },
                                { startingDate: { [Sequelize.Op.gte]: new Date(searchTerm) } },
                                { endingDate: { [Sequelize.Op.gte]: new Date(searchTerm) } }
                            ]
                        }
                        :

                        {
                            [Sequelize.Op.or]: [
                                // SOW fields
                                { sowNo: { [Op.iLike]: `%${searchTerm}%` } },
                                { description: { [Op.iLike]: `%${searchTerm}%` } },
                                { createdBy: { [Op.iLike]: `%${searchTerm}%` } },
                                { modifiedBy: { [Op.iLike]: `%${searchTerm}%` } },

                                // Customer fields
                                { '$client.customerNo$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$client.name$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$client.address$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$client.address2$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$client.city$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$client.state$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$client.zipCode$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$client.phoneNo$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$client.mobilePhoneNo$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$client.email$': { [Op.iLike]: `%${searchTerm}%` } },

                                // Country Region fields
                                { '$client.countryRegion.code$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$client.countryRegion.name$': { [Op.iLike]: `%${searchTerm}%` } },

                                // Contact fields
                                { '$client.contact.no$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$client.contact.name$': { [Op.iLike]: `%${searchTerm}%` } },

                                //Project Manager fields
                                { '$projectManager.resourceNo$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$projectManager.resourceName$': { [Op.iLike]: `%${searchTerm}%` } },

                                // Person Responsible fields
                                { '$personResponsible.resourceNo$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$personResponsible.resourceName$': { [Op.iLike]: `%${searchTerm}%` } },

                                // Job Type (lookupType)
                                { '$jobType.value$': { [Op.iLike]: `%${searchTerm}%` } },

                                // SOW Status (lookupType)
                                { '$sowStatus.value$': { [Op.iLike]: `%${searchTerm}%` } },

                                // Exchange Calculation Cost (lookupType)
                                { '$exchCalculationCost.value$': { [Op.iLike]: `%${searchTerm}%` } },

                                // Exchange Calculation Price (lookupType)
                                { '$exchCalculationPrice.value$': { [Op.iLike]: `%${searchTerm}%` } },

                                // Blocked (lookupType)
                                { '$blocked.value$': { [Op.iLike]: `%${searchTerm}%` } },

                                // Project Posting Group
                                { '$projectPostingGroup.code$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$projectPostingGroup.description$': { [Op.iLike]: `%${searchTerm}%` } },

                                // Location
                                { '$location.code$': { [Op.iLike]: `%${searchTerm}%` } },
                                { '$location.name$': { [Op.iLike]: `%${searchTerm}%` } },

                                // Invoice Currency
                                { '$invoiceCurrency.code$': { [Op.iLike]: `%${searchTerm}%` } },

                                //Currency
                                { '$currency.code$': { [Op.iLike]: `%${searchTerm}%` } }
                            ]
                        }
                    ) : {},
            ],
        },
        raw: true,
        nest: true,
       // logging: console.log
    };

    // Add sorting if sorting is specified
    if (sortField) {
        options.order = [[sortField, sortOrder]];
    }

    // Add pagination if pageSize is specified
    if (pageSize) {
        options.limit = pageSize;
        options.offset = offset;
    }

    return options;
};

// Private method to get total SOW record count
const getTotalSOWRecords = async (clientId, searchTerm) => {
    try {
        const searchConditions = buildQueryOptions(clientId, searchTerm);
        const sowCount = await sow.count(searchConditions);
        return sowCount;
    } catch (error) {
        throw error;
    }
};

//Priveate method to map SOWs
const mapSOWs = (sows) => {
    return sows.map(mapSOW);
};

//Priveate method to map SOW
const mapSOW = (sow) => ({
    id: sow.id,
    description: sow.description,
    sowNo: sow.sowNo,
    customerNo: sow['client']?.customerNo || null,
    customerName: sow['client']?.name || null,
    address: sow['client']?.address || null,
    address2: sow['client']?.address2 || null,
    city: sow['client']?.city || null,
    cityToState: sow['client']?.state || null,
    zipCode: sow['client']?.zipCode || null,
    countryRegion: sow['client']?.countryRegion?.name || null,
    contactNo: sow['client']?.contact?.no || null,
    phoneNo: sow['client']?.phoneNo || null,
    mobileNo: sow['client']?.mobilePhoneNo || null,
    email: sow['client']?.email || null,
    contact: sow['client']?.contact?.name || null,

    // Project Manager fields from resource (projectManager alias)
    projectManagerId: sow['projectManager']?.id || null,
    projectManagerNo: sow['projectManager']?.resourceNo || null, // Project Manager resourceNo
    projectManagerName: sow['projectManager']?.resourceName || null, // Project Manager name

    // Person Responsible fields from resource (personResponsible alias)
    personResponsibleId: sow['personResponsible']?.id || null,
    personResponsibleNo: sow['personResponsible']?.resourceNo || null, // Person Responsible resourceNo
    personResponsibleName: sow['personResponsible']?.resourceName || null, // Person Responsible name

    jobTypeId: sow['jobType']?.id || null,
    jobType: sow['jobType']?.value || null,

    sowStatusId: sow['sowStatus']?.id || null,
    sowStatus: sow['sowStatus']?.value || null,

    exchCalculationCostId: sow['exchCalculationCost']?.id || null,
    exchCalculationCost: sow['exchCalculationCost']?.value || null,

    exchCalculationPriceId: sow['exchCalculationPrice']?.id || null,
    exchCalculationPrice: sow['exchCalculationPrice']?.value || null,

    blockedId: sow['blocked']?.id || null,
    blocked: sow['blocked']?.value || null,

    projectPostingGroupId: sow['projectPostingGroup']?.id || null, // Project Posting Group ID
    projectPosting: sow['projectPostingGroup']?.code || null,
    projectPosting: sow['projectPostingGroup']?.description || null,

    locationId: sow['location']?.id || null,
    locationCode: sow['location']?.name || null,

    invoiceCurrencyId: sow['invoiceCurrency']?.id || null, // Invoice Currency ID
    invoiceCurrencyCode: sow['invoiceCurrency']?.code || null,
    currencyId: sow['currency']?.id || null, //  Currency ID
    currencyCode: sow['currency']?.code || null,
    startingDate: sow.startingDate,
    endingDate: sow.endingDate,
    createdAt: sow.createdAt,
    createdBy: sow.createdBy,
    updatedAt: sow.updatedAt,
    modifiedBy: sow.modifiedBy,
});

//Private method to ensure string valid has date or not
const isDateValid = (dateString) => {
    const parsedDate = Date.parse(dateString);
    return !isNaN(parsedDate) && new Date(parsedDate).toISOString() === dateString;
};


export default {
    createSow,
    updateSow,
    getSowByClientIdAndSowId,
    getSOWs,
    mapSOW
};
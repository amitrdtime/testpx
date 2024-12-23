import constants from '../../config/constants.js';
import logger from '../../logging/logger.js';
import client from "platformxdb-clientmodule/db/models/client.js";
import countryRegion from "platformxdb-clientmodule/db/models/country_region.js";
import language from "platformxdb-clientmodule/db/models/language.js";
import formatRegion from "platformxdb-clientmodule/db/models/formatregion.js";
import contact from "platformxdb-clientmodule/db/models/contact.js";
import { Sequelize, Op } from "sequelize";

// Create a new customer
const createCustomer = async (newCustomer) => {
    try {
        // Fetch the last customer record based on the customerNo
        const lastCustomer = await client.findOne({
            order: [['id', 'DESC']],
            limit: 1
        });

        // Initialize customerNo
        let customerNo;

        if (lastCustomer && lastCustomer.customerNo) {
            // Extract the numeric part from the customerNo
            const lastCustomerNo = lastCustomer.customerNo;
            const numericPart = parseInt(lastCustomerNo.replace(/[^\d]/g, '')) || 0; // Remove non-numeric characters
            // Increment and format to five digits
            const nextCustomerNo = numericPart + 1;
            customerNo = `C${nextCustomerNo.toString().padStart(6, '0')}`; // Ensure it's always 6 characters (C + 5 digits)

        } else {
            customerNo = 'C000001'; // If no customer exists, start with customerNo '1'
        }

        // Update the newCustomer object with the new customerNo and createdAt
        newCustomer.customerNo = customerNo;

        // Create the new customer in the database
        const createdCustomer = await client.create(newCustomer);
        logger.logger.info(constants.CLIENT_API.LOGGER.INFO.CLIENT_CREATION_SUCCESS);

        // Return only customer customer and its properties
        return createdCustomer.get({ plain: true });
    } catch (error) {
        throw error;
    }
};

// Update existing customer data
const updateCustomer = async (customerId, customerDataToUpdate) => {
    try {
        // Find the existing client by primary key
        const existingClient = await getCustomerById(customerId);

        // Check if the client exists
        if (existingClient) {
            // Return the updated client object with only relevant properties
            const plainCustomerObj = existingClient.get({ plain: true });
            // Only update the fields that are present in the input data
            Object.keys(customerDataToUpdate).forEach((key) => {
                // Check if the key does not exist in the existingClient object or if the key is restricted
                if (!plainCustomerObj.hasOwnProperty(key) || ['id', 'customerNo', 'createdAt'].includes(key)) {
                    // Throw the same BAD_REQUEST error for both conditions
                    throw new Error(constants.HTTP_STATUS_CODE.BAD_REQUEST);
                }
            });

            // Update the existing client with new data
            await existingClient.update(customerDataToUpdate);

            // Return the updated client object with only relevant properties
            const plainCustomerObject = existingClient.get({ plain: true });
            return mapCustomer(plainCustomerObject);
        }
        else {
            return existingClient;
        }

    } catch (error) {
        throw error;
    }
};

// Filtering specific customer by customer id
const getCustomerById = async (customerId) => {
    try {
        return await client.findByPk(customerId, {
            include: [
                {
                    model: countryRegion,
                    as: 'countryRegion',
                    attributes: ['id', 'name', 'code'],
                    required: false,
                },
                {
                    model: language,
                    as: 'language',
                    attributes: ['id', 'code', 'name'],
                    required: false,
                },
                {
                    model: formatRegion,
                    as: 'format_region',
                    attributes: ['id', 'name', 'region'],
                    required: false,
                },
                {
                    model: contact,
                    as: 'contact',
                    attributes: ['id', 'no', 'name'],
                    required: false,
                },
            ],
        });
    } catch (error) {
        throw error;
    }
}

//Get customers by search term (With/Without pagination based on request)
const getCustomers = async (searchTerm, sortField = 'createdAt', sortOrder = 'DESC', pageNumber = 1, pageSize = 10) => {
    try {
        // If pageNumber or pageSize is 0, skip pagination
        let customers;
        let totalRecords;

        if (pageNumber === 0 || pageSize === 0) {
            // Fetch all records without pagination
            [totalRecords, customers] = await Promise.all([
                getTotalCustomersCount(searchTerm),
                getCustomersBySearchTerm(searchTerm, sortField, sortOrder)
            ]);
        } else {
            // Calculate offset for pagination
            const offset = (pageNumber - 1) * pageSize;

            // Fetch total records count and paginated results in parallel
            [totalRecords, customers] = await Promise.all([
                getTotalCustomersCount(searchTerm),
                getCustomersBySearchTerm(searchTerm, sortField, sortOrder, offset, pageSize),
            ]);
        }

        // Return result with total records and data
        return {
            pageNumber,
            pageSize,
            totalRecords,
            totalPages: pageSize === 0 ? 1 : Math.ceil(totalRecords / pageSize),
            data: mapCustomers(customers),
        };
    } catch (error) {
        throw error;
    }
};

// Private method to build query options
const buildQueryOptions = (searchTerm, sortField, sortOrder, pageSize, offset) => {
    // Check if the searchTerm is a valid date
    const isDateSearchTerm = isDateValid(searchTerm);

    // Build options object
    const options = {
        include: [
            {
                model: countryRegion,
                as: 'countryRegion',
                attributes: ['id', 'name', 'code'],
                required: false,
            },
            {
                model: language,
                as: 'language',
                attributes: ['id', 'code', 'name'],
                required: false,
            },
            {
                model: formatRegion,
                as: 'format_region',
                attributes: ['id', 'name', 'region'],
                required: false,
            },
            {
                model: contact,
                as: 'contact',
                attributes: ['id', 'no', 'name'],
                required: false,
            }
        ],
        where: {
            // Handle date separately if searchTerm is a valid date
            ...(isDateSearchTerm
                ? {
                    [Sequelize.Op.or]: [
                        { createdAt: { [Sequelize.Op.gte]: new Date(searchTerm) } },
                        { updatedAt: { [Sequelize.Op.gte]: new Date(searchTerm) } }
                    ]
                }
                : {
                    [Sequelize.Op.or]: [
                        { customerNo: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { name: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { address: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { address2: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { city: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { state: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { zipCode: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { phoneNo: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { mobilePhoneNo: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { email: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { faxNo: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { website: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { createdBy: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { modifiedBy: { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { '$countryRegion.name$': { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { '$language.code$': { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { '$language.name$': { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { '$format_region.name$': { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { '$contact.no$': { [Sequelize.Op.iLike]: `%${searchTerm}%` } },
                        { '$contact.name$': { [Sequelize.Op.iLike]: `%${searchTerm}%` } }
                    ]
                })
        },
        raw: true,
        nest: true,
        logging: console.log
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

// Private method to fetch clients
const getCustomersBySearchTerm = async (searchTerm, sortField, sortOrder, offset = 0, pageSize = null) => {
    try {
        const queryOptions = buildQueryOptions(searchTerm, sortField, sortOrder, pageSize, offset);
        const clients = await client.findAll(queryOptions);
        return clients;
    } catch (error) {
        throw error;
    }
};

// Private method to get total clients count
const getTotalCustomersCount = async (searchTerm) => {
    try {
        const queryOptions = buildQueryOptions(searchTerm);
        const clientsCount = await client.count(queryOptions);

        return clientsCount;
    } catch (error) {
        throw error;
    }
};

// Private method to map multiple customers
const mapCustomers = (customers) => {
    return customers.map(mapCustomer);
};

// Private method to map a single customer
const mapCustomer = (customer) => ({
    id: customer.id,
    customerNo: customer.customerNo,
    name: customer.name,
    address: customer.address,
    address2: customer.address2,
    city: customer.city,
    state: customer.state,
    zipCode: customer.zipCode,
    phoneNo: customer.phoneNo,
    mobilePhoneNo: customer.mobilePhoneNo,
    email: customer.email,
    faxNo: customer.faxNo,
    website: customer.website,

    // Country Region properties
    countryRegionId: customer['countryRegion']?.id || null,
    countryRegionName: customer['countryRegion']?.name || null,
    countryRegionCode: customer['countryRegion']?.code || null,

    // Language properties
    languageId: customer['language']?.id || null,
    languageCode: customer['language']?.code || null,
    languageName: customer['language']?.name || null,

    // Format Region properties
    formatRegionId: customer['format_region']?.id || null,
    formatRegionName: customer['format_region']?.name || null,
    formatRegionRegion: customer['format_region']?.region || null,

    // Contact properties
    contactId: customer['contact']?.id || null,
    contactNo: customer['contact']?.no || null,
    contactName: customer['contact']?.name || null,

    createdBy: customer.createdBy,
    createdAt: customer.createdAt,
    modifiedBy: customer.modifiedBy,
    updatedAt: customer.updatedAt
});

//Private method to ensure string valid has date or not
const isDateValid = (dateString) => {
    const parsedDate = Date.parse(dateString);
    return !isNaN(parsedDate) && new Date(parsedDate).toISOString() === dateString;
  };

export default {
    createCustomer,
    updateCustomer,
    getCustomers,
    getCustomerById,
    mapCustomer,
};
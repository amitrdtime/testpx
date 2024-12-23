const HTTP_STATUS_CODE = {
    BAD_REQUEST: '400'
}
const COMMON_ERROR_MESSAGES = {
    NOT_FOUND: 'not found',
    INTERNAL_SERVER_ERROR: 'Internal Server Error.',
    VALIDATION_ERROR: 'Validation failed',
    UNAUTHORIZED: 'Unauthorized access.',
    BAD_REQUEST: 'Bad request. Please check the request parameters.',
    NO_CLIENTS_FOUND: 'No clients found',
    PAGINATION_FETCH_ERROR: 'Error fetching paginated customers with search term'
    // Add more messages as needed
};

const CLIENT_API = {
    VALIDATION_MESSAGES: {
        NAME_REQUIRED: 'Client name is required on name field.',
        CREATEDBY_REQUIRED: 'Creating customer user name is required on createdBy field.',
        IDFIELD_VALUE_REQUIRED_IFNOTNULL: ' must be numeric or null.',
        MODIFIEDBY_REQUIRED: 'Updating customer user name is required on modifiedBy field.'
    },
    ERROR_MESSAGES: {
        ERROR: 'Error creating client',
        ERROR_FETCH_CUSTOMERS: 'Error fetching paginated customers with search term:',
        CLIENT_FETCH_FAILED: 'Failed to retrieve customers',
        CLIENT_NOT_FOUND: 'The client (ID: {clientId}) was not found'
    },
    LOGGER: {
        INFO: {
            CLIENT_CREATION_SUCCESS: 'Creating customer success!!'
        }
    }
};

const SOW_API = {
    VALIDATION_MESSAGES: {
        DESCRIPTION_REQUIRED: 'SOW description is required.',
        CLIENT_NUMBER_REQUIRED: 'Customer number is required.',
        CREATEDBY_REQUIRED: 'Creating SOW user name is required on createdBy field.',
        MODIFIEDBY_REQUIRED: 'Modified SOW user name is required on modifiedBy field.',
    },
    ERROR_MESSAGES: {
        SOW_NOT_FOUND: 'The SOW (ID: {id}) associated with Client (ID: {clientId}) was not found',
        SOWS_NOT_FOUND: 'The SOWs associated with Client (ID: {clientId}) was not found',
        ERROR: 'Failed to create SOW.',
        ERROR_UPDATING_SOW: 'Failed to update SOW.',
        ERROR_FETCH_SOW: 'Error fetching paginated SOW with search term:',
        SOW_FETCH_FAILED: 'Failed to retrieve SOW.',
    },
    LOGGER: {
        INFO: {
            SOW_CREATION_SUCCESS: 'Creating SOW success!!',
            SOW_UPDATE_SUCCESS: 'Updating SOW success!!'
        }
    }
};

const PROJECT_API = {
    VALIDATION_MESSAGES: {
        NAME_REQUIRED: 'Project name is required.'
    },
    ERROR_MESSAGES: {
        ERROR: 'Error creating project',
        ERROR_FETCH_CUSTOMERS: 'Error fetching paginated projects with search term:',
        PROJECT_FETCH_FAILED: 'Failed to retrieve projects',
        PROJECT_NOT_FOUND: 'The project (ID: {projectId}) was not found'
    },
    LOGGER: {
        INFO: {
            PROJECT_CREATION_SUCCESS: 'Creating project success!!'
        }
    }
};

export default {
    HTTP_STATUS_CODE,
    COMMON_ERROR_MESSAGES,
    CLIENT_API,
    SOW_API,
    PROJECT_API
};
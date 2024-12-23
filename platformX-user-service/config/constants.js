const HTTP_STATUS_CODE = {
    BAD_REQUEST: '400'
}
const COMMON_ERROR_MESSAGES = {
    NOT_FOUND: 'not found',
    INTERNAL_SERVER_ERROR: 'Internal Server Error.',
    VALIDATION_ERROR: 'Validation failed',
    UNAUTHORIZED: 'Unauthorized access.',
    BAD_REQUEST: 'Bad request. Please check the request parameters.',
    PAGINATION_FETCH_ERROR: 'Error fetching paginated customers with search term'
    // Add more messages as needed
};

const ROLE_API = {
    VALIDATION_MESSAGES: {
        ROLENAME_REQUIRED: 'Role name is required.',
        CREATEDBY_REQUIRED: 'Creating Role user name is required on createdBy field.',
        MODIFIEDBY_REQUIRED: 'Modified role user name is required on modifiedBy field.',
    },
    ERROR_MESSAGES: {
        ROLE_NOT_FOUND: 'The Role (ID: {id}) was not found',
        ROLE_NOT_FOUND: 'The Roles was not found',
        ERROR: 'Failed to create Role.',
        ERROR_UPDATING_ROLE: 'Failed to update Role.',
        ERROR_FETCH_ROLE: 'Error fetching paginated Role with search term:',
        ROLE_FETCH_FAILED: 'Failed to retrieve Role.',
    },
    LOGGER: {
        INFO: {
            ROLE_CREATION_SUCCESS: 'Creating Role success!!',
            ROLE_UPDATE_SUCCESS: 'Updating Role success!!'
        }
    }
};


export default {
    HTTP_STATUS_CODE,
    COMMON_ERROR_MESSAGES,
    ROLE_API
};
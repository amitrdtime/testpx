import roleService from '../services/roleService.js';
import camelcaseConverter from '../helper/camelcaseConverter.js';
import logger from '../logging/logger.js';
import constants from "../config/constants.js";

// POST API : /Roles - Create a new role
const createRole = async (req, res) => {
  const newRole = req.body;

  // Basic validation for required fields
  if (!newRole.roleName || newRole.roleName.trim() === '') {
    return res.status(400).json({ error: constants.ROLE_API.VALIDATION_MESSAGES.ROLENAME_REQUIRED });
  }

  if (!newRole.createdBy || newRole.createdBy.trim() === '') {
    return res.status(400).json({ error: constants.ROLE_API.VALIDATION_MESSAGES.CREATEDBY_REQUIRED });
  }

  try {
    // Role creation
    const createdRole = await roleService.createRole(newRole);

    // Convert response keys to camelCase
    const camelCaseResponse = camelcaseConverter.keysToCamelCase(createdRole);

    return res.status(201).json(camelCaseResponse);
  } catch (err) {
    // Log the error for debugging purposes
    logger.logger.error(`${constants.ROLE_API.ERROR_MESSAGES.ERROR}: ${err.message}`);
    // General error response for unexpected issues
    return res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
  }
};

// PATCH endpoint to update a role record
const updateRole = async (req, res) => {
     try {
       const roleId = req.params.roleId;
       const roleDataToUpdate = req.body;
   
       logger.logger.info(`Role to update : ${roleDataToUpdate}`);
       if (!roleDataToUpdate || Object.keys(roleDataToUpdate).length === 0) {
         return res.status(400).json({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
       }
       // Basic validation
       if (!roleDataToUpdate.roleName) {
         return res.status(400).json({ error: constants.ROLE_API.VALIDATION_MESSAGES.ROLENAME_REQUIRED });
       }
       else if (!roleDataToUpdate.modifiedBy || roleDataToUpdate.modifiedBy.trim() === '') {
         return res.status(400).json({ error: constants.ROLE_API.VALIDATION_MESSAGES.MODIFIEDBY_REQUIRED });
       }
   
       const updatedRoleResponse = await roleService.updateRole(roleId, roleDataToUpdate);
       if (!updatedRoleResponse || Object.keys(updatedRoleResponse).length === 0) {
         return res.status(404).json({
           error: constants.ROLE_API.ERROR_MESSAGES.ROLE_NOT_FOUND.replace('{id}', roleId)
         });
       }
   
       const camelCaseResponse = camelcaseConverter.keysToCamelCase(updatedRoleResponse);
       res.status(200).json(camelCaseResponse);
   
     } catch (error) {
       logger.logger.error(error);
       if (error) {
         if (error.response && error.response.status === 401) {
           return res.status(401).json({ error: constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED });
         } else if (error.message.includes(constants.HTTP_STATUS_CODE.BAD_REQUEST) || (error.response && error.response.status === 400)) {
           return res.status(400).json({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
         }
       }
       res.status(500).json({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
     }
   };

export default {
     createRole,
     updateRole,   
  };
  
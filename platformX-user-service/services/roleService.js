import logger from "../logging/logger.js";
import roleRepository from "../data/repositories/roleRepository.js";
import constants from "../config/constants.js";

// Create a role in application database
const createRole = async (newRole) => {
  try {
    const createdRole = await roleRepository.createRole(newRole);
    return createdRole;
  } catch (error) {
    throw error;
  }
};

// Update a role data in application database
const updateRole = async (roleId, roleDataToUpdate) => {
    try {
      const updatedRoleResponse = await roleRepository.updateRole(roleId, roleDataToUpdate);
      return updatedRoleResponse;
    } catch (error) {
      logger.logger.error(
        `${constants.ROLE_API.ERROR_MESSAGES.ERROR_UPDATING_ROLE}:`,
        error.response ? error.response.data : error.message
      );
      throw new Error(`${constants.ROLE_API.ERROR_MESSAGES.ERROR_UPDATING_ROLE}: ${error.message}`);
    }
  };

  export default {
    updateRole, 
    createRole  
 };
 
  
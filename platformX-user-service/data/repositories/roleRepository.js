import constants from '../../config/constants.js';
import logger from '../../logging/logger.js';
import userRole from "platformxdb-usermodule/db/models/userrole.js";
import { Sequelize, Op } from "sequelize";

// Create a new role
const createRole = async (newRole) => {
    try {

        // Create the new role in the database
        const createdRole = await userRole.create(newRole);
        logger.logger.info(constants.ROLE_API.LOGGER.INFO.ROLE_CREATION_SUCCESS);

        // Return only role and its properties
        return createdRole.get({ plain: true });
    } catch (error) {
        throw error;
    }
};

const updateRole = async (roleId, roleDataToUpdate) => {
    try {
        // Find the existing Role
        const { existingRole, rolePlain } = await getRoleByRoleId(roleId);

        // Check if the Role exists
        if (existingRole) {
            // Only update the fields that are present in the input data
            Object.keys(roleDataToUpdate).forEach((key) => {
                // Verifying the request fields exist in the backend
                if (!Object.prototype.hasOwnProperty.call(rolePlain, key)) {
                    throw new Error(constants.HTTP_STATUS_CODE.BAD_REQUEST);
                }

                // Check for restricted fields that should not be updated
                if (key === 'id' || key === 'createdAt') {
                    throw new Error(constants.HTTP_STATUS_CODE.BAD_REQUEST);
                }
            });

            // Update the existing Role with new data
            await existingRole.update(roleDataToUpdate);
            // Return the updated Role object with only relevant properties
            return existingRole.get({ plain: true });
        }
        else {
            return existingRole;
        }

    } catch (error) {
        throw (error);
    }
};

//Get Role by Role Id
const getRoleByRoleId = async (roleId) => {
    try {
        const existingRole = await userRole.findByPk(roleId);

        // Check if existingSow is found
        if (existingRole) {
            const rolePlain = existingRole.get({ plain: true }); // Get the plain object
            return { existingRole, rolePlain }; // Return both the instance and the plain object
        }

        // Return nulls if not found
        return { existingRole: null, rolePlain: null };
    } catch (error) {
        throw new Error(`${constants.ROLE_API.ERROR_MESSAGES.ROLE_FETCH_FAILED}: ${error.message}`);
    }
}

export default {
    createRole,
    updateRole
 };
 
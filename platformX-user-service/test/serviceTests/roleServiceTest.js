import { expect } from 'chai';
import sinon from 'sinon';
import roleService from '../../services/roleService.js';
import roleRepository from '../../data/repositories/roleRepository.js';
import constants from '../../config/constants.js';
import logger from "../../logging/logger.js";

describe('Role Service', () => {
    let roleStub, loggerStub;

    const roleId = 1;
    const validRoleData = {
        roleName: "Manager",
        description: "123 Business Rd-updated",
        status: "Active",
        modifiedBy: "Asha"
    };

    const invalidRoleData = {
        roleId: 1, // Not allowed to be updated
        roleName: "Manager",
        description: "123 Business Rd-updated",
        status: "Active",
    };

    const existingRole = {
        roleId: 1, // Not allowed to be updated
        roleName: "Manager",
        description: "123 Business Rd-updated",
        status: "Active",
    };

    // Simulate successful update
    const updatedRole = {
        ...validRoleData,
        id: roleId
    };

    beforeEach(() => {
        // Stub the logger to avoid unnecessary log output
        loggerStub = sinon.stub(logger.logger, 'error');
    });

    afterEach(() => {
        sinon.restore();
    });

    //Update role service test scenarios
    describe('Update Role', () => {

        it('should successfully update a role when valid data is provided', async () => {

            roleStub = sinon.stub(roleRepository, 'updateRole').resolves(updatedRole);
            // maproleStub = sinon.stub(roleRepository, 'maprole');
            // maproleStub.withArgs(updatedRole).returns(mappedrole);
            const result = await roleService.updateRole(roleId,validRoleData);

            expect(result).to.be.an('object');
            expect(result.id).to.equal(roleId);
            expect(result.modifiedBy).to.equal(validRoleData.modifiedBy);

            expect(roleStub.calledOnce).to.be.true;
            expect(roleStub.calledWith(roleId, validRoleData)).to.be.true;
        });

        it('should throw an error when updating restricted fields', async () => {
            // Simulate bad request error for restricted fields
            roleStub = sinon.stub(roleRepository, 'updateRole').rejects(new Error(constants.HTTP_STATUS_CODE.BAD_REQUEST.toString()));

            try {
                await roleService.updateRole(roleId, invalidRoleData);
                expect.fail('Expected error to be thrown');
            } catch (error) {
                expect(error.message).to.equal(constants.ROLE_API.ERROR_MESSAGES.ERROR_UPDATING_ROLE.toString() + ": 400");
            }

            expect(roleStub.calledOnce).to.be.true;
            expect(roleStub.calledWith(roleId, invalidRoleData)).to.be.true;
        });

        it('should return null if the role does not exist', async () => {
            // Simulate role not found
            roleStub = sinon.stub(roleRepository, 'updateRole').resolves(null);

            const result = await roleService.updateRole(roleId, validRoleData);

            expect(result).to.be.null;
            expect(roleStub.calledOnce).to.be.true;
            expect(roleStub.calledWith(roleId,  validRoleData)).to.be.true;
        });
    });

});
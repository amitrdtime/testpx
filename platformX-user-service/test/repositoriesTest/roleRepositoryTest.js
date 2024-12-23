import { expect } from 'chai';
import sinon from 'sinon';
import roleRepository from '../../data/repositories/roleRepository.js';
import userRole from "platformxdb-usermodule/db/models/userrole.js";
import constants from '../../config/constants.js';

describe('Role Repository', () => {
    let roleStub ,getRoleByIdStub;
    

    const roleId = 1;
    const validRoleData = {
        roleName: "Manager",
        description: "123 Business Rd-updated",
        status:"Active",
        modifiedBy: "Asha"
    };

    const invalidRoleData = {
        roleId: 1, // Not allowed to be updated
        roleName: "Manager",
        description: "123 Business Rd-updated",
        status:"Active",
    };

    const existingRole = {
        roleId: 1, // Not allowed to be updated
        roleName: "Manager",
        description: "123 Business Rd-updated",
        status:"Active",
    };

    beforeEach(() => {
        // Mock the getCustomerById and update stubs
        getRoleByIdStub = sinon.stub(userRole, 'findByPk').resolves(existingRole);
    });

    afterEach(() => {
        // Restore original functions after each test
        sinon.restore();
    });


    describe('Update Role', () => {

        it('should successfully update an existing role', async () => {
            const result = await roleRepository.updateRole(roleId, validRoleData);

            expect(result).to.be.an('object');
            expect(result.roleName).to.equal(validRoleData.roleName);
            expect(result.modifiedBy).to.equal(validRoleData.modifiedBy); // Ensure this checks the right field
            expect(existingRole.update.calledOnce).to.be.true;
        });

        it('should throw an error when trying to update restricted fields', async () => {
            try {
                await roleRepository.updateRole(roleId, validRoleData);
                expect.fail('Expected error to be thrown');
            } catch (error) {
                expect(error.message).to.equal(constants.HTTP_STATUS_CODE.BAD_REQUEST.toString());
            }
        });

        it('should return null if the role does not exist', async () => {
            // Simulate role not found
            getRoleByIdStub.resolves(null);

            const result = await roleRepository.updateRole(roleId, validRoleData);
            expect(result).to.be.null;
        });
    });
});
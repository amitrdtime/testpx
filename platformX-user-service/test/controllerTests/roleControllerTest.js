import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import roleService from '../../services/roleService.js';
import constants from '../../config/constants.js';
import camelcaseConverter from '../../helper/camelcaseConverter.js';
import roleRoute from "../../routes/roles.js";
import logger from "../../logging/logger.js";

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use('/roles', roleRoute);

describe("Role Controller", () => {

    let roleStub, loggerStub, camelCaseStub;   

    beforeEach(() => {
        camelCaseStub = sinon.stub(camelcaseConverter, 'keysToCamelCase').callsFake((data) => data);
        loggerStub = sinon.stub(logger.logger, 'error');
    });

    afterEach(() => {
        // Restore the original method after each test
        if (roleStub) {
            roleStub.restore();
        }
        sinon.restore();

    });

    const roleId = 1;
    const validRoleData = {
        roleName: "Manager",
        description: "123 Business Rd-updated",
        status: "Active",
        modifiedBy: "Asha"
    };

    const invalidRoleData = {
        roleId: 1, // Not allowed to be updated       
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

    const camelCaseRole = {
        roleId: 1, // Not allowed to be updated
        roleName: "Manager",
        description: "123 Business Rd-updated",
        status: "Active",
    };


    //Update role API endpoints test scenarios
    describe('PATCH /roles/{roleId} - updateRole', () => {

        it('should update a role and return 200 with the updated SOW data', async () => {
            roleStub = sinon.stub(roleService, 'updateRole').resolves(updatedRole);

            const response = await request(app).patch(`/roles/${roleId}`).send(validRoleData);

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(updatedRole);
            expect(roleStub.calledOnce).to.be.true;
        });

        it('should return 400 if the request body is empty', async () => {

            const response = await request(app).patch(`/roles/${roleId}`).send({}); // Empty body

            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.BAD_REQUEST);
        });

        it('should return 400 if "description" is missing or empty', async () => {

            const response = await request(app).patch(`/roles/${roleId}`)
                .send(invalidRoleData);

            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal(constants.ROLE_API.VALIDATION_MESSAGES.ROLENAME_REQUIRED);
        });

        it('should return 404 if the SOW to update does not exist', async () => {

            roleStub = sinon.stub(roleService, 'updateRole').resolves(null);

            const response = await request(app).patch(`/roles/${roleId}`)
                .send(validRoleData);

            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal(constants.ROLE_API.ERROR_MESSAGES.ROLE_NOT_FOUND.replace('{id}', roleId));
        });

        it('should return 500 if a server error occurs during SOW update', async () => {
            const error = new Error(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
            error.response = { status: 500 };

            roleStub = sinon.stub(roleService, 'updateRole').rejects(error);

            const response = await request(app)
                .patch(`/roles/${roleId}`)
                .send(validRoleData);

            expect(response.status).to.equal(500);
            expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        });

    });
});
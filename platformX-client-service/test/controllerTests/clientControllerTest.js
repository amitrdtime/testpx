import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import clientService from '../../services/clientService.js';
import clientController from '../../controllers/clientController.js';
import constants from '../../config/constants.js';
import camelcaseConverter from '../../helper/camelcaseConverter.js';
import logger from "../../logging/logger.js";

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.post('/clients', clientController.createCustomer);
app.patch('/clients/:id', clientController.updateCustomer);
app.get('/clients', clientController.getCustomers);
app.get('/clients/:id', clientController.getCustomerById);

describe('ClientController', () => {

    //Create customer API endpoints test scenarios
    describe('POST /clients - createCustomer', () => {
        let createCustomerStub;

        beforeEach(() => {
            createCustomerStub = sinon.stub(clientService, 'createCustomer');
            sinon.stub(camelcaseConverter, 'keysToCamelCase').callsFake((data) => data); // Stub to bypass actual conversion
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should create a customer and return 201 with the created customer data', async () => {
            const mockNewCustomer = {
                name: "Textile Enterprises",
                createdBy: "Anand.Periyasamy",
                countryRegionId: 65,
                languageId: 1,
                formatRegionId: 1,
                contactId: 1
            };

            const mockCreatedCustomer = {
                ...mockNewCustomer,
                customerNo: 'C000001'
            };

            createCustomerStub.resolves(mockCreatedCustomer);

            const response = await request(app)
                .post('/clients')
                .send(mockNewCustomer);

            expect(response.status).to.equal(201);
            expect(response.body).to.deep.equal(mockCreatedCustomer);
            expect(createCustomerStub.calledOnce).to.be.true;
        });

        it('should return 400 if name is missing', async () => {
            const mockNewCustomer = {
                createdBy: "Anand.Periyasamy"
            };

            const response = await request(app)
                .post('/clients')
                .send(mockNewCustomer);

            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal(constants.CLIENT_API.VALIDATION_MESSAGES.NAME_REQUIRED);
        });

        it('should return 400 if createdBy is missing', async () => {
            const mockNewCustomer = {
                name: "Textile Enterprises"
            };

            const response = await request(app)
                .post('/clients')
                .send(mockNewCustomer);

            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal(constants.CLIENT_API.VALIDATION_MESSAGES.CREATEDBY_REQUIRED);
        });

        it('should return 400 if an ID field is not a number', async () => {
            const mockNewCustomer = {
                name: "Textile Enterprises",
                createdBy: "Anand.Periyasamy",
                countryRegionId: "notANumber" // Invalid value
            };

            const response = await request(app)
                .post('/clients')
                .send(mockNewCustomer);

            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal('countryRegionId' + constants.CLIENT_API.VALIDATION_MESSAGES.IDFIELD_VALUE_REQUIRED_IFNOTNULL);
        });

        it('should return 500 if an error occurs during customer creation', async () => {
            const mockNewCustomer = {
                name: "Textile Enterprises",
                createdBy: "Anand.Periyasamy"
            };

            createCustomerStub.rejects(new Error('Database error'));

            const response = await request(app)
                .post('/clients')
                .send(mockNewCustomer);

            expect(response.status).to.equal(500);
            expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
        });
    });

    //Update customer API endpoints test scenarios
    describe('PATCH /clients/:id - updateCustomer', () => {
        let updateCustomerStub;

        beforeEach(() => {
            updateCustomerStub = sinon.stub(clientService, 'updateCustomer');
            sinon.stub(camelcaseConverter, 'keysToCamelCase').callsFake((data) => data); // Stub to bypass actual conversion
        });

        afterEach(() => {
            sinon.restore();
        });

        const validCustomerData = {
            name: "Textile Enterprises-updated",
            address: "123 Business Rd-updated",
            modifiedBy: "Anand.Periyasamy"
        };

        const invalidCustomerData = {
            name: "", // Missing name
            modifiedBy: ""
        };

        it('should update a customer and return 200 with the updated customer data', async () => {
            const customerId = '1';
            const mockUpdatedCustomer = {
                ...validCustomerData,
                id: customerId
            };

            updateCustomerStub.resolves(mockUpdatedCustomer);

            const response = await request(app)
                .patch(`/clients/${customerId}`)
                .send(validCustomerData);

            expect(response.status).to.equal(200);
            expect(response.body).to.deep.equal(mockUpdatedCustomer);
            expect(updateCustomerStub.calledOnce).to.be.true;
            expect(updateCustomerStub.calledWith(customerId, validCustomerData)).to.be.true;
        });

        it('should return 400 if the request body is empty', async () => {
            const customerId = '1';

            const response = await request(app)
                .patch(`/clients/${customerId}`)
                .send({}); // Empty body

            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.BAD_REQUEST);
        });

        it('should return 400 if "modifiedBy" is missing or empty', async () => {
            const customerId = '1';

            const response = await request(app)
                .patch(`/clients/${customerId}`)
                .send(invalidCustomerData);

            expect(response.status).to.equal(400);
            expect(response.body.error).to.equal(constants.CLIENT_API.VALIDATION_MESSAGES.MODIFIEDBY_REQUIRED);
        });

        it('should return 404 if the customer to update does not exist', async () => {
            const customerId = '999'; // Non-existent customer ID
            updateCustomerStub.resolves(null);

            const response = await request(app)
                .patch(`/clients/${customerId}`)
                .send(validCustomerData);

            expect(response.status).to.equal(404);
            expect(response.body.error).to.equal(constants.CLIENT_API.ERROR_MESSAGES.CLIENT_NOT_FOUND.replace('{clientId}', customerId));
        });

        it('should return 500 if a server error occurs during customer update', async () => {
            const customerId = '1';
            updateCustomerStub.rejects(new Error('Database error'));

            const response = await request(app)
                .patch(`/clients/${customerId}`)
                .send(validCustomerData);

            expect(response.status).to.equal(500);
            expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
            expect(updateCustomerStub.calledOnce).to.be.true;
        });
    }); 

    describe('GET /clients - getCustomers', () => {
        let getCustomersStub;
      
        beforeEach(() => {
          getCustomersStub = sinon.stub(clientService, 'getCustomers');
        });
      
        afterEach(() => {
          sinon.restore();
        });
      
        it('should return 200 and the customer data if found', async () => {
          const mockCustomers = [
            { id: '1', name: "Textile Enterprises", address: "123 Business Rd" },
            { id: '2', name: "Tech Innovators", address: "456 Tech St" }
          ];
      
          getCustomersStub.resolves(mockCustomers); // Mocking the service to return the mock customers
      
          const response = await request(app)
            .get('/clients?searchTerm=&sortField=name&sortOrder=asc&pageNumber=1&pageSize=0');
      
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.equal(mockCustomers);
          expect(getCustomersStub.calledOnce).to.be.true;
        });
      
        it('should return 404 if no customers are found', async () => {
          getCustomersStub.resolves([]); // Simulating no customers found
      
          const response = await request(app)
            .get('/clients?searchTerm=&sortField=name&sortOrder=asc&pageNumber=1&pageSize=0');
      
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal(constants.CLIENT_API.ERROR_MESSAGES.CLIENTS_NOT_FOUND);
        });
      
        it('should return 500 if a server error occurs during retrieval', async () => {
          getCustomersStub.rejects(new Error('Database error')); // Simulating a database error
      
          const response = await request(app)
            .get('/clients?searchTerm=&sortField=name&sortOrder=asc&pageNumber=1&pageSize=0');
      
          expect(response.status).to.equal(500);
          expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
          expect(getCustomersStub.calledOnce).to.be.true;
        });
      });

    describe('GET /clients/:id - getCustomerById', () => {
        let getCustomerByIdStub;
      
        beforeEach(() => {
          getCustomerByIdStub = sinon.stub(clientService, 'getCustomerById');
          sinon.stub(camelcaseConverter, 'keysToCamelCase').callsFake((data) => data); // Stub to bypass actual conversion
        });
      
        afterEach(() => {
          sinon.restore();
        });
      
        it('should return 200 and the customer data if found', async () => {
          const customerId = '1';
          const mockCustomer = {
            id: customerId,
            name: "Textile Enterprises",
            address: "123 Business Rd",
            modifiedBy: "Anand.Periyasamy"
          };
      
          // Mocking the service to return the mock customer
          getCustomerByIdStub.resolves(mockCustomer); // Ensure this resolves to a valid customer
      
          const response = await request(app)
            .get(`/clients/${customerId}`);
      
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.equal(mockCustomer);
          expect(getCustomerByIdStub.calledOnce).to.be.true;
          expect(getCustomerByIdStub.calledWith(customerId)).to.be.true;
        });
      
        it('should return 404 if the customer does not exist', async () => {
          const customerId = '999'; // Non-existent customer ID
          getCustomerByIdStub.resolves(null); // Simulating no customer found
      
          const response = await request(app)
            .get(`/clients/${customerId}`);
      
          expect(response.status).to.equal(404);
          expect(response.body.error).to.equal(constants.CLIENT_API.ERROR_MESSAGES.CLIENT_NOT_FOUND.replace('{clientId}', customerId));
        });
      
        it('should return 500 if a server error occurs during retrieval', async () => {
          const customerId = '1';
          getCustomerByIdStub.rejects(new Error('Database error')); // Simulating a database error
      
          const response = await request(app)
            .get(`/clients/${customerId}`);
      
          expect(response.status).to.equal(500);
          expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
          expect(getCustomerByIdStub.calledOnce).to.be.true;
        });
    });      
});

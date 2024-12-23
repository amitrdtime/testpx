import { expect } from 'chai';
import sinon from 'sinon';
import request from 'supertest';
import express from 'express';
import sowService from '../../services/sowsService.js';
import constants from '../../config/constants.js';
import camelcaseConverter from '../../helper/camelcaseConverter.js';
import sowRoutes from "../../routes/sowsRoute.js";
import logger from "../../logging/logger.js";

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.use('/client', sowRoutes);

describe("SOW Controller", () => {
  
  let sowStub,loggerStub,camelCaseStub;

  const mockNewSow = {
    description: "SOW Platorm x",
    customerNo: "C000001",
    startingDate: "2024-09-30",
    endingDate: "2024-09-30",
    customerId: 1,
    personResponsibleId: "1",
    jobTypeId: 2,
    projectManagerId: 2,
    sowStatusId: 4,
    projectPostingGroupId: 1,
    locationId: 1,
    currencyId: 1,
    invoiceCurrencyId: 1,
    exchCalculationCostId: 9,
    exchCalculationPriceId: 9,
    blockedId: 10,
    createdBy: "Asha.Nandrekar"
  };

  const mockCreatedSow = {
    ...mockNewSow,
    sowNo: 'SOW00001' // Mock the sowNo as needed
  };

  beforeEach(() => {
    //sinon.stub(camelcaseConverter, 'keysToCamelCase').callsFake((data) => data); // Stub to bypass actual conversion
    camelCaseStub = sinon.stub(camelcaseConverter, 'keysToCamelCase').callsFake((data) => data);
    loggerStub = sinon.stub(logger.logger, 'error');
  });

  afterEach(() => {
    // Restore the original method after each test
    if (sowStub) {
      sowStub.restore();
    }
    sinon.restore();

  });

  const clientId = 1;
  const sowId = 1;
  const validSowData = {
    description: "SOW Platorm x",
    customerId: 1,
    modifiedBy: "Asha.Nandrekar"
  };

  const invalidSowData = {
    id: 1, // Not allowed to be updated
    modifiedBy: "Asha.Nandrekar"
  };
  // Simulate successful update
  const updatedSow = {
    ...validSowData,
    id: sowId
  };

  const camelCaseSow = {
    id: sowId,
    description: 'SOW Platform X',
    customerId: clientId,
    startDate: '2024-09-30',
    endDate: '2024-10-30',
  };

  //Create SOW API endpoints test scenarios
  describe('POST /client/{clientId}/sow - createSow', () => {

    it('should create a SOW and return 201 with the created SOW data', async () => {

      sowStub = sinon.stub(sowService, 'createSow').resolves(mockCreatedSow)
      const response = await request(app).post(`/client/${clientId}/sow`).send(mockNewSow);
      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(mockCreatedSow);
    });

    it('should return 400 if description is missing', async () => {
      const mockNewSowWithDataMissing = { createdBy: "Asharani.Nandrekar" };

      const response = await request(app).post('/client/{1}/sow').send(mockNewSowWithDataMissing);

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal(constants.SOW_API.VALIDATION_MESSAGES.DESCRIPTION_REQUIRED);
    });

    it('should return 400 if customerId is missing', async () => {
      const mockNewSowWithDataMissing = {
        description: "Textile Enterprises"
      };

      const response = await request(app).post('/client/{1}/sow').send(mockNewSowWithDataMissing);

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal(constants.SOW_API.VALIDATION_MESSAGES.CLIENT_NUMBER_REQUIRED);
    });

    it('should return 400 if an createdBy field is missing', async () => {
      const mockNewSow = {
        description: "Textile Enterprises",
        customerId: 1
      };

      const response = await request(app).post('/client/{1}/sow').send(mockNewSow);

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal(constants.SOW_API.VALIDATION_MESSAGES.CREATEDBY_REQUIRED);
    });

    it('should return 500 if an error occurs during SOW creation', async () => {
      const error = new Error(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
      error.response = { status: 500 };
      sowStub = sinon.stub(sowService, "createSow").rejects(error);

      const response = await request(app).post('/client/{1}/sow').send(mockNewSow);

      expect(response.status).to.equal(500);
      expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    });
  });

  //Update SOW API endpoints test scenarios
  describe('PATCH /client/{clientId}/sow/{sowid} - updateSow', () => {

    it('should update a SOW and return 200 with the updated SOW data', async () => {
      sowStub = sinon.stub(sowService, 'updateSow').resolves(updatedSow);

      const response = await request(app).patch(`/client/${clientId}/sow/${sowId}`).send(validSowData);

      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(updatedSow);
      expect(sowStub.calledOnce).to.be.true;
    });

    it('should return 400 if the request body is empty', async () => {

      const response = await request(app).patch(`/client/${clientId}/sow/${sowId}`).send({}); // Empty body

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.BAD_REQUEST);
    });

    it('should return 400 if "description" is missing or empty', async () => {

      const response = await request(app).patch(`/client/${clientId}/sow/${sowId}`)
        .send(invalidSowData);

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal(constants.SOW_API.VALIDATION_MESSAGES.DESCRIPTION_REQUIRED);
    });

    it('should return 404 if the SOW to update does not exist', async () => {

      sowStub = sinon.stub(sowService, 'updateSow').resolves(null);

      const response = await request(app).patch(`/client/${clientId}/sow/${sowId}`)
        .send(validSowData);

      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal(constants.SOW_API.ERROR_MESSAGES.SOW_NOT_FOUND.replace('{id}', sowId)
        .replace('{clientId}', clientId));
    });

    it('should return 500 if a server error occurs during SOW update', async () => {
      const error = new Error(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
      error.response = { status: 500 };

      sowStub = sinon.stub(sowService, 'updateSow').rejects(error);

      const response = await request(app)
        .patch(`/client/${clientId}/sow/${sowId}`)
        .send(validSowData);

      expect(response.status).to.equal(500);
      expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    });

  });

  //Get SOW by client Id and SOW Id API endpoints test scenarios
  describe('GET /client/{clientId}/sow/{sowid} - getSowByClientIdSowId', () => {

    it('should return 200 and the SOW data if found', async () => {
      // Mock the service to return a valid SOW
      sowStub = sinon.stub(sowService, 'getSowByClientIdSowId').resolves(mockCreatedSow);
      camelCaseStub.withArgs(mockCreatedSow).returns(camelCaseSow);
  
      const response = await request(app).get(`/client/${clientId}/sow/${sowId}`);
  
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(camelCaseSow);
      expect(camelCaseStub.calledOnceWithExactly(mockCreatedSow)).to.be.true;
    });

    it('should return 404 if the SOW is not found', async () => {
      // Mock the service to return undefined
      sowStub = sinon.stub(sowService, 'getSowByClientIdSowId').resolves(null);
  
      const response = await request(app).get(`/client/${clientId}/sow/${sowId}`);
  
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal(
        constants.SOW_API.ERROR_MESSAGES.SOW_NOT_FOUND.replace('{id}', sowId).replace('{clientId}', clientId)
      );
    });
     
    it('should return 500 if an error occurs while retrieving the SOW', async () => {
      const error = new Error('Database error');
      sowStub = sinon.stub(sowService, 'getSowByClientIdSowId').rejects(error);
  
      const response = await request(app).get(`/client/${clientId}/sow/${sowId}`);
  
      expect(response.status).to.equal(500);
      expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
      expect(loggerStub.calledOnceWithExactly(error)).to.be.true;
    });

  });

  //Get SOW by client Id API endpoints test scenarios
  describe('GET /client/{clientId}/sows - getSows', () => {
    
    const searchTerm = 'test';
    const sortField = 'createdAt';
    const sortOrder = 'DESC';
    const pageNumber = 1;
    const pageSize = 10;
    const mockSowData = [{ sowId: '1', sowName: 'Test SOW' }];
    const camelCaseSowData = [{ sowId: '1', sowName: 'Test SOW' }];

    it('should return 200 and the SOW data if found', async () => {
      sowStub = sinon.stub(sowService, 'getSows').resolves(mockSowData);
      camelCaseStub.withArgs(mockSowData).returns(camelCaseSowData);
  
      const response = await request(app)
        .get(`/client/${clientId}/sows`)
        .query({ searchTerm, sortField, sortOrder, pageNumber, pageSize });
  
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal(camelCaseSowData);
    });

    it('should return 404 if no SOW data is found', async () => {
      sowStub = sinon.stub(sowService, 'getSows').resolves([]);
  
      const response = await request(app)
        .get(`/client/${clientId}/sows`)
        .query({ searchTerm, sortField, sortOrder, pageNumber, pageSize });
  
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal(
        constants.SOW_API.ERROR_MESSAGES.SOWS_NOT_FOUND.replace('{clientId}', clientId)
      );
    });

    it('should return 401 if an unauthorized error occurs', async () => {
      const unauthorizedError = new Error('Unauthorized');
      unauthorizedError.response = { status: 401 };
      sowStub = sinon.stub(sowService, 'getSows').rejects(unauthorizedError);
  
      const response = await request(app)
        .get(`/client/${clientId}/sows`)
        .query({ searchTerm, sortField, sortOrder, pageNumber, pageSize });
  
      expect(response.status).to.equal(401);
      expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED);
      expect(loggerStub.calledOnceWithExactly(unauthorizedError)).to.be.true;
    });
  
    it('should return 400 if a bad request error occurs', async () => {
      const badRequestError = new Error('Bad Request');
      badRequestError.response = { status: 400 };
      sowStub = sinon.stub(sowService, 'getSows').rejects(badRequestError);
  
      const response = await request(app)
        .get(`/client/${clientId}/sows`)
        .query({ searchTerm, sortField, sortOrder, pageNumber, pageSize });
  
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.BAD_REQUEST);
      expect(loggerStub.calledOnceWithExactly(badRequestError)).to.be.true;
    });

    it('should return 500 if an internal server error occurs', async () => {
      const internalServerError = new Error('Database error');
      sowStub = sinon.stub(sowService, 'getSows').rejects(internalServerError);
  
      const response = await request(app)
        .get(`/client/${clientId}/sows`)
        .query({ searchTerm, sortField, sortOrder, pageNumber, pageSize });
  
      expect(response.status).to.equal(500);
      expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
      expect(loggerStub.calledOnceWithExactly(internalServerError)).to.be.true;
    });

  });

});
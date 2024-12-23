import { expect } from 'chai';
import sinon from 'sinon';
import projectController from '../../controllers/projectController.js';
import projectService from '../../services/projectService.js';
import constants from "../../config/constants.js";
import logger from '../../logging/logger.js';
import camelcaseConverter from '../../helper/camelcaseConverter.js';
import request from 'supertest';
import express from 'express';

const app = express();
app.use(express.json()); // Middleware to parse JSON requests
app.post('/project', projectController.createProject);



describe('Project Controller', () => {

  describe('getProjectByProjectId', () => {
    let projectServiceStub;

    beforeEach(() => {
      projectServiceStub = sinon.stub(projectService, 'getProjectByProjectId');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return project details when project is found', async () => {
      const req = {
        params: { projectId: '1' },
        clientId: '1',
        sowId: '1',
      };

      const mockProject = {
        id: 1,
        customerId: '1',
        customerNo: 'CUST001',
        customerName: 'Customer Name',
        sowId: '1',
        sowNo: 'SOW00001',
        projectNo: 'SOW00001_001',
        description: 'Project description goes here',
        projectPostingGroupId: 1,
        projectPostingGroupName: 'Posting Group Name',
        wipMethodId: 2,
        wipMethodName: 'WIP Method Name',
        locationId: 3,
        locationName: 'Location Name',
        createdBy: 'UserName',
        modifiedBy: 'UserName',
        projectCreatedDate: '2024-09-24T12:00:00Z',
        startDate: '2024-09-25T09:00:00Z',
        endDate: '2025-09-25T17:00:00Z',
        createdAt: '2024-09-24T12:00:00Z',
        updatedAt: '2024-09-24T12:00:00Z',
      };

      projectServiceStub.resolves(mockProject);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await projectController.getProjectByProjectId(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockProject)).to.be.true;
    });

    it('should return 404 if project is not found', async () => {
      projectServiceStub.resolves([]);

      const req = {
        params: { projectId: '999' },
        clientId: '1',
        sowId: '1',
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await projectController.getProjectByProjectId(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: 'Project not found' })).to.be.true;
    });

    it('should return 400 for bad request', async () => {
      const errorResponse = { response: { status: 400 } };
      projectServiceStub.rejects(errorResponse);

      const req = {
        params: { projectId: '1' },
        clientId: '1',
        sowId: '1',
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await projectController.getProjectByProjectId(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: 'Bad request. Please check the request parameters.' })).to.be.true;
    });

    it('should return 500 for internal server error', async () => {
      const errorResponse = new Error(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
      projectServiceStub.rejects(errorResponse);

      const req = {
        params: { projectId: '1' },
        clientId: '1',
        sowId: '1',
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await projectController.getProjectByProjectId(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR })).to.be.true;
    });
  });

  describe('getAllProjects', () => {
    let projectServiceStub;

    beforeEach(() => {
      projectServiceStub = sinon.stub(projectService, 'getAllProjects');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return all projects when projects are found', async () => {
      const req = {
        params: {},
        query: {
          searchTerm: '',
          sortField: 'projectNo',
          sortOrder: 'asc',
          pageNumber: 1,
          pageSize: 10,
        },
        clientId: '1',
        sowId: '1',
      };

      const mockProjects = [
        {
          id: 1,
          customerId: '1',
          customerNo: 'CUST001',
          customerName: 'Customer Name',
          sowId: 1,
          sowNo: 'SOW00001',
          projectNo: 'SOW00001_001',
          description: 'Project description goes here',
          projectPostingGroupId: 1,
          projectPostingGroupName: 'Posting Group Name',
          wipMethodId: 2,
          wipMethodName: 'WIP Method Name',
          locationId: 3,
          locationName: 'Location Name',
          createdBy: 'UserName',
          modifiedBy: 'UserName',
          projectCreatedDate: '2024-09-24T12:00:00Z',
          startDate: '2024-09-25T09:00:00Z',
          endDate: '2025-09-25T17:00:00Z',
          createdAt: '2024-09-24T12:00:00Z',
          updatedAt: '2024-09-24T12:00:00Z',
        },
      ];

      projectServiceStub.resolves(mockProjects);

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await projectController.getAllProjects(req, res);

      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith(mockProjects)).to.be.true;
    });

    it('should return 404 if no projects are found', async () => {
      projectServiceStub.resolves([]);

      const req = {
        params: {},
        query: {},
        clientId: '1',
        sowId: '1',
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await projectController.getAllProjects(req, res);

      expect(res.status.calledWith(404)).to.be.true;
      expect(res.json.calledWith({ error: "No projects found." })).to.be.true;
    });

    it('should return 401 if unauthorized', async () => {
      const errorResponse = { response: { status: 401 } };
      projectServiceStub.rejects(errorResponse);

      const req = {
        params: {},
        query: {},
        clientId: '1',
        sowId: '1',
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await projectController.getAllProjects(req, res);

      expect(res.status.calledWith(401)).to.be.true;
      expect(res.json.calledWith({ error: constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED })).to.be.true;
    });

    it('should return 400 for bad request', async () => {
      const errorResponse = { response: { status: 400 } };
      projectServiceStub.rejects(errorResponse);

      const req = {
        params: {},
        query: {},
        clientId: '1',
        sowId: '1',
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await projectController.getAllProjects(req, res);

      expect(res.status.calledWith(400)).to.be.true;
      expect(res.json.calledWith({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST })).to.be.true;
    });

    it('should return 500 for internal server error', async () => {
      const errorResponse = new Error('Internal server error');
      projectServiceStub.rejects(errorResponse);

      const req = {
        params: {},
        query: {},
        clientId: '1',
        sowId: '1',
      };

      const res = {
        status: sinon.stub().returnsThis(),
        json: sinon.spy(),
      };

      await projectController.getAllProjects(req, res);

      expect(res.status.calledWith(500)).to.be.true;
      expect(res.json.calledWith({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR })).to.be.true;
    });
  });

  describe('createProject', () => {
    let req, res, sandbox, createProjectStub, keysToCamelCaseStub, loggerErrorStub;

    beforeEach(() => {
      createProjectStub = sinon.stub(projectService, 'createProject');
      sinon.stub(camelcaseConverter, 'keysToCamelCase').callsFake((data) => data); // Stub to bypass actual conversion
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should create a project and return 201 with the created project data', async () => {
      const mockNewProject = {
        sowNo: "SOW67890-005P",
        description: "The Project description.",
        projectPostingGroupId: 1001,
        wipMethodId: 1002,
        locationId: 1002,
        projectCreatedDate: "2024-08-29T14:00:00Z",
        startDate: "2024-08-29T14:00:00Z",
        endDate: "2024-08-29T14:00:00Z",
        createdBy: "sunil-inn"
      };

      const mockCreatedProject = {
        ...mockNewProject,
        projectNo: 'PRJ0001'
      };

      createProjectStub.resolves(mockCreatedProject);

      const response = await request(app)
        .post('/project')
        .send(mockNewProject);

      expect(response.status).to.equal(201);
      expect(response.body).to.deep.equal(mockCreatedProject);
      expect(createProjectStub.calledOnce).to.be.true;
    });

    it('should return 400 if name is missing', async () => {
      const mockNewProject = {
        createdBy: "sunil.sinha"
      };

      const response = await request(app)
        .post('/project')
        .send(mockNewProject);

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal(constants.PROJECT_API.VALIDATION_MESSAGES.NAME_REQUIRED);
    });

    it('should return 400 if createdBy is missing', async () => {
      const mockNewProject = {
        description: "Textile Enterprises"
      };

      const response = await request(app)
        .post('/project')
        .send(mockNewProject);

      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal(constants.PROJECT_API.VALIDATION_MESSAGES.CREATEDBY_REQUIRED);
    });

    it('should return 500 if an error occurs during project creation', async () => {
      const mockNewProject = {
        description: "Textile Project",
        createdBy: "sunil.sinha"
      };

      createProjectStub.rejects(new Error('Database error'));

      const response = await request(app)
        .post('/project')
        .send(mockNewProject);

      expect(response.status).to.equal(500);
      expect(response.body.error).to.equal(constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
    });
  });

  describe('updateProject', () => {
    let req, res;
  
    beforeEach(() => {
      req = {
        params: {},
        body: {},
        clientId: 'clientId',
        sowId: 'sowId'
      };
      res = {
        status: sinon.stub().returnsThis(),
        json: sinon.stub(),
      };
    });
  
    afterEach(() => {
      sinon.restore();
    });
  
    it('should return 400 if project data is empty', async () => {
      req.params.projectId = '1';
      await projectController.updateProject(req, res); // Method call updated
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
    });
  
    it('should return 404 if project is not found', async () => {
      req.params.projectId = '1';
      req.body = { description: 'Test project', modifiedBy: 'test-user' };
  
      sinon.stub(projectService, 'updateProject').resolves(null); // Simulating project not found
  
      await projectController.updateProject(req, res); // Method call updated
      sinon.assert.calledWith(res.status, 404);
      sinon.assert.calledWith(res.json, {
        error: constants.PROJECT_API.ERROR_MESSAGES.PROJECT_NOT_FOUND.replace('{projectId}', '1'),
      });
    });
  
    it('should return 200 and the updated project', async () => {
      req.params.projectId = '1';
      req.body = { description: 'Test project', modifiedBy: 'test-user' };
  
      const updatedProject = {
        id: 1,
        description: 'Test project',
        projectPostingGroupId: 1001,
        wipMethodId: 1002,
        locationId: 1002,
        projectCreatedDate: '2024-08-29T14:00:00Z',
        startDate: '2024-08-29T14:00:00Z',
        endDate: '2024-08-29T14:00:00Z',
        modifiedBy: 'test-user',
      };
  
      sinon.stub(projectService, 'updateProject').resolves(updatedProject);
      sinon.stub(camelcaseConverter, 'keysToCamelCase').returns(updatedProject); // Convert keys to camel case
  
      await projectController.updateProject(req, res); // Method call updated
      sinon.assert.calledWith(res.status, 200);
      sinon.assert.calledWith(res.json, updatedProject);
    });
  
    it('should return 500 if an error occurs', async () => {
      req.params.projectId = '1';
      req.body = { description: 'Test project', modifiedBy: 'test-user' };
  
      const error = new Error('Some error');
      sinon.stub(projectService, 'updateProject').throws(error);
      sinon.stub(logger.logger, 'error');
  
      await projectController.updateProject(req, res); // Method call updated
      sinon.assert.calledWith(res.status, 500);
      sinon.assert.calledWith(res.json, { error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
      sinon.assert.calledWith(logger.logger.error, error);
    });
  
    it('should return 400 for HTTP_STATUS_CODE.BAD_REQUEST error', async () => {
      req.params.projectId = '1';
      req.body = { description: 'Test project', modifiedBy: 'test-user' };
  
      const error = new Error(constants.HTTP_STATUS_CODE.BAD_REQUEST);
      sinon.stub(projectService, 'updateProject').throws(error);
      sinon.stub(logger.logger, 'error');
  
      await projectController.updateProject(req, res); // Method call updated
      sinon.assert.calledWith(res.status, 400);
      sinon.assert.calledWith(res.json, { error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
      sinon.assert.calledWith(logger.logger.error, error);
    });
  });
});
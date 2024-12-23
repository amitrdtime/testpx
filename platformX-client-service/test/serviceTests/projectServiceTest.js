import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinon from 'sinon';
import projectService from '../../services/projectService.js';
import projectRepository from '../../data/repositories/projectRepository.js';
import logger from '../../logging/logger.js';
import constants from '../../config/constants.js';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Project Service', () => {

  describe('getAllProjects', () => {
    let stub;

    beforeEach(() => {
      stub = sinon.stub(projectRepository, 'getAllProjects');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return projects when valid parameters are provided', async () => {
      const mockProjects = {
        totalCount: 2,
        page: 1,
        pageSize: 10,
        projects: [
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
          // Add other projects as necessary
        ],
      };

      stub.resolves(mockProjects);

      const result = await projectService.getAllProjects('1', '1', '', 'projectNo', 'ASC', 1, 10);
      expect(result).to.deep.equal(mockProjects);
      expect(stub.calledOnce).to.be.true;
    });

    it('should throw an error if searchTerm is not a string', async () => {
      await expect(projectService.getAllProjects('1', '1', 123, 'projectNo', 'ASC', 1, 10))
        .to.be.rejectedWith('searchTerm must be a string');
    });

    it('should throw an error if sortOrder is invalid', async () => {
      await expect(projectService.getAllProjects('1', '1', '', 'projectNo', 'INVALID', 1, 10))
        .to.be.rejectedWith('sortOrder must be either "ASC" or "DESC"');
    });

    it('should throw an error if pageNumber is invalid', async () => {
      await expect(projectService.getAllProjects('1', '1', '', 'projectNo', 'ASC', 0, 10))
        .to.be.rejectedWith('pageNumber must be a positive number');
    });

    it('should log the error and rethrow it', async () => {
      const error = new Error('Some error');
      stub.rejects(error);
      const logSpy = sinon.spy(logger.logger, 'error');

      await expect(projectService.getAllProjects('1', '1', '', 'projectNo', 'ASC', 1, 10)).to.be.rejectedWith(error);

      expect(logSpy.calledOnce).to.be.true;
      expect(logSpy.calledWith(error)).to.be.true;

      logSpy.restore();
    });
  });

  describe('getProjectByProjectId', () => {
    let getProjectByProjectIdStub;

    const mockProject = {
      id: 1,
      customerId: "1",
      customerNo: "CUST001",
      customerName: "Customer Name",
      sowId: 1,
      sowNo: "SOW00001",
      projectNo: "SOW00001_001",
      description: "Project description goes here",
      projectPostingGroupId: 1,
      projectPostingGroupName: "Posting Group Name",
      wipMethodId: 2,
      wipMethodName: "WIP Method Name",
      locationId: 3,
      locationName: "Location Name",
      createdBy: "UserName",
      modifiedBy: "UserName",
      projectCreatedDate: "2024-09-24T12:00:00Z",
      startDate: "2024-09-25T09:00:00Z",
      endDate: "2025-09-25T17:00:00Z",
      createdAt: "2024-09-24T12:00:00Z",
      updatedAt: "2024-09-24T12:00:00Z"
    };

    beforeEach(() => {
      getProjectByProjectIdStub = sinon.stub(projectRepository, 'getProjectByProjectId');
    });

    afterEach(() => {
      sinon.restore();
    });

    it('should return project details for a valid project ID', async () => {
      getProjectByProjectIdStub.resolves(mockProject);

      const result = await projectService.getProjectByProjectId("1", "1", "1");

      expect(result).to.deep.equal(mockProject);
      expect(getProjectByProjectIdStub.calledOnce).to.be.true;
    });

    it('should log an error and throw if an error occurs in the repository', async () => {
      const errorMessage = 'Database error';
      getProjectByProjectIdStub.rejects(new Error(errorMessage));
      const logSpy = sinon.spy(logger.logger, 'error');

      await expect(projectService.getProjectByProjectId("1", "1", "1")).to.be.rejectedWith(errorMessage);

      expect(logSpy.calledOnce).to.be.true; // Check if the error was logged
      expect(logSpy.calledWith(sinon.match.instanceOf(Error))).to.be.true; // Ensure it logged an error instance
      logSpy.restore();
    });
  });

  describe('createProject', () => {
    let createProjectStub;

    beforeEach(() => {
      // Stubbing the project repository's create method
      createProjectStub = sinon.stub(projectRepository, 'createProject');
    });

    afterEach(() => {
      // Restore the original method after each test
      sinon.restore();
    });

    it('should successfully create a project', async () => {
      const newProject = {
        description: "The Test Project description.",
        projectPostingGroupId: 1001,
        wipMethodId: 1002,
        locationId: 1002,
        projectCreatedDate: "2024-08-29T14:00:00Z",
        startDate: "2024-08-29T14:00:00Z",
        endDate: "2024-08-29T14:00:00Z",
        createdBy: "sunil-inn"
      };
      const sowId = 1;
      const clientId = 1;

      // Mock response of successful project creation
      const createdProjectResponse = {
        ...newProject,
        sowId,
        customerId: clientId,
        projectId: 1
      };

      createProjectStub.resolves(createdProjectResponse);

      const result = await projectService.createProject(newProject, sowId, clientId);

      expect(createProjectStub.calledOnce).to.be.true;
      expect(result).to.deep.equal(createdProjectResponse);
    });

    it('should throw an error when project creation fails', async () => {
      const newProject = {};
      const sowId = 1;
      const clientId = 1;

      // Mock the error
      const errorMessage = 'Database error';
      createProjectStub.rejects(new Error(errorMessage));

      try {
        await projectService.createProject(newProject, sowId, clientId);
        throw new Error('Test failed. Expectesd method to throw.');
      } catch (error) {
        expect(error.message).to.equal(`${constants.PROJECT_API.ERROR_MESSAGES.ERROR}: ${errorMessage}`);
      }
    });
  });

  describe('updateProject', () => {
    let updateProjectStub;
    let loggerStub;

    beforeEach(() => {
      // Stubbing the project repository's update method
      updateProjectStub = sinon.stub(projectRepository, 'updateProject');
      // Stubbing the logger to prevent actual logging during test
      loggerStub = sinon.stub(logger.logger, 'error');
    });

    afterEach(() => {
      // Restore the original methods after each test
      sinon.restore();
    });

    it('should successfully update a project', async () => {
      const clientId = 12345;
      const sowId = 'SOW67890-005P';
      const projectId = 1;
      const projectDataToUpdate = {
        description: "Project description goes here",
        projectPostingGroupId: 1,
        wipMethodId: 2,
        locationId: 3,
        startDate: "2024-09-25T09:00:00Z",
        endDate: "2025-09-25T17:00:00Z",
        modifiedBy: "UserName"
      };

      // Mock response of successful project update
      const updatedProjectResponse = {
        id: projectId,
        ...projectDataToUpdate,
        projectCreatedDate: "2024-09-24T12:00:00Z",
        updatedAt: "2024-09-24T12:00:00Z"
      };

      updateProjectStub.resolves(updatedProjectResponse);

      const result = await projectService.updateProject(clientId, sowId, projectId, projectDataToUpdate);

      expect(updateProjectStub.calledOnceWithExactly(projectId, projectDataToUpdate)).to.be.true;
      expect(result).to.deep.equal(updatedProjectResponse);
    });

    it('should log and throw an error when project update fails', async () => {
      const clientId = 12345;
      const sowId = 'SOW67890-005P';
      const projectId = 1;
      const projectDataToUpdate = { description: "Update data" };

      // Mock the error
      const errorMessage = 'Database error';
      const error = new Error(errorMessage);
      updateProjectStub.rejects(error);

      try {
        await projectService.updateProject(clientId, sowId, projectId, projectDataToUpdate);
        throw new Error('Test failed. Expected method to throw.');
      } catch (err) {
        expect(updateProjectStub.calledOnce).to.be.true;
        expect(loggerStub.calledOnce).to.be.true;
        expect(loggerStub.calledWithExactly(
          `${constants.PROJECT_API.ERROR_MESSAGES.ERROR}:`,
          error.message
        )).to.be.true;
        expect(err.message).to.equal(errorMessage);
      }
    });
  });
  
});

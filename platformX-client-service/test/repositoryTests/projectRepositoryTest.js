import * as chai from 'chai';
import sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import projectRepository from '../../data/repositories/projectRepository.js';
import project from 'platformxdb-clientmodule/db/models/project.js';
import client from 'platformxdb-clientmodule/db/models/client.js';
import sow from 'platformxdb-clientmodule/db/models/sow.js';
import constants from '../../config/constants.js';

chai.use(chaiAsPromised);
const { expect } = chai;

describe('Project Repository', () => {

    //Get All Projects data layer test scenarios
    describe('getAllProjects', () => {
        let countStub;
        let findAllStub;

        beforeEach(() => {
            // Stubbing the methods on the project model
            countStub = sinon.stub(project, 'count');
            findAllStub = sinon.stub(project, 'findAll');
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should fetch all projects without pagination', async () => {
            const clientId = '123';
            const sowId = '456';
            const searchTerm = '';
            const projectsMock = [
                {
                    id: 1,
                    projectNo: 'SOW00001_001',
                    description: 'Project 1',
                    clientId,
                    sowId,
                    createdBy: 'User1',
                    modifiedBy: 'User1',
                    projectCreatedDate: new Date(),
                    startDate: new Date(),
                    endDate: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    client: { customerNo: 'CUST001', name: 'Customer 1' },
                    sow: { sowNo: 'SOW00001' },
                    projectPostingGroup: { id: 1, description: 'Posting Group 1' },
                    wipMethod: { id: 1, description: 'WIP Method 1' },
                    location: { id: 1, name: 'Location 1' },
                },
                {
                    id: 2,
                    projectNo: 'SOW00002_001',
                    description: 'Project 2',
                    clientId,
                    sowId,
                    createdBy: 'User2',
                    modifiedBy: 'User2',
                    projectCreatedDate: new Date(),
                    startDate: new Date(),
                    endDate: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    client: { customerNo: 'CUST002', name: 'Customer 2' },
                    sow: { sowNo: 'SOW00002' },
                    projectPostingGroup: { id: 2, description: 'Posting Group 2' },
                    wipMethod: { id: 2, description: 'WIP Method 2' },
                    location: { id: 2, name: 'Location 2' },
                },
            ];

            // Mocking the return values
            countStub.resolves(2); // Total records
            findAllStub.resolves(projectsMock); // Projects data

            const result = await projectRepository.getAllProjects(clientId, sowId, searchTerm);

            expect(result).to.deep.equal({
                pageNumber: 1,
                pageSize: 0,
                totalRecords: 2,
                totalPages: 1,
                data: projectsMock.map(p => ({
                    id: p.id,
                    customerId: p.clientId,
                    customerNo: p.client.customerNo,
                    customerName: p.client.name,
                    sowId: p.sowId,
                    sowNo: p.sow.sowNo,
                    projectNo: p.projectNo,
                    description: p.description,
                    projectPostingGroupId: p.projectPostingGroup.id,
                    projectPostingGroupName: p.projectPostingGroup.description,
                    wipMethodId: p.wipMethod.id,
                    wipMethodName: p.wipMethod.description,
                    locationId: p.location.id,
                    locationName: p.location.name,
                    createdBy: p.createdBy,
                    modifiedBy: p.modifiedBy,
                    projectCreatedDate: p.projectCreatedDate,
                    startDate: p.startDate,
                    endDate: p.endDate,
                    createdAt: p.createdAt,
                    updatedAt: p.updatedAt,
                })),
            });
        });

        it('should fetch projects with pagination', async () => {
            const clientId = '123';
            const sowId = '456';
            const searchTerm = '';
            const projectsMock = [
                {
                    id: 1,
                    projectNo: 'SOW00001_001',
                    description: 'Project 1',
                    clientId,
                    sowId,
                    createdBy: 'User1',
                    modifiedBy: 'User1',
                    projectCreatedDate: new Date(),
                    startDate: new Date(),
                    endDate: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    client: { customerNo: 'CUST001', name: 'Customer 1' },
                    sow: { sowNo: 'SOW00001' },
                    projectPostingGroup: { id: 1, description: 'Posting Group 1' },
                    wipMethod: { id: 1, description: 'WIP Method 1' },
                    location: { id: 1, name: 'Location 1' },
                },
                {
                    id: 2,
                    projectNo: 'SOW00002_001',
                    description: 'Project 2',
                    clientId,
                    sowId,
                    createdBy: 'User2',
                    modifiedBy: 'User2',
                    projectCreatedDate: new Date(),
                    startDate: new Date(),
                    endDate: new Date(),
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    client: { customerNo: 'CUST002', name: 'Customer 2' },
                    sow: { sowNo: 'SOW00002' },
                    projectPostingGroup: { id: 2, description: 'Posting Group 2' },
                    wipMethod: { id: 2, description: 'WIP Method 2' },
                    location: { id: 2, name: 'Location 2' },
                },
            ];

            // Mocking the return values
            countStub.resolves(2); // Total records
            findAllStub.resolves(projectsMock); // Projects data

            const result = await projectRepository.getAllProjects(clientId, sowId, searchTerm, 'projectNo', 'ASC', 1, 10);

            expect(result).to.deep.equal({
                pageNumber: 1,
                pageSize: 10,
                totalRecords: 2,
                totalPages: 1,
                data: projectsMock.map(p => ({
                    id: p.id,
                    customerId: p.clientId,
                    customerNo: p.client.customerNo,
                    customerName: p.client.name,
                    sowId: p.sowId,
                    sowNo: p.sow.sowNo,
                    projectNo: p.projectNo,
                    description: p.description,
                    projectPostingGroupId: p.projectPostingGroup.id,
                    projectPostingGroupName: p.projectPostingGroup.description,
                    wipMethodId: p.wipMethod.id,
                    wipMethodName: p.wipMethod.description,
                    locationId: p.location.id,
                    locationName: p.location.name,
                    createdBy: p.createdBy,
                    modifiedBy: p.modifiedBy,
                    projectCreatedDate: p.projectCreatedDate,
                    startDate: p.startDate,
                    endDate: p.endDate,
                    createdAt: p.createdAt,
                    updatedAt: p.updatedAt,
                })),
            });
        });

        it('should throw an error when fetching projects fails', async () => {
            const clientId = '123';
            const sowId = '456';
            const searchTerm = '';

            // Mocking the count method to throw an error
            countStub.rejects(new Error('Database error'));

            try {
                await projectRepository.getAllProjects(clientId, sowId, searchTerm);
                throw new Error('Expected method to throw.'); // Fail the test if no error is thrown
            } catch (error) {
                expect(error.message).to.equal('Error fetching Projects: Database error');
            }
        });
    });

    //Get Project by ProjectId data layer test scenarios
    describe('getProjectByProjectId', () => {
        let findOneStub;

        beforeEach(() => {
            // Stubbing the findOne method of the project model
            findOneStub = sinon.stub(project, 'findOne');
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should return a project when found', async () => {
            const clientId = '1';
            const sowId = '1';
            const projectId = '1';

            const mockProject = {
                id: 1,
                clientId,
                sowId,
                projectNo: 'SOW00001_001',
                description: 'Project description goes here',
                createdBy: 'UserName',
                modifiedBy: 'UserName',
                projectCreatedDate: new Date(),
                startDate: new Date(),
                endDate: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                client: { customerNo: 'CUST001', name: 'Customer Name' },
                sow: { sowNo: 'SOW00001' },
                projectPostingGroup: { id: 1, description: 'Posting Group Name' },
                wipMethod: { id: 2, description: 'WIP Method Name' },
                location: { id: 3, name: 'Location Name' },
            };

            findOneStub.resolves(mockProject);

            const result = await projectRepository.getProjectByProjectId(clientId, sowId, projectId);

            expect(result).to.deep.equal({
                id: 1,
                customerId: clientId,
                customerNo: 'CUST001',
                customerName: 'Customer Name',
                sowId: sowId,
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
                projectCreatedDate: mockProject.projectCreatedDate,
                startDate: mockProject.startDate,
                endDate: mockProject.endDate,
                createdAt: mockProject.createdAt,
                updatedAt: mockProject.updatedAt,
            });
        });

        it('should throw an error when project is not found', async () => {
            const clientId = '1';
            const sowId = '1';
            const projectId = '999'; // Assuming this ID does not exist

            findOneStub.resolves(null); // Simulating that no project was found

            try {
                await projectRepository.getProjectByProjectId(clientId, sowId, projectId);
                throw new Error('Expected method to throw.'); // Fail the test if no error is thrown
            } catch (error) {
                expect(error.message).to.equal('Error while getting project: Cannot read properties of null (reading \'id\')'); // Adjust error message as needed
            }
        });

        it('should throw an error when there is a database error', async () => {
            const clientId = '1';
            const sowId = '1';
            const projectId = '1';

            const dbError = new Error('Database error');
            findOneStub.rejects(dbError); // Simulating a database error

            try {
                await projectRepository.getProjectByProjectId(clientId, sowId, projectId);
                throw new Error('Expected method to throw.'); // Fail the test if no error is thrown
            } catch (error) {
                expect(error.message).to.equal('Error while getting project: Database error');
            }
        });
    });

    //Create Project data layer test scenarios
    describe('createProject', () => {
        let findOneStub, createStub;

        const mockProjectData = {
            sowNo: 'SOW67890-005P',
            description: 'The Project description.',
            projectPostingGroupId: 1001,
            wipMethodId: 1002,
            locationId: 1002,
            createdBy: 'sunil-inn',
        };

        beforeEach(() => {
            findOneStub = sinon.stub(project, 'findOne');
            createStub = sinon.stub(project, 'create');
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should create a project with a new projectNo when no project exist', async () => {
            findOneStub.resolves(null); // No project found

            createStub.resolves({
                get: () => ({ ...mockProjectData, projectNo: 'PRJ0001' })
            });

            const result = await projectRepository.createProject(mockProjectData);

            expect(result).to.deep.equal({ ...mockProjectData, projectNo: 'PRJ0001' });
            expect(createStub.calledOnce).to.be.true;
        });

        it('should create a project with an incremented projectNo when projects exist', async () => {
            findOneStub.resolves({ projectNo: 'PRJ0001' }); // Last Project found

            createStub.resolves({
                get: () => ({ ...mockProjectData, projectNo: 'PRJ0002' })
            });

            const result = await projectRepository.createProject(mockProjectData);

            expect(result).to.deep.equal({ ...mockProjectData, projectNo: 'PRJ0002' });
            expect(createStub.calledOnce).to.be.true;
        });

        it('should throw an error if create fails', async () => {
            findOneStub.resolves(null);
            createStub.rejects(new Error('database error'));

            try {
                await projectRepository.createProject(mockProjectData);
                throw new Error('database error');
            } catch (error) {
                expect(error.message).to.equal(constants.PROJECT_API.ERROR_MESSAGES.ERROR + ': database error');
            }

            expect(createStub.calledOnce).to.be.true;
        });
    });

    describe('updateProject', () => {
        let sandbox;
        let findByPkStub;
        let updateStub;

        beforeEach(() => {
            sandbox = sinon.createSandbox();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('should update project successfully when valid fields are provided', async () => {
            // Mock the existing project and its update method
            const existingProjectMock = {
                id: 1,
                description: "Old description",
                projectPostingGroupId: 1,
                wipMethodId: 2,
                locationId: 3,
                update: sinon.stub().resolves({
                    id: 1,
                    description: "Updated project description",
                    projectPostingGroupId: 1,
                    wipMethodId: 2,
                    locationId: 3,
                    modifiedBy: "UserName",
                    updatedAt: "2024-09-24T12:00:00Z",
                }),
                get: sinon.stub().returns({
                    id: 1,
                    description: "Updated project description",
                    projectPostingGroupId: 1,
                    wipMethodId: 2,
                    locationId: 3,
                    modifiedBy: "UserName",
                    updatedAt: "2024-09-24T12:00:00Z",
                })
            };

            // Stub project.findByPk to return the mock project
            findByPkStub = sandbox.stub(project, 'findByPk').resolves(existingProjectMock);

            // Define data to update
            const projectId = 1;
            const projectDataToUpdate = {
                description: "Updated project description"
            };

            // Call the function
            const result = await projectRepository.updateProject(projectId, projectDataToUpdate);

            // Assertions
            expect(findByPkStub.calledOnceWith(projectId)).to.be.true;
            expect(existingProjectMock.update.calledOnceWith(projectDataToUpdate)).to.be.true;
            expect(result.description).to.equal('Updated project description');
        });

        it('should throw an error when trying to update restricted fields', async () => {
            // Mock the existing project
            const existingProjectMock = {
                id: 1,
                projectNo: "P12345",
                createdAt: "2024-09-24T12:00:00Z",
                update: sinon.stub().resolves(),
                get: sinon.stub().returns({})
            };

            // Stub project.findByPk to return the mock project
            findByPkStub = sandbox.stub(project, 'findByPk').resolves(existingProjectMock);

            // Define data to update, including restricted fields
            const projectId = 1;
            const projectDataToUpdate = {
                projectNo: "P99999",  // This should trigger an error
            };

            try {
                await projectRepository.updateProject(projectId, projectDataToUpdate);
                throw new Error('Expected error not thrown');
            } catch (error) {
                expect(error.message).to.equal(constants.HTTP_STATUS_CODE.BAD_REQUEST);
            }
        });

        it('should return null when project is not found', async () => {
            // Stub project.findByPk to return null
            findByPkStub = sandbox.stub(project, 'findByPk').resolves(null);

            const projectId = 999;
            const projectDataToUpdate = { description: "Some description" };

            const result = await projectRepository.updateProject(projectId, projectDataToUpdate);

            expect(result).to.be.null;
            expect(findByPkStub.calledOnceWith(projectId)).to.be.true;
        });

        it('should throw an error if project.findByPk fails', async () => {
            // Stub project.findByPk to throw an error
            findByPkStub = sandbox.stub(project, 'findByPk').throws(new Error('Database error'));

            const projectId = 1;
            const projectDataToUpdate = { description: "Some description" };

            try {
                await projectRepository.updateProject(projectId, projectDataToUpdate);
                throw new Error('Expected error not thrown');
            } catch (error) {
                expect(error.message).to.equal('Database error');
            }
        });
    });
    
});
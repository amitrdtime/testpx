import { expect } from 'chai';
import userService from '../../services/userService.js';
import User from '../../domain/models/user.js';
import sinon from 'sinon';
import userRepository from '../../data/repositories/userRepository.js';
import userBcservice from '../../services/businessCentral/userBcService.js';

describe("UserService", () => {

    // Mock user and additional details
    const userData = {
        EmpID: 1,
        FirstName: "Asha",
        LastName: "N",
        OfficialEmail: 'asha@innoverdigital.com'
    };
    const mockUserInfo = new User(userData);

    const mockTimesheetDetail = {
        projectName: "Project X",
        timesheetStatus: "Submitted"
    };

    const updateUserData = {
        EmpID: 1,
        FirstName: 'AshaUpdated',
        LastName: 'N',
        PhoneNumber: '1234567890'
    };
    const mockUpdateUser = new User(updateUserData);

     // Mock data setup for roles
     const mockRoles = [
        { RoleID: 1, RoleName: 'Admin' },
        { RoleID: 2, RoleName: 'Developer' },
        { RoleID: 2, RoleName: 'SuperAdmin' },
        { RoleID: 2, RoleName: 'User' }
    ];

    let userStub;
    let getResourceDetailStub;

    afterEach(() => {
        // Restore the original methods after each test
        sinon.restore();
    });

    describe('Get User By Email', () => {

        it('should return combined user info when both sources have data', async () => {

            // Stub the userRepository.getUserByEmail method
            userStub = sinon.stub(userRepository, 'getUserByEmail').resolves(mockUserInfo);
            // Stub the userBcservice.getResourceDetail method
            getResourceDetailStub = sinon.stub(userBcservice, 'getResourceDetail').resolves(mockTimesheetDetail);

            const result = await userService.getUserByEmail('asha@innoverdigital.com');

            console.log(result); // Debugging output

            expect(result).to.be.an('object');
            expect(result).to.include({ FirstName: "Asha", LastName: "N" });
            expect(result).to.include({ projectName: "Project X", timesheetStatus: "Submitted" });
        });

        it('should return an empty object if the user is not found', async () => {
            // Stub the userRepository.getUserByEmail method to return null
            userStub = sinon.stub(userRepository, 'getUserByEmail').resolves({});
            // Stub the userBcservice.getResourceDetail method to return empty details
            getResourceDetailStub = sinon.stub(userBcservice, 'getResourceDetail').resolves({});

            const result = await userService.getUserByEmail('nonexistent@example.com');

            console.log(result); // Debugging output

            expect(result).to.be.an('object').that.is.empty;
        });
    });

    describe("Create User", () => {

        it('should successfully create the user and return the created user', async () => {
            // Stub the userRepository.createUser method to return the mock created user
            userStub = sinon.stub(userRepository, 'createUser').resolves(mockUserInfo);
    
            // Call the createUser method in userService
            const result = await userService.createUser(mockUserInfo);
    
            // Check if the result returned by userService.createUser is the expected user object
            expect(result).to.deep.equal(mockUserInfo);
        });

        it('should return null if there is an error', async () => {
            // Stub the userRepository.createUser method to return null
            userStub = sinon.stub(userRepository, 'createUser').resolves(null);
        
            const result = await userService.createUser(mockUserInfo);
    
            // Expecting result to not be null, but it will be null, so the test will fail
            expect(result).to.be.null;
        });
    });

    describe("Update User", () => {

        const empId = 1;
        it('should successfully update the user and return the updated user', async () => {

            // Stub the userRepository.updateUser method to return the mock updated user
            userStub = sinon.stub(userRepository, 'updateUser').resolves(mockUpdateUser);

            const result = await userService.updateUser(empId, mockUpdateUser);

            expect(result).to.deep.equal(mockUpdateUser);
        });

        it('should return null if the user is not found', async () => {

            // Stub the userRepository.updateUser method to return null
            userStub = sinon.stub(userRepository, 'updateUser').resolves(null);

            const result = await userService.updateUser(empId, mockUpdateUser);

            expect(result).to.be.null;
        });
    });

    describe("Get User Roles", () => {

        it('should return roles when userRepository.getRoles is successful', async () => {
               
            // Stub userRepository.getRoles to return the mock roles
            userStub = sinon.stub(userRepository, 'getRoles').resolves(mockRoles);
    
            const result = await userService.getUserRoles();
    
            expect(result).to.deep.equal(mockRoles);
        });

        it('should throw an error when userRepository.getRoles fails', async () => {
            // Stub userRepository.getRoles to throw an error
            userStub = sinon.stub(userRepository, 'getRoles').rejects(new Error('Repository error'));
    
            try {
                await userService.getUserRoles();
                expect.fail('getUserRoles should have thrown an error');
            } catch (err) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('Repository error');
            }
        });
    });

    describe("Update User Roles", () => {

        it('should return the updated user when userRepository.updateRoleToUser is successful', async () => {
              
            // Stub userRepository.updateRoleToUser to return the mock updated user
            userStub = sinon.stub(userRepository, 'updateRoleToUser').resolves(mockUpdateUser);
    
            const result = await userService.updateRoleToUser(mockUpdateUser);
    
            expect(result).to.deep.equal(mockUpdateUser);
        });

        it('should return null if no user was found to update', async () => {
            // Stub userRepository.updateRoleToUser to return null
            userStub = sinon.stub(userRepository, 'updateRoleToUser').resolves(null);
    
            const result = await userService.updateRoleToUser(mockUpdateUser);
    
            expect(result).to.be.null;
        });
    
        it('should throw an error if userRepository.updateRoleToUser fails', async () => {
            // Stub userRepository.updateRoleToUser to throw an error
            userStub = sinon.stub(userRepository, 'updateRoleToUser').rejects(new Error('Repository error'));
    
            try {
                await userService.updateRoleToUser(mockUpdateUser);
                expect.fail('updateRoleToUser should have thrown an error');
            } catch (err) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('Repository error');
            }
        });
    });
});
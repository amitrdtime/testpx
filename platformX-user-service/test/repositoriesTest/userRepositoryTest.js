import { expect } from 'chai';
import User from '../../domain/models/user.js';
import sinon from 'sinon';
import userRepository from '../../data/repositories/userRepository.js';
import db from '../../data/db.js';

describe('UserRepository', () => {
    let dbQueryStub;

    afterEach(() => {
        // Restore the original method after each test
        sinon.restore();
    });

    const userData = {
        EmpID: 40,
        FirstName: 'Asha',
        LastName: 'N',
        PhoneNumber: '1234567890',
        PersonalEmail: 'asha@gmail.com',
        Gender: 'Female',
        DOB: '2000-05-25',
        BloodGroup: 'B+',
        Nationality: 'Indian',
        CurrentAddress: '123 Main St, City, Country',
        PermanentAddress: '456 Park Ave, City, Country',
        SecondaryNumber: '9876543210',
        UserRole: 'ReadOnly',
        Designation: 'Developer',
        OfficialEmail: 'asha@innoverdigital.com',
        BaseLocation: 'Bangalore',
        ReportingManager: 'Himesh',
        TypeOfEmployee: 'Full-Time',
        Department: 'Software Engineering',
        WorkingType: 'WFH',
        CreatedBy: 'Asha.Bavan',
        CreatedDate: '2024-07-24T18:38:18.206Z',
        ModifiedDate: '2024-07-25T18:38:18.206Z',
        ModifiedBy: 'Admin'
    };
    const mockUserForEmail = new User(userData);

    // Mock data setup for roles
    const mockRoles = [
        { RoleID: 1, RoleName: 'Admin' },
        { RoleID: 2, RoleName: 'Developer' },
        { RoleID: 2, RoleName: 'SuperAdmin' },
        { RoleID: 2, RoleName: 'User' }
    ];

    describe('Get User By Email', () => {

        it('should return user data when the user is found', async () => {

            // Stub the db.query method to return the mock user
            dbQueryStub = sinon.stub(db, 'query').resolves({ rows: [mockUserForEmail] });

            const result = await userRepository.getUserByEmail('asha@innoverdigital.com');

            console.log(result); // Debugging output

            expect(result).to.be.an('object');
            expect(result).to.include({ FirstName: "Asha", LastName: "N" });
            expect(result).to.have.property('OfficialEmail', 'asha@innoverdigital.com');
        });

        it('should return undefined when the user is not found', async () => {
            // Stub the db.query method to return an empty array
            dbQueryStub = sinon.stub(db, 'query').resolves({ rows: [] });

            const result = await userRepository.getUserByEmail('nonexistent@example.com');

            console.log(result); // Debugging output

            expect(result).to.be.undefined;
        });
    });
    
    describe("Create User", () => {

        it('should return created user when the create is successful', async () => {
        
            // Stub the db.query method to return a mock response
            dbQueryStub = sinon.stub(db, 'query').resolves({ rows: [mockUserForEmail] });

            const result = await userRepository.createUser(mockUserForEmail);

            // Debugging output
            console.log("Result:", result);

            expect(result).to.be.an('object');
            expect(result).to.include({ FirstName: "Asha", LastName: "N" });
            expect(result).to.have.property('OfficialEmail', 'asha@innoverdigital.com');
        });
    });

    describe("Update User", () => {

        it('should return updated user when the update is successful', async () => {
            const empId = 1;
            // Stub the db.query method to return a mock response
            dbQueryStub = sinon.stub(db, 'query').resolves({ rows: [mockUserForEmail] });

            const result = await userRepository.updateUser(empId, mockUserForEmail);

            // Debugging output
            console.log("Result:", result);

            expect(result).to.be.an('object');
            expect(result).to.include({ FirstName: "Asha", LastName: "N" });
            expect(result).to.have.property('OfficialEmail', 'asha@innoverdigital.com');
        });

        it('should return null if the user is not found', async () => {
            const empId = 4;
            // Stub the db.query method to return a mock response
            dbQueryStub.resolves({ rows: [] });

            const result = await userRepository.updateUser(empId, mockUserForEmail);

            // Debugging output
            console.log("Result:", result);

            expect(result).to.be.null;
        });
    });

    describe("Get User Roles", () => {

        it('should return roles when query is successful', async () => {
           // Stub db.query to return the mock roles
            dbQueryStub = sinon.stub(db, 'query').resolves({ rows: mockRoles });

            const result = await userRepository.getRoles();
    
            expect(result).to.deep.equal(mockRoles);
        });
    
        it('should throw an error when the query fails', async () => {
            // Stub db.query to throw an error
            dbQueryStub = sinon.stub(db, 'query').rejects(new Error('Database error'));
    
            try {
                await userRepository.getRoles();
                expect.fail('getRoles should have thrown an error');
            } catch (err) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('Database error');
            }
        });
    });

    describe("Update User Roles", () => {

        it('should return the updated user when the query is successful', async () => {
            const mockUser = {
                roleId: 1,
                email: 'user@example.com',
            };
    
            const mockResult = {
                rows: [{
                    EmpID: 20,
                    FirstName: 'John',
                    LastName: 'Doe',
                    RoleId: 1,
                    OfficialEmail: 'user@example.com'                
                }]
            };
    
            // Stub db.query to return the mock updated user
            dbQueryStub = sinon.stub(db, 'query').resolves(mockResult);
    
            const result = await  userRepository.updateRoleToUser(mockUser);
    
            expect(result).to.be.an.instanceOf(User);
            expect(result).to.include({
                FirstName: 'John',
                LastName: 'Doe',
                RoleId: 1,
                OfficialEmail: 'user@example.com',
            });
        });
    
        it('should return null if no user was found to update', async () => {
            const mockUser = {
                roleId: 1,
                email: 'nonexistent@example.com',
            };
    
            const mockResult = {
                rows: []
            };
    
            // Stub db.query to return an empty array
            dbQueryStub = sinon.stub(db, 'query').resolves(mockResult);
    
            const result = await userRepository.updateRoleToUser(mockUser);
    
            expect(result).to.be.null;
        });
    
        it('should throw an error if the query fails', async () => {
            const mockUser = {
                roleId: 1,
                email: 'user@example.com',
            };
    
            // Stub db.query to throw an error
            dbQueryStub = sinon.stub(db, 'query').rejects(new Error('Database error'));
    
            try {
                await userRepository.updateRoleToUser(mockUser);
                expect.fail('updateRoleToUser should have thrown an error');
            } catch (err) {
                expect(err).to.be.an('error');
                expect(err.message).to.equal('Database error');
            }
        });
    });
});
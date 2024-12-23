import { expect } from 'chai';
import request from 'supertest';
import express from 'express';
import userRoute from '../../routes/users.js';
import userRoleRoute from '../../routes/roles.js';
import userService from '../../services/userService.js';
import User from '../../domain/models/user.js';
import sinon from 'sinon';
import camelcaseConverter from '../../helper/camelcaseConverter.js';

const app = express();
app.use(express.json());
app.use('/api/users', userRoute);
app.use('/api/roles', userRoleRoute);

describe("UserController", () => {
    // Mock data setup
    const mockUsers = [
        {
            EmpID: 1,
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
            ModifiedBy: 'Admin',
        },
        {
            EmpID: 2,
            FirstName: 'Komal',
            LastName: 'N',
            PhoneNumber: '1234567891',
            PersonalEmail: 'komal@gmail.com',
            Gender: 'Female',
            DOB: '2000-06-15',
            BloodGroup: 'O+',
            Nationality: 'Indian',
            CurrentAddress: '789 Oak St, City, Country',
            PermanentAddress: '456 Park Ave, City, Country',
            SecondaryNumber: '9876543211',
            UserRole: 'Admin',
            Designation: 'Manager',
            OfficialEmail: 'komal@innoverdigital.com',
            BaseLocation: 'Hyderabad',
            ReportingManager: 'Vikram',
            TypeOfEmployee: 'Part-Time',
            Department: 'HR',
            WorkingType: 'Office',
            CreatedBy: 'Komal.Bavan',
            CreatedDate: '2024-07-24T18:38:18.206Z',
            ModifiedDate: '2024-07-25T18:38:18.206Z',
            ModifiedBy: 'Admin',
        }
    ];

    const userList = mockUsers.map(user => new User(user));

    const userData = {
        EmpID: 1,
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

    // Mock data setup for updated user
    const updatedUserData = {
        email: 'asha@innoverdigital.com',
        roleId: 2
    };

    const mockUpdatedUserResonse = {
        Email: 'asha@innoverdigital.com',
        RoleId: 2
    };

    let getUsersStub;

    afterEach(() => {
        // Restore the original method after the test
        getUsersStub.restore();
    });

    describe("Get All Users", () => {

        it('should return a list of users', async () => {
            // Stub the userService.getUsers method  
            getUsersStub = sinon.stub(userService, 'getUsers').resolves(mockUsers);

            const res = await request(app).get('/api/users');
            // Debugging output
            console.log(res.body);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(2);
            expect(res.body[0]).to.include({ firstName: "Asha", lastName: "N" });
            expect(res.body[1]).to.include({ firstName: 'Komal', lastName: "N" });
        });

        it('should not return a list of users', async () => {
            // Stub the userService.getUsers method to return an empty array
            getUsersStub = sinon.stub(userService, 'getUsers').resolves([]);

            const res = await request(app).get('/api/users');

            // Debugging output
            console.log(res.status);
            console.log(res.body);

            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({});
        });
    });

    describe("Get Users by Email", () => {
        it('should return a user object when a valid email is provided', async () => {

            // Stub the userService.getUserByEmail method
            getUsersStub = sinon.stub(userService, 'getUserByEmail').resolves(mockUserForEmail);

            const res = await request(app).get('/api/users/asha@innoverdigital.com');

            // Debugging output
            console.log(res.body);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.include({ firstName: "Asha", lastName: "N" });
        });

        it('should return empty object when the user is not found', async () => {
            // Stub the userService.getUserByEmail method to return null
            getUsersStub = sinon.stub(userService, 'getUserByEmail').resolves({});

            const res = await request(app).get('/api/users/nonexistent@example.com');

            expect(res.body).to.be.an('object').that.is.empty;
        });
    })

    describe("Create User", () => {

        it('should create the user and return the created user in camelCase', async () => {
            // Stub the userService.createUser method     
            getUsersStub = sinon.stub(userService, 'createUser').resolves(mockUserForEmail);

            const res = await request(app)
                .post(`/api/users`)
                .send(mockUserForEmail);

            const expectedResponse = camelcaseConverter.keysToCamelCase(mockUserForEmail);

            expect(res.status).to.equal(201);
            expect(res.body).to.be.an('object');
            expect(res.body).to.deep.equal(expectedResponse);
        });        

        it('should return 500 if there is an error creating the user', async () => {
            // Stub the userService.createUser method to throw an error
            getUsersStub = sinon.stub(userService, 'createUser').rejects(new Error('Create error'));

            const res = await request(app)
                .post(`/api/users`)
                .send(mockUserForEmail);

            expect(res.status).to.equal(500);
            expect(res.body).to.deep.equal({ error: `Error creating user` });
        });
    });

    describe("Update User", () => {

        const empId = 1;

        it('should update the user and return the updated user in camelCase', async () => {
            // Stub the userService.updateUser method     
            getUsersStub = sinon.stub(userService, 'updateUser').resolves(mockUpdateUser);

            const res = await request(app)
                .put(`/api/users/${empId}`)
                .send(mockUpdateUser);

            const expectedResponse = camelcaseConverter.keysToCamelCase(mockUpdateUser);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.deep.equal(expectedResponse);
        });

        it('should return 404 if the user is not found', async () => {
            // Stub the userService.updateUser method to return null
            getUsersStub = sinon.stub(userService, 'updateUser').resolves(null);

            const res = await request(app)
                .put(`/api/users/${empId}`)
                .send(mockUpdateUser);

            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ error: `User with EmpID ${empId} not found` });
        });

        it('should return 500 if there is an error updating the user', async () => {
            // Stub the userService.updateUser method to throw an error
            getUsersStub = sinon.stub(userService, 'updateUser').rejects(new Error('Update error'));

            const res = await request(app)
                .put(`/api/users/${empId}`)
                .send(mockUpdateUser);

            expect(res.status).to.equal(500);
            expect(res.body).to.deep.equal({ error: `Error updating user with EmpID ${empId}` });
        });
    });

    describe("Get User Roles", () => {

        it('should return a list of roles in camelCase', async () => {
            // Stub the userService.getUserRoles method
            getUsersStub = sinon.stub(userService, 'getUserRoles').resolves(mockRoles);

            const res = await request(app).get('/api/roles');

            // Debugging output
            console.log(res.body);

            const expectedResponse = camelcaseConverter.keysToCamelCase(mockRoles);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.deep.equal(expectedResponse);
        });

        it('should return 404 if no roles are found', async () => {
            // Stub the userService.getUserRoles method to return null
            getUsersStub = sinon.stub(userService, 'getUserRoles').resolves(null);

            const res = await request(app).get('/api/roles');

            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({});
        });

        it('should return 500 if there is an error getting the roles', async () => {
            // Stub the userService.getUserRoles method to throw an error
            getUsersStub = sinon.stub(userService, 'getUserRoles').rejects(new Error('Get roles error'));

            const res = await request(app).get('/api/roles');

            expect(res.status).to.equal(500);
            expect(res.body).to.deep.equal({ error: 'Error in getting all roles' });
        });
    });

    describe("Update User Roles", () => {

        it('should update the user role and return the updated user in camelCase', async () => {
            // Stub the userService.updateRoleToUser method
            getUsersStub = sinon.stub(userService, 'updateRoleToUser').resolves(mockUpdatedUserResonse);

            const res = await request(app)
                .put('/api/roles')
                .send(updatedUserData);

            const expectedResponse = camelcaseConverter.keysToCamelCase(mockUpdatedUserResonse);

            expect(res.status).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.deep.equal(expectedResponse);
        });

        it('should return 404 if the user is not found', async () => {
            // Stub the userService.updateRoleToUser method to return null
            getUsersStub = sinon.stub(userService, 'updateRoleToUser').resolves(null);

            const res = await request(app)
                .put('/api/roles')
                .send(updatedUserData);

            expect(res.status).to.equal(404);
            expect(res.body).to.deep.equal({ error: `User with Email ${updatedUserData.email} not found` });
        });

        it('should return 500 if there is an error updating the user role', async () => {
            // Stub the userService.updateRoleToUser method to throw an error
            getUsersStub = sinon.stub(userService, 'updateRoleToUser').rejects(new Error('Update role error'));

            const res = await request(app)
                .put('/api/roles')
                .send(updatedUserData);

            expect(res.status).to.equal(500);
            expect(res.body).to.deep.equal({ error: `Error updating user with Email ${updatedUserData.email}` });
        });
    });
});
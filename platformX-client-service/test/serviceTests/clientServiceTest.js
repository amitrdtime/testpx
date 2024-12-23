import { expect } from 'chai';
import sinon from 'sinon';
import clientService from '../../services/clientService.js';
import clientRepository from '../../data/repositories/clientRepository.js';
import constants from '../../config/constants.js';
import logger from "../../logging/logger.js";

describe('Client service', () => {

    //Create customer service test scenarios
    describe('createCustomer', () => {
        let createCustomerStub;

        beforeEach(() => {
            createCustomerStub = sinon.stub(clientRepository, 'createCustomer');
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should successfully create a customer and return the new client', async () => {
            const mockNewCustomer = {
                name: "Textile Enterprises",
                address: "123 Business Rd",
                address2: "Suite 456",
                countryRegionId: 65,
                city: "Marietta",
                state: "Georgia",
                zipCode: "30009",
                phoneNo: "+1-555-123-4567",
                mobilePhoneNo: "+1-555-765-4321",
                email: "contact@textileenterprises.com",
                faxNo: "+1-555-987-6543",
                website: "https://www.textileenterprises.com",
                languageId: 1,
                formatRegionId: 1,
                contactId: 1,
                createdBy: "Anand.Periyasamy"
            };

            const mockCreatedCustomer = {
                ...mockNewCustomer,
                customerNo: 'C000001' // Mock the customerNo as needed
            };

            createCustomerStub.resolves(mockCreatedCustomer);

            const result = await clientService.createCustomer(mockNewCustomer);

            expect(result).to.deep.equal(mockCreatedCustomer);
            expect(createCustomerStub.calledOnce).to.be.true;
        });

        it('should throw an error if creating the customer fails', async () => {
            const mockNewCustomer = {
                name: "Textile Enterprises",
                // Other properties as needed
            };

            const errorMessage = 'Database error';
            createCustomerStub.rejects(new Error(errorMessage));

            try {
                await clientService.createCustomer(mockNewCustomer);
                throw new Error('Expected createCustomer to throw an error');
            } catch (error) {
                expect(error.message).to.equal(`${constants.CLIENT_API.ERROR_MESSAGES.ERROR}: ${errorMessage}`);
            }

            expect(createCustomerStub.calledOnce).to.be.true;
        });
    });

    //Update customer service test scenarios
    describe('updateCustomer Service Method', () => {
        let updateCustomerStub, loggerStub;
    
        const customerId = 1;
        const validCustomerData = {
            name: "Textile Enterprises-updated",
            address: "123 Business Rd-updated",
            modifiedBy: "Anand.Periyasamy"
        };
    
        const invalidCustomerData = {
            id: 1, // Not allowed to be updated
            name: "Invalid Enterprises",
            address: "Invalid Rd",
            createdAt: "2024-01-01", // Not allowed to be updated
            modifiedBy: "Anand.Periyasamy"
        };
    
        beforeEach(() => {
            // Stub the updateCustomer method in the clientRepository
            updateCustomerStub = sinon.stub(clientRepository, 'updateCustomer');
    
            // Stub the logger to avoid unnecessary log output
            loggerStub = sinon.stub(logger.logger, 'error');
        });
    
        afterEach(() => {
            // Restore the original methods after each test
            sinon.restore();
        });
    
        it('should successfully update a customer when valid data is provided', async () => {
            // Simulate successful update
            const updatedCustomer = {
                ...validCustomerData,
                id: customerId
            };
            updateCustomerStub.resolves(updatedCustomer);
    
            const result = await clientService.updateCustomer(customerId, validCustomerData);
    
            expect(result).to.be.an('object');
            expect(result.id).to.equal(customerId);
            expect(result.name).to.equal(validCustomerData.name);
            expect(result.address).to.equal(validCustomerData.address);
            expect(result.modifiedBy).to.equal(validCustomerData.modifiedBy);
    
            expect(updateCustomerStub.calledOnce).to.be.true;
            expect(updateCustomerStub.calledWith(customerId, validCustomerData)).to.be.true;
        });
    
        it('should throw an error when updating restricted fields', async () => {
            // Simulate bad request error for restricted fields
            updateCustomerStub.rejects(new Error(constants.HTTP_STATUS_CODE.BAD_REQUEST.toString()));
    
            try {
                await clientService.updateCustomer(customerId, invalidCustomerData);
                expect.fail('Expected error to be thrown');
            } catch (error) {
                expect(error.message).to.equal(constants.HTTP_STATUS_CODE.BAD_REQUEST.toString());
            }
    
            expect(updateCustomerStub.calledOnce).to.be.true;
            expect(updateCustomerStub.calledWith(customerId, invalidCustomerData)).to.be.true;
        });
    
        it('should throw an error when the update fails due to a server error', async () => {
            // Simulate server error
            const serverError = new Error('Internal Server Error');
            updateCustomerStub.rejects(serverError);
    
            try {
                await clientService.updateCustomer(customerId, validCustomerData);
                expect.fail('Expected server error to be thrown');
            } catch (error) {
                expect(error.message).to.equal('Internal Server Error');
            }
    
            expect(updateCustomerStub.calledOnce).to.be.true;
            expect(updateCustomerStub.calledWith(customerId, validCustomerData)).to.be.true;
            expect(loggerStub.calledOnce).to.be.true;
            expect(loggerStub.calledWith(sinon.match.string, serverError.message)).to.be.true;
        });
    
        it('should return null if the customer does not exist', async () => {
            // Simulate customer not found
            updateCustomerStub.resolves(null);
    
            const result = await clientService.updateCustomer(customerId, validCustomerData);
    
            expect(result).to.be.null;
            expect(updateCustomerStub.calledOnce).to.be.true;
            expect(updateCustomerStub.calledWith(customerId, validCustomerData)).to.be.true;
        });
    });

    describe('Client service - getCustomers', () => {
        let getCustomersStub;
    
        beforeEach(() => {
            // Stub the clientRepository.getCustomers method
            getCustomersStub = sinon.stub(clientRepository, 'getCustomers');
        });
    
        afterEach(() => {
            // Restore the original methods after each test
            sinon.restore();
        });
    
        // Test case: search term validation
        it('should throw an error if search term is not a string', async () => {
            try {
                await clientService.getCustomers(123, 'createdAt', 'ASC', 1, 10); // Invalid search term (not a string)
                throw new Error('Expected error to be thrown');
            } catch (error) {
                expect(error.message).to.equal('Failed to retrieve customers: searchTerm must be a string'); // Updated with prefix
            }
        });
    
        // Test case: sortOrder validation
        it('should throw an error if sortOrder is invalid', async () => {
            try {
                await clientService.getCustomers('John', 'createdAt', 'INVALID', 1, 10); // Invalid sortOrder
                throw new Error('Expected error to be thrown');
            } catch (error) {
                expect(error.message).to.equal('Failed to retrieve customers: sortOrder must be either "ASC" or "DESC"'); // Updated with prefix
            }
        });
    
        // Test case: pageNumber validation
        it('should throw an error if pageNumber is less than 1', async () => {
            try {
                await clientService.getCustomers('John', 'createdAt', 'ASC', 0, 10); // Invalid pageNumber (less than 1)
                throw new Error('Expected error to be thrown');
            } catch (error) {
                expect(error.message).to.equal('Failed to retrieve customers: pageNumber must be a positive number'); // Updated with prefix
            }
        });
    
        // Test case: pageSize validation
        it('should throw an error if pageSize is not a number', async () => {
            try {
                await clientService.getCustomers('John', 'createdAt', 'ASC', 1, 'invalid'); // Invalid pageSize (not a number)
                throw new Error('Expected error to be thrown');
            } catch (error) {
                expect(error.message).to.equal('Failed to retrieve customers: pageSize must be a positive number'); // Updated with prefix
            }
        });
    
        // Test case: successful retrieval of customers
        it('should return customers when valid parameters are provided', async () => {
            const mockCustomerData = [
                { id: 1, name: 'Customer 1', createdAt: '2023-10-01' },
                { id: 2, name: 'Customer 2', createdAt: '2023-10-02' }
            ];
    
            getCustomersStub.resolves(mockCustomerData); // Stub to return mock customer data
    
            const result = await clientService.getCustomers('John', 'createdAt', 'ASC', 1, 10);
    
            expect(result).to.deep.equal(mockCustomerData);
            expect(getCustomersStub.calledOnce).to.be.true;
            expect(getCustomersStub.calledWith('John', 'createdAt', 'ASC', 1, 10)).to.be.true;
        });
    
        // Test case: error during customer retrieval
        it('should throw an error if fetching customers fails', async () => {
            const errorMessage = 'Database error';
            getCustomersStub.rejects(new Error(errorMessage)); // Stub to throw an error
    
            try {
                await clientService.getCustomers('John', 'createdAt', 'ASC', 1, 10);
                throw new Error('Expected error to be thrown');
            } catch (error) {
                expect(error.message).to.equal(`${constants.CLIENT_API.ERROR_MESSAGES.CLIENT_FETCH_FAILED}: ${errorMessage}`);
            }
    
            expect(getCustomersStub.calledOnce).to.be.true;
        });
    });

    describe('Client Service - getCustomerById', () => {
        let getCustomerByIdStub;
    
        beforeEach(() => {
            // Stub the clientRepository.getCustomerById method
            getCustomerByIdStub = sinon.stub(clientRepository, 'getCustomerById');
        });
    
        afterEach(() => {
            // Restore the original methods after each test
            sinon.restore();
        });
        
        // Test case: Customer does not exist
        it('should return null if no customer is found for the given ID', async () => {
            getCustomerByIdStub.resolves(null); // Stub to return null
    
            const result = await clientService.getCustomerById(999); // Assuming 999 does not exist
    
            expect(result).to.be.null;
            expect(getCustomerByIdStub.calledOnce).to.be.true;
            expect(getCustomerByIdStub.calledWith(999)).to.be.true;
        });
    
        // Test case: Error during customer retrieval
        it('should throw an error if an error occurs while fetching the customer', async () => {
            const errorMessage = 'Database error';
            getCustomerByIdStub.rejects(new Error(errorMessage)); // Stub to throw an error
    
            try {
                await clientService.getCustomerById(1);
                throw new Error('Expected error to be thrown');
            } catch (error) {
                expect(error.message).to.equal(errorMessage);
            }
    
            expect(getCustomerByIdStub.calledOnce).to.be.true;
            expect(getCustomerByIdStub.calledWith(1)).to.be.true;
        });
    });
    
    
});
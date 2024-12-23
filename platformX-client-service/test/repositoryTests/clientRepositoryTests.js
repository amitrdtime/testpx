import { expect } from 'chai';
import sinon from 'sinon';
import clientRepository from '../../data/repositories/clientRepository.js';
import client from "platformxdb-clientmodule/db/models/client.js";
import constants from '../../config/constants.js';

describe('Customer Repository', () => {
    
    //Create customer data layer test scenarios
    describe('createCustomer', () => {
        let findOneStub, createStub;

        const mockCustomerData = {
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

        beforeEach(() => {
            findOneStub = sinon.stub(client, 'findOne');
            createStub = sinon.stub(client, 'create');
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should create a customer with a new customerNo when no customers exist', async () => {
            findOneStub.resolves(null); // No customers found

            createStub.resolves({
                get: () => ({ ...mockCustomerData, customerNo: 'C000001' })
            });

            const result = await clientRepository.createCustomer(mockCustomerData);

            expect(result).to.deep.equal({ ...mockCustomerData, customerNo: 'C000001' });
            expect(createStub.calledOnce).to.be.true;
        });

        it('should create a customer with an incremented customerNo when customers exist', async () => {
            findOneStub.resolves({ customerNo: 'C000001' }); // Last customer found

            createStub.resolves({
                get: () => ({ ...mockCustomerData, customerNo: 'C000002' })
            });

            const result = await clientRepository.createCustomer(mockCustomerData);

            expect(result).to.deep.equal({ ...mockCustomerData, customerNo: 'C000002' });
            expect(createStub.calledOnce).to.be.true;
        });

        it('should throw an error if create fails', async () => {
            findOneStub.resolves(null);
            createStub.rejects(new Error('Database error'));

            try {
                await clientRepository.createCustomer(mockCustomerData);
                throw new Error('Expected createCustomer to throw an error');
            } catch (error) {
                expect(error.message).to.equal('Database error');
            }

            expect(createStub.calledOnce).to.be.true;
        });
    });

    //Update customer data layer test scenarios
    describe('updateCustomer', () => {
        let getCustomerByIdStub;

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

        const existingCustomer = {
            id: customerId,
            name: "Textile Enterprises",
            address: "123 Business Rd",
            createdAt: new Date(), // Existing createdAt
            modifiedBy: "Initial.Modifier", // Existing modifier
            update: sinon.stub().resolves(), // Simulate update
            get: sinon.stub().returns({ // Simulate return value from get
                id: customerId,
                name: "Textile Enterprises-updated",
                address: "123 Business Rd-updated",
                modifiedBy: "Anand.Periyasamy"
            })
        };

        beforeEach(() => {
            // Mock the getCustomerById and update stubs
            getCustomerByIdStub = sinon.stub(client, 'findByPk').resolves(existingCustomer);
        });

        afterEach(() => {
            // Restore original functions after each test
            sinon.restore();
        });

        it('should successfully update an existing client', async () => {
            const result = await clientRepository.updateCustomer(customerId, validCustomerData);

            expect(result).to.be.an('object');
            expect(result.name).to.equal(validCustomerData.name);
            expect(result.address).to.equal(validCustomerData.address);
            expect(result.modifiedBy).to.equal(validCustomerData.modifiedBy); // Ensure this checks the right field
            expect(existingCustomer.update.calledOnce).to.be.true;
        });

        it('should throw an error when trying to update restricted fields', async () => {
            try {
                await clientRepository.updateCustomer(customerId, invalidCustomerData);
                expect.fail('Expected error to be thrown');
            } catch (error) {
                expect(error.message).to.equal(constants.HTTP_STATUS_CODE.BAD_REQUEST.toString());
            }
        });

        it('should return null if the client does not exist', async () => {
            // Simulate client not found
            getCustomerByIdStub.resolves(null);

            const result = await clientRepository.updateCustomer(customerId, validCustomerData);
            expect(result).to.be.null;
        });
    });

    describe('getCustomerById', () => {
        let findByPkStub;

        const mockCustomerId = 1;
        const mockCustomerData = {
            id: mockCustomerId,
            name: "Customer 1",
            countryRegion: { id: 1, name: "Region 1", code: "R1" },
            language: { id: 1, name: "English", code: "EN" },
            format_region: { id: 1, name: "Format 1", region: "North" },
            contact: { id: 1, no: "12345", name: "John Doe" }
        };

        beforeEach(() => {
            findByPkStub = sinon.stub(client, 'findByPk').resolves(mockCustomerData);
        });

        afterEach(() => {
            sinon.restore();
        });

        it('should return customer data including countryRegion, language, format_region, and contact', async () => {
            const result = await clientRepository.getCustomerById(mockCustomerId);
            expect(result).to.deep.equal(mockCustomerData);
            expect(findByPkStub.calledOnceWith(mockCustomerId)).to.be.true;
        });

        it('should return null if customer is not found', async () => {
            findByPkStub.resolves(null);
            const result = await clientRepository.getCustomerById(mockCustomerId);
            expect(result).to.be.null;
        });

        it('should throw an error when findByPk fails', async () => {
            findByPkStub.rejects(new Error('Database error'));
            try {
                await clientRepository.getCustomerById(mockCustomerId);
                throw new Error('Expected getCustomerById to throw an error');
            } catch (error) {
                expect(error.message).to.equal('Database error');
            }
        });
    });

    describe('Customer Repository - getCustomers', () => {
        let findAllStub, countStub;
    
        const mockCustomerData = [
            {
                id: 1,
                customerNo: 'C000001',
                name: 'Customer 1',
                countryRegion: { id: 1, name: 'Country 1', code: 'C1' },
                language: { id: 1, name: 'English', code: 'EN' },
                format_region: { id: 1, name: 'Format 1', region: 'Region 1' },
                contact: { id: 1, no: '12345', name: 'John Doe' },
                createdBy: 'User1',
                createdAt: new Date(),
                modifiedBy: 'User1',
                updatedAt: new Date()
            }
        ];
    
        beforeEach(() => {
            findAllStub = sinon.stub(client, 'findAll');
            countStub = sinon.stub(client, 'count');
        });
    
        afterEach(() => {
            sinon.restore();
        });
        
        it('should return paginated customers when pageSize and pageNumber are specified', async () => {
            countStub.resolves(10);
            findAllStub.resolves(mockCustomerData);
    
            const result = await clientRepository.getCustomers('Customer', 'createdAt', 'DESC', 1, 10);
    
            expect(result.pageNumber).to.equal(1);
            expect(result.pageSize).to.equal(10);
            expect(result.totalRecords).to.equal(10);
            expect(result.totalPages).to.equal(1);
            expect(result.data).to.be.an('array').that.has.length(1);
            expect(result.data[0].name).to.equal('Customer 1');
        });
    
        it('should return an empty array if no customers match the search term', async () => {
            countStub.resolves(0);
            findAllStub.resolves([]);
    
            const result = await clientRepository.getCustomers('NonExistentCustomer', 'createdAt', 'DESC', 1, 10);
    
            expect(result.data).to.be.an('array').that.has.length(0);
            expect(result.totalRecords).to.equal(0);
            expect(result.totalPages).to.equal(0);
        });
    
        it('should throw an error if there is an issue fetching customers', async () => {
            findAllStub.rejects(new Error('Database error'));
    
            try {
                await clientRepository.getCustomers('Customer', 'createdAt', 'DESC', 1, 10);
                throw new Error('Expected getCustomers to throw an error');
            } catch (error) {
                expect(error.message).to.equal('Database error');
            }
        });
    });  
});

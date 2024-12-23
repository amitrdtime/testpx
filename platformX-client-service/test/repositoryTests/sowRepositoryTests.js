import { expect } from 'chai';
import sinon from 'sinon';
import sowRepository from '../../data/repositories/sowRepository.js';
import sow from "platformxdb-clientmodule/db/models/sow.js";
import constants from '../../config/constants.js';

describe('SOW Repository', () => {

    const mockSowData = {
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

    let findOneStub, createStub, countStub, findAllStub, updateStub,mapSOWsStub;

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

    const existingSow = {
        id: 1,
        description: "SOW Platorm x",
        customerNo: "C000001",
        customerId: 1,
        createdBy: "Asha.Nandrekar",
        // Mocking relationships as well
        client: {
            id: 1,
            name: 'Client A',
            customerNo: 'C000001',
            address: '123 Main St',
            city: 'Sample City',
            state: 'Sample State',
            zipCode: '12345',
            phoneNo: '1234567890',
            email: 'clienta@example.com',
        },
        projectManager: {
            id: 2,
            resourceNo: 'R0001',
            resourceName: 'John Doe',
        },
        currency: {
            id: 1,
            code: 'USD',
        },
        update: sinon.stub().resolves(), // Simulate update
        get: sinon.stub().returns({ // Simulate return value from get
            id: 1,
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
            modifiedBy: "Asha.Nandrekar",
        })
    };

    const mockSOWs = [
        {
            id: 1,
            sowNo: 'SOW001',
            description: 'Test SOW 1',
            createdAt: new Date(),
            updatedAt: new Date(),
            client: {
                id: 1,
                name: 'Test Client',
                customerNo: 'C001',
                address: '123 Main St',
                city: 'Metropolis',
                countryRegion: { id: 1, name: 'USA' }
            }
        },
        {
            id: 2,
            sowNo: 'SOW002',
            description: 'Test SOW 2',
            createdAt: new Date(),
            updatedAt: new Date(),
            client: {
                id: 1,
                name: 'Test Client',
                customerNo: 'C002',
                address: '456 Main St',
                city: 'Metropolis',
                countryRegion: { id: 1, name: 'USA' }
            }
        }
    ];

    beforeEach(() => {
        findOneStub = sinon.stub(sow, 'findOne');
        createStub = sinon.stub(sow, 'create');
        updateStub = sinon.stub(sow, 'update');
    });

    afterEach(() => {
        sinon.restore();
    });

    //Create SOW data layer test scenarios
    describe('Create SOW', () => {

        it('should create a SOW with a new sowNo when no SOW exist', async () => {
            findOneStub.resolves(null); // No SOW found

            createStub.resolves({
                get: () => ({ ...mockSowData, sowNo: 'SOW00001' })
            });

            const result = await sowRepository.createSow(mockSowData);

            expect(result).to.deep.equal({ ...mockSowData, sowNo: 'SOW00001' });
            expect(createStub.calledOnce).to.be.true;
        });

        it('should create a SOW with an incremented sowNo when SOW exist', async () => {
            findOneStub.resolves({ sowNo: 'SOW00001' }); // Last customer found

            createStub.resolves({
                get: () => ({ ...mockSowData, sowNo: 'SOW00001' })
            });

            const result = await sowRepository.createSow(mockSowData);

            expect(result).to.deep.equal({ ...mockSowData, sowNo: 'SOW00001' });
            expect(createStub.calledOnce).to.be.true;
        });

        it('should throw an error if create fails', async () => {
            findOneStub.resolves(null);
            createStub.rejects(new Error('Database error'));

            try {
                await sowRepository.createSow(mockSowData);
                throw new Error('Expected createSow to throw an error');
            } catch (error) {
                expect(error.message).to.equal('Failed to create SOW.: Database error');
            }

            expect(createStub.calledOnce).to.be.true;
        });
    });

    //Update SOW data layer test scenarios
    describe('Update SOW', () => {
        it('should successfully update an existing SOW', async () => {

            findOneStub.resolves(existingSow);

            updateStub.resolves({
                get: () => ({ ...mockSowData, sowNo: 'SOW00001', id: '1' })
            });

            const result = await sowRepository.updateSow(sowId, clientId, validSowData);

            expect(result).to.be.an('object');
            expect(result.description).to.equal(validSowData.description);
            expect(result.modifiedBy).to.equal(validSowData.modifiedBy); // Ensure this checks the right field
            expect(existingSow.update.calledOnce).to.be.true;
        });

        it('should throw an error when trying to update restricted fields', async () => {
            try {
                findOneStub.resolves(existingSow);
                await sowRepository.updateSow(sowId, clientId, invalidSowData);
                expect.fail('Expected error to be thrown');
            } catch (error) {
                expect(error.message).to.equal(constants.HTTP_STATUS_CODE.BAD_REQUEST.toString());
            }
        });

        it('should return null if the SOW does not exist', async () => {
            // Simulate SOW not found
            findOneStub.resolves(null);

            const result = await sowRepository.updateSow(sowId, clientId, validSowData);
            expect(result).to.be.null;
        });
    });

    //Get SOW by client Id and SOW Id data layer test scenarios
    describe('Get SOW by clientId and sowId', () => {

        it('should return the SOW and its plain object representation if found', async () => {
            findOneStub.resolves({
                ...existingSow,
                get: sinon.stub().returns(existingSow),
            });

            const result = await sowRepository.getSowByClientIdAndSowId(sowId, clientId);

            expect(result.existingSow).to.not.be.null;
            expect(result.existingSow.id).to.equal(sowId);
            expect(result.existingSow.customerId).to.equal(clientId);
            expect(result.sowPlain).to.deep.equal(existingSow);
            expect(findOneStub.calledOnce).to.be.true;
        });

        it('should return null if the SOW is not found', async () => {
            findOneStub.resolves(null); // Simulate no result found

            const result = await sowRepository.getSowByClientIdAndSowId(sowId, clientId);

            expect(result.existingSow).to.be.null;
            expect(result.sowPlain).to.be.null;
            expect(findOneStub.calledOnce).to.be.true;
        });

        it('should throw an error if findOne fails', async () => {
            findOneStub.rejects(new Error('Database error'));

            try {
                await sowRepository.getSowByClientIdAndSowId(sowId, clientId);
                throw new Error('Expected getSowByClientIdAndSowId to throw an error');
            } catch (error) {
                expect(error.message).to.equal(
                    `${constants.SOW_API.ERROR_MESSAGES.SOW_FETCH_FAILED}: Database error`
                );
            }

            expect(findOneStub.calledOnce).to.be.true;
        });

    });

    //Get SOW by client Id data layer test scenarios
    describe('Get SOWs by clientId', () => {
        const searchTerm = 'test';
        const sortField = 'createdAt';
        const sortOrder = 'DESC';
        const pageNumber = 1;
        const pageSize = 10;
        const totalRecords = 25;

        it('should fetch paginated SOWs for a given clientId and search term', async () => {

            countStub = sinon.stub(sow, 'count').resolves(25);
            findAllStub = sinon.stub(sow, 'findAll').resolves(mockSOWs);

            // Call the function
            const result = await sowRepository.getSOWs(clientId, searchTerm, sortField, sortOrder, pageNumber, pageSize);

            // Assertions
            expect(countStub.calledOnce).to.be.true;
            expect(findAllStub.calledOnce).to.be.true;
            expect(result).to.have.property('pageNumber', pageNumber);
            expect(result).to.have.property('pageSize', pageSize);
            expect(result).to.have.property('totalRecords', totalRecords);
            expect(result).to.have.property('totalPages', Math.ceil(totalRecords / pageSize));
            expect(result.data).to.be.an('array').with.lengthOf(mockSOWs.length);
            expect(result.data[0]).to.have.property('id', mockSOWs[0].id);
            expect(result.data[0]).to.have.property('sowNo', mockSOWs[0].sowNo);
            expect(result.data[0]).to.have.property('description', mockSOWs[0].description);
            expect(result.data[0]).to.have.property('customerName', mockSOWs[0].client.name);
            expect(result.data[0]).to.have.property('countryRegion', mockSOWs[0].client.countryRegion.name);
        });

        it('should fetch all SOWs when pageNumber or pageSize is 0', async () => {
            const clientId = 1;
            const searchTerm = 'test';
            const sortField = 'createdAt';
            const sortOrder = 'DESC';
            const pageNumber = 0;
            const pageSize = 0;
            const totalRecords = 50;

            // Set up the stubs to return the mock data 
            countStub = sinon.stub(sow, 'count').resolves(totalRecords);
            findAllStub = sinon.stub(sow, 'findAll').resolves(mockSOWs);

            // Call the function
            const result = await sowRepository.getSOWs(clientId, searchTerm, sortField, sortOrder, pageNumber, pageSize);

            // Assertions
            expect(countStub.calledOnce).to.be.true;
            expect(findAllStub.calledOnce).to.be.true;
            expect(result).to.have.property('pageNumber', pageNumber);
            expect(result).to.have.property('pageSize', pageSize);
            expect(result).to.have.property('totalRecords', totalRecords);
            expect(result).to.have.property('totalPages', 1); // Since pagination is skipped
            expect(result.data).to.be.an('array').with.lengthOf(mockSOWs.length);
            expect(result.data[0]).to.have.property('id', mockSOWs[0].id);
            expect(result.data[0]).to.have.property('sowNo', mockSOWs[0].sowNo);
            expect(result.data[0]).to.have.property('description', mockSOWs[0].description);
            expect(result.data[0]).to.have.property('customerName', mockSOWs[0].client.name);
            expect(result.data[0]).to.have.property('countryRegion', mockSOWs[0].client.countryRegion.name);
        });

        it('should handle errors and trigger the catch block', async () => {
            // Simulate an error by making mapSOWs throw
            mapSOWsStub = sinon.stub(sowRepository, 'mapSOW').returns(['mockedData']);
            mapSOWsStub.throws(new Error('Test error'));
    
            try {
                // Mocking the parameters
                const clientId = 1;
                const searchTerm = 'test';
                const sortField = 'createdAt';
                const sortOrder = 'DESC';
                const pageNumber = 1;
                const pageSize = 10;
    
                // Call the function under test
                await sowRepository.getSOWs(clientId, searchTerm, sortField, sortOrder, pageNumber, pageSize);
            } catch (error) {
                // Assertions for the error handling
                expect(error.message).to.include('Error fetching SOWs');
            }
        });
    });

});
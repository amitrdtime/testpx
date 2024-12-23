import { expect } from 'chai';
import sinon from 'sinon';
import sowService from '../../services/sowsService.js';
import sowRepository from '../../data/repositories/sowRepository.js';
import constants from '../../config/constants.js';
import logger from "../../logging/logger.js";

describe('SOW Service', () => {
    
    let sowStub, mapSOWStub, loggerStub;

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

    const existingSowPlain = {
        id: sowId,
        description: 'SOW Platform X',
        customerId: clientId,
        startingDate: '2024-09-30',
        endingDate: '2024-10-30',
        projectManagerId: 2,
        currencyId: 1,
        invoiceCurrencyId: 1,
        blockedId: 10,
    };

    const mappedSOW = {
        ...validSowData,
        id: sowId,
        description: 'SOW Platform X',
        customerId: clientId,
        startDate: '2024-09-30',
        endDate: '2024-10-30',
        manager: 'John Doe',
        currency: 'USD',
    };

    beforeEach(() => {
        // Stub the logger to avoid unnecessary log output
        loggerStub = sinon.stub(logger.logger, 'error');
        });

    afterEach(() => {
        sinon.restore();
    });

    //Create SOW service test scenarios
    describe('createSOW', () => {

        it('should successfully create a SOW and return the new SOW', async () => {

            sowStub = sinon.stub(sowRepository, 'createSow').resolves(mockCreatedSow);

            const result = await sowService.createSow(mockNewSow);

            expect(result).to.deep.equal(mockCreatedSow);
            expect(sowStub.calledOnce).to.be.true;
        });

        it('should throw an error if creating the SOW fails', async () => {

            const errorMessage = 'Database error';
            sowStub = sinon.stub(sowRepository, 'createSow').rejects(new Error(errorMessage));

            try {
                await sowService.createSow(mockNewSow);
                throw new Error('Expected createSow to throw an error');
            } catch (error) {
                expect(error.message).to.equal(`${constants.SOW_API.ERROR_MESSAGES.ERROR}: ${errorMessage}`);
            }

            expect(sowStub.calledOnce).to.be.true;
        });
    });

    //Update SOW service test scenarios
    describe('Update SOW', () => {

        it('should successfully update a SOW when valid data is provided', async () => {

            sowStub = sinon.stub(sowRepository, 'updateSow').resolves(updatedSow);
            mapSOWStub = sinon.stub(sowRepository, 'mapSOW');
            mapSOWStub.withArgs(updatedSow).returns(mappedSOW);
            const result = await sowService.updateSow(sowId, clientId, validSowData);

            expect(result).to.be.an('object');
            expect(result.id).to.equal(sowId);
            expect(result.modifiedBy).to.equal(validSowData.modifiedBy);

            expect(sowStub.calledOnce).to.be.true;
            expect(sowStub.calledWith(sowId, clientId, validSowData)).to.be.true;
        });

        it('should throw an error when updating restricted fields', async () => {
            // Simulate bad request error for restricted fields
            sowStub = sinon.stub(sowRepository, 'updateSow').rejects(new Error(constants.HTTP_STATUS_CODE.BAD_REQUEST.toString()));

            try {
                await sowService.updateSow(sowId, clientId, invalidSowData);
                expect.fail('Expected error to be thrown');
            } catch (error) {
                expect(error.message).to.equal(constants.SOW_API.ERROR_MESSAGES.ERROR_UPDATING_SOW.toString() + ": 400");
            }

            expect(sowStub.calledOnce).to.be.true;
            expect(sowStub.calledWith(sowId, clientId, invalidSowData)).to.be.true;
        });

        it('should return null if the SOW does not exist', async () => {
            // Simulate SOW not found
            sowStub = sinon.stub(sowRepository, 'updateSow').resolves(null);

            const result = await sowService.updateSow(sowId, clientId, validSowData);

            expect(result).to.be.null;
            expect(sowStub.calledOnce).to.be.true;
            expect(sowStub.calledWith(sowId, clientId, validSowData)).to.be.true;
        });
    });

    //Get SOW by client Id and SOW Id service test scenarios
    describe('Get SOW by clientId and sowId', () => {
        it('should return the mapped SOW if found', async () => {
            // Simulate successful find and mapping
            sowStub = sinon.stub(sowRepository, 'getSowByClientIdAndSowId').resolves({ sowPlain: existingSowPlain });
            mapSOWStub = sinon.stub(sowRepository, 'mapSOW');
            mapSOWStub.withArgs(existingSowPlain).returns(mappedSOW);

            const result = await sowService.getSowByClientIdSowId(clientId, sowId);

            expect(result).to.deep.equal(mappedSOW);
            expect(sowStub.calledOnceWithExactly(sowId, clientId)).to.be.true;
            expect(mapSOWStub.calledOnceWithExactly(existingSowPlain)).to.be.true;
        });

        it('should return undefined if no SOW is found', async () => {
            // Simulate no SOW found
            sowStub = sinon.stub(sowRepository, 'getSowByClientIdAndSowId').resolves({ sowPlain: null });
    
            const result = await sowService.getSowByClientIdSowId(clientId, sowId);
    
            expect(result).to.be.undefined;
            expect(sowStub.calledOnceWithExactly(sowId, clientId)).to.be.true;       
        });

        it('should log an error and rethrow if an exception occurs', async () => {
            const errorMessage = 'Database error';
            sowStub = sinon.stub(sowRepository, 'getSowByClientIdAndSowId').rejects(new Error(errorMessage));
    
            try {
                await sowService.getSowByClientIdSowId(clientId, sowId);
                throw new Error('Expected getSowByClientIdSowId to throw an error');
            } catch (error) {
                expect(error.message).to.equal(errorMessage);
                expect(loggerStub.calledOnce).to.be.true;
            }
    
            expect(sowStub.calledOnceWithExactly(sowId, clientId)).to.be.true;
        });
    });

    //Get SOW by client Id service test scenarios
    describe('Get SOW by clientId', () => {
        const clientId = 1;
        const searchTerm = 'test';
        const sortField = 'createdAt';
        const sortOrder = 'DESC';
        const pageNumber = 1;
        const pageSize = 10;
        const mockSowData = [{ id: 1, name: 'Test SOW' }];

        it('should return SOW data if found', async () => {
            // Simulate successful SOW retrieval
            sowStub = sinon.stub(sowRepository, 'getSOWs').resolves(mockSowData);
    
            const result = await sowService.getSows(clientId, searchTerm, sortField, sortOrder, pageNumber, pageSize);
    
            expect(result).to.deep.equal(mockSowData);
            expect(sowStub.calledOnceWithExactly(clientId, searchTerm, sortField, sortOrder, pageNumber, pageSize)).to.be.true;
        });

        it('should log an error and rethrow if an exception occurs', async () => {
            const errorMessage = 'Database error';
            // Simulate an error thrown by the repository
            sowStub = sinon.stub(sowRepository, 'getSOWs').rejects(new Error(errorMessage));
    
            try {
                await sowService.getSows(clientId, searchTerm, sortField, sortOrder, pageNumber, pageSize);
                throw new Error('Failed to retrieve SOW.');
            } catch (error) {
                expect(error.message).to.include(constants.SOW_API.ERROR_MESSAGES.SOW_FETCH_FAILED);
                expect(loggerStub.calledOnce).to.be.true;
                expect(loggerStub.calledWithExactly(`${constants.SOW_API.ERROR_MESSAGES.SOW_FETCH_FAILED}: ${errorMessage}`)).to.be.true;
                expect(sowStub.calledOnceWithExactly(clientId, searchTerm, sortField, sortOrder, pageNumber, pageSize)).to.be.true;
            }
        });

        it('should throw a validation error if input is invalid', async () => {
            // Invalid inputs that will cause validation to fail
            const invalidSearchTerm = ''; // Example of an invalid search term
            const invalidSortOrder = 'INVALID_ORDER'; // Example of an invalid sort order
        
            try {
                // Attempt to call the getSows method with invalid inputs
                await sowService.getSows(clientId, invalidSearchTerm, sortField, invalidSortOrder, pageNumber, pageSize);
                throw new Error('Failed to retrieve SOW.: sortOrder must be either "ASC" or "DESC"');
            } catch (error) {
                // Assertions
                expect(error.message).to.equal('Failed to retrieve SOW.: sortOrder must be either "ASC" or "DESC"');
            }
        });
    });

});
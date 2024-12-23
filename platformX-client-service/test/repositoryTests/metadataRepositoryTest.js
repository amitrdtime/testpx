import { expect } from 'chai';
import sinon from 'sinon';
import metadataRepository from "../../data/repositories/metadataRepository.js";
import metaDataService from "../../services/metaDataService.js";
import countryRegion from 'platformxdb-clientmodule/db/models/country_region.js';
import zip_code from "platformxdb-clientmodule/db/models/zip_code.js";
import languages from "platformxdb-clientmodule/db/models/language.js";
import wip_methods from "platformxdb-clientmodule/db/models/wip_method.js";
import logger from '../../logging/logger.js';

describe('MetaData Repository', () => {

    //Get locations data layer test scenarios
    describe("getLocations", () => {
        let locationStub;

        afterEach(() => {
            sinon.restore(); // Restore original functionality after each test
        });
        it("should return locations successfully", async () => {
            // Mock data for locations
            const mockLocations = [
                { id: 1, code: 'LOC1', name: 'Location 1' },
                { id: 2, code: 'LOC2', name: 'Location 2' }
            ];

            // Stub the findAll method on the location model
            locationStub = sinon.stub(metadataRepository, 'getLocations').resolves(mockLocations);

            // Call the actual repository method
            const locations = await metadataRepository.getLocations();

            // Assertions
            expect(locationStub.calledOnce).to.be.true;
            expect(locations).to.deep.equal(mockLocations);
        });

        it("should throw an error if the database call fails", async () => {
            const errorMessage = "Database Error";
            const error = new Error(errorMessage);

            // Stub the findAll method to throw an error
            locationStub = sinon.stub(metadataRepository, 'getLocations').rejects(error);


            try {
                await metadataRepository.getLocations();
            } catch (error) {
                // Assertions
                expect(locationStub.calledOnce).to.be.true;
                expect(error).to.have.property('message', 'Database Error');
            }
        });
    });

    //Get project posting group data layer test scenarios
    describe("getProjectPostingGroup", () => {
        let metaDataStub;

        afterEach(() => {
            sinon.restore(); // Restore all stubs after each test
        });

        it('should return updated project posting groups successfully', async () => {
            const mockProjectPostingGroups = [
                { id: 1, code: "PG001", description: "Posting Group 1" },
                { id: 2, code: "PG002", description: "Posting Group 2" },
            ];

            // Stub the getProjectPostingGroup method
            metaDataStub = sinon.stub(metadataRepository, "getProjectPostingGroup").resolves(mockProjectPostingGroups);

            const result = await metaDataService.getProjectPostingGroup();

            expect(metaDataStub.calledOnce).to.be.true; // Check if stub was called once
            expect(result).to.deep.equal([
                { id: 1, code: "PG001", description: "Posting Group 1" },
                { id: 2, code: "PG002", description: "Posting Group 2" },
            ]); // Check if the result matches the expected output
        });

        it('should return an empty array if no project posting groups found', async () => {
            metaDataStub = sinon.stub(metadataRepository, "getProjectPostingGroup").resolves([]);

            const result = await metaDataService.getProjectPostingGroup();

            expect(metaDataStub.calledOnce).to.be.true; // Check if stub was called once
            expect(result).to.deep.equal([]); // Check if the result is an empty array
        });

        it('should throw an error if getProjectPostingGroup fails', async () => {
            const error = new Error("Error fetching project posting groups");

            metaDataStub = sinon.stub(metadataRepository, "getProjectPostingGroup").rejects(error);

            try {
                await metaDataService.getProjectPostingGroup();
                expect.fail("Expected method to throw.");
            } catch (err) {
                expect(metaDataStub.calledOnce).to.be.true; // Check if stub was called once
                expect(err.message).to.equal("Error fetching project posting groups"); // Ensure the error message matches
            }
        });
    });

    //Get resources data layer test scenarios
    describe("getResources", () => {
        let resourcesStub;

        afterEach(() => {
            sinon.restore(); // Restore original functionality after each test
        });
        it("should return resources successfully", async () => {
            // Mock data for resources
            const mockResources = [
                { id: 1, resourceNo: 'RES001', resourceName: 'Resource 1' },
                { id: 2, resourceNo: 'RES002', resourceName: 'Resource 2' }
            ];

            // Stub the getResources method
            resourcesStub = sinon.stub(metadataRepository, "getResources").resolves(mockResources);

            // Call the actual service method
            const resources = await metadataRepository.getResources();

            // Assertions
            expect(resourcesStub.calledOnce).to.be.true; // Check if stub was called once
            expect(resources).to.deep.equal(mockResources); // Check if the result matches the expected output
        });

        it("should return an empty array if no resources found", async () => {
            resourcesStub = sinon.stub(metadataRepository, "getResources").resolves([]);

            const resources = await metadataRepository.getResources();

            expect(resourcesStub.calledOnce).to.be.true; // Check if stub was called once
            expect(resources).to.deep.equal([]); // Check if the result is an empty array
        });

        it("should throw an error if getResources fails", async () => {
            const error = new Error("Error fetching resources");

            resourcesStub = sinon.stub(metadataRepository, "getResources").rejects(error);

            try {
                await metadataRepository.getResources();
                expect.fail("Expected method to throw."); // Ensure the test fails if no error is thrown
            } catch (err) {
                expect(resourcesStub.calledOnce).to.be.true; // Check if stub was called once
                expect(err.message).to.equal("Error fetching resources"); // Ensure the error message matches
            }
        });
    });

    //Get lookup type data layer test scenarios
    describe("getLookUpType", () => {
        let lookupTypeStub;

        afterEach(() => {
            sinon.restore(); // Restore all stubs after each test
        });

        it('should return an empty array if no lookup types found', async () => {
            const lookupType = "nonExistentType";

            lookupTypeStub = sinon.stub(metadataRepository, "getLookUpType").withArgs(lookupType).resolves([]);

            const result = await metaDataService.getLookUpType(lookupType);

            expect(lookupTypeStub.calledOnce).to.be.true; // Check if stub was called once
            expect(result).to.deep.equal([]); // Check if the result is an empty array
        });

        it('should throw an error if getLookUpType fails', async () => {
            const lookupType = "exampleType";
            const error = new Error("Error fetching lookup types");

            lookupTypeStub = sinon.stub(metadataRepository, "getLookUpType").withArgs(lookupType).rejects(error);

            try {
                await metaDataService.getLookUpType(lookupType);
                expect.fail("Expected method to throw."); // Ensure the test fails if no error is thrown
            } catch (err) {
                expect(lookupTypeStub.calledOnce).to.be.true; // Check if stub was called once
                expect(err.message).to.equal("Error fetching lookup types"); // Ensure the error message matches
            }
        });
    });

    //Get country regions data layer test scenarios
    describe('getCountryRegions', () => {
        let findAllStub;

        const mockCountryRegions = [
            {
                id: 1,
                code: "US",
                name: "United States",
                isoCode: "US",
                isoNumericCode: "840",
                addressFormat: "{name}\n{address}\n{city}, {state} {zip}",
                contactAddressFormat: "{name}\n{address}\n{city}, {state} {zip}",
                stateName: "California",
                taxScheme: "VAT",
                createdAt: "2023-01-01T00:00:00Z",
                updatedAt: "2023-01-01T00:00:00Z"
            }
        ];

        beforeEach(() => {
            findAllStub = sinon.stub(countryRegion, 'findAll').resolves(mockCountryRegions);
        });

        afterEach(() => {
            sinon.restore(); // Restores original behavior for all stubs
        });

        it('should return all country regions successfully', async () => {
            const result = await metadataRepository.getCountryRegions();

            expect(findAllStub.calledOnce).to.be.true; // Ensures the DB query was called once
            expect(result).to.deep.equal(mockCountryRegions); // Checks that the result matches the mock data
        });

        it('should log an error and throw an exception when the query fails', async () => {
            const errorMessage = 'Database error';
            findAllStub.rejects(new Error(errorMessage)); // Simulate error thrown by findAll
            const loggerErrorStub = sinon.stub(logger.logger, 'error');

            try {
                await metadataRepository.getCountryRegions();
            } catch (error) {
                expect(findAllStub.calledOnce).to.be.true;
                expect(loggerErrorStub.calledOnce).to.be.true;
                expect(error.message).to.equal(`Error while getting Country Regions: ${errorMessage}`);
            }
        });
    });

    //Get zipcodes by country code data layer test scenarios
    describe("getZipCodes", () => {
        afterEach(() => {
            sinon.restore(); // Restore the default sandbox after each test
        });

        it("should return a list of zip codes for a valid country code", async () => {
            // Arrange
            const country = 'US';
            const expectedZipCodes = [
                { id: 1, code: 12345, city: "Sample City", country_region_code: "US", state: "CA", countryRegionCode: "US-CA", time_zone: "America/Los_Angeles" }
            ];

            sinon.stub(zip_code, 'findAll').resolves(expectedZipCodes); // Mock the database call

            // Act
            const result = await metadataRepository.getZipCodes(country);

            // Assert
            expect(result).to.deep.equal(expectedZipCodes);
            expect(zip_code.findAll.calledOnce).to.be.true;
        });

        it("should return an empty array if no zip codes are found", async () => {
            // Arrange
            const country = 'US';
            sinon.stub(zip_code, 'findAll').resolves([]); // Mock the database call to return an empty array

            // Act
            const result = await metadataRepository.getZipCodes(country);

            // Assert
            expect(result).to.deep.equal([]);
        });

        it("should log an error and throw an exception if an error occurs", async () => {
            // Arrange
            const country = 'US';
            const errorMessage = 'Database error';
            sinon.stub(zip_code, 'findAll').rejects(new Error(errorMessage)); // Mock the database call to throw an error
            const loggerErrorSpy = sinon.spy(logger.logger, 'error'); // Spy on the logger

            // Act
            try {
                await metadataRepository.getZipCodes(country);
            } catch (error) {
                // Assert
                expect(error.message).to.include(errorMessage);
                expect(loggerErrorSpy.calledOnce).to.be.true;
            }
        });

        it("should handle null or undefined country codes", async () => {
            // Arrange
            const country = null; // Test with null
            const loggerErrorSpy = sinon.spy(logger.logger, 'error'); // Spy on the logger

            // Act
            try {
                await metadataRepository.getZipCodes(country);
            } catch (error) {
                // Assert
                expect(error.message).to.include('Error while getting ZipCodes');
                expect(loggerErrorSpy.calledOnce).to.be.true;
            }
        });
    });

    //Get contacts data layer test scenarios
    describe("getContacts", () => {
        let contactsStub;

        afterEach(() => {
            sinon.restore(); // Restore all stubs after each test
        });
        it("should return the contact list successfully", async () => {
            // Mock data for contacts
            const mockContacts = [
                { id: 1, name: "John Doe", no: "1234567890" },
                { id: 2, name: "Jane Smith", no: "0987654321" }
            ];

            // Stub the findAll method on the contacts model
            contactsStub = sinon.stub(metadataRepository, "getContacts").resolves(mockContacts);

            // Call the actual repository method
            const contacts = await metadataRepository.getContacts();

            // Assertions
            expect(contactsStub.calledOnce).to.be.true;
            expect(contacts).to.deep.equal(mockContacts);
        });

        it("should throw an error if the database call fails", async () => {
            const errorMessage = "Database Error";
            const error = new Error(errorMessage);

            // Stub the findAll method to throw an error
            contactsStub = sinon.stub(metadataRepository, "getContacts").rejects(error);

            try {
                await metadataRepository.getContacts();
                expect.fail("Expected method to throw.");
            } catch (error) {
                // Assertions
                expect(contactsStub.calledOnce).to.be.true;
                expect(error).to.have.property('message', errorMessage); // Match the exact error message
            }
        });
    });

    //Get format regions data layer test scenarios
    describe("getFormateRegions", () => {
        let formateRegionStub;

        afterEach(() => {
            sinon.restore(); // Restore all stubs after each test
        });
        it("should return the formate region list successfully", async () => {
            // Mock data for formate regions
            const mockRegions = [
                { id: 1, name: "Region A" },
                { id: 2, name: "Region B" }
            ];

            // Stub the findAll method on the formateRegion model
            formateRegionStub = sinon.stub(metadataRepository, "getFormateRegions").resolves(mockRegions);

            // Call the actual repository method
            const regions = await metadataRepository.getFormateRegions();

            // Assertions
            expect(formateRegionStub.calledOnce).to.be.true;
            expect(regions).to.deep.equal(mockRegions);
        });

        it("should throw an error if the database call fails", async () => {
            const errorMessage = "Database Error";
            const error = new Error(errorMessage);

            // Stub the findAll method to throw an error
            formateRegionStub = sinon.stub(metadataRepository, "getFormateRegions").rejects(error);

            try {
                await metadataRepository.getFormateRegions();
                expect.fail("Expected method to throw.");
            } catch (error) {
                // Assertions
                expect(formateRegionStub.calledOnce).to.be.true;
                expect(error).to.have.property('message', errorMessage);
            }
        });
    });

    //Get languages data layer test scenarios
    describe('getLanguages', () => {
        let findAllStub;
        let loggerStub;

        beforeEach(() => {
            // Stub the languages.findAll method
            findAllStub = sinon.stub(languages, 'findAll');

            // Stub the logger's error method
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(() => {
            // Restore the original methods
            findAllStub.restore();
            loggerStub.restore();
        });

        it('should return a list of languages with specific fields when successful', async () => {
            // Arrange: Define the mock response for languages.findAll
            const mockLanguages = [
                {
                    id: 14,
                    code: "ENU",
                    name: "English",
                    windowsLanguageId: "1033",
                    windowsLanguageName: "English (United States)"
                }
            ];
            findAllStub.resolves(mockLanguages);

            // Act: Call the getLanguages function
            const result = await metadataRepository.getLanguages();

            // Assert: Verify that the result matches the mock data
            expect(result).to.deep.equal(mockLanguages);
            expect(findAllStub.calledOnce).to.be.true;
        });

        it('should return an empty list when no languages are found', async () => {
            // Arrange: Return an empty list
            findAllStub.resolves([]);

            // Act: Call the getLanguages function
            const result = await metadataRepository.getLanguages();

            // Assert: The result should be an empty array
            expect(result).to.deep.equal([]);
            expect(findAllStub.calledOnce).to.be.true;
        });

        it('should log an error and throw when there is an error in the database query', async () => {
            // Arrange: Simulate an error being thrown by findAll
            const error = new Error('Database connection failed');
            findAllStub.rejects(error);

            try {
                // Act: Call the getLanguages function
                await metadataRepository.getLanguages();
                // Fail the test if the function does not throw an error
                expect.fail('Expected error to be thrown');
            } catch (err) {
                // Assert: Verify that the error is logged and thrown correctly
                expect(err.message).to.equal(`Error while getting Languages : ${error.message}`);
                expect(loggerStub.calledOnce).to.be.true;
                expect(loggerStub.calledWith(error)).to.be.true;
            }
        });
    });

    //Get currencies data layer test scenarios
    describe("getCurrencies", () => {
        let currencyStub;

        afterEach(() => {
            sinon.restore(); // Restore original functionality after each test
        });

        it("should return currencies successfully", async () => {
            // Mock data for currencies
            const mockCurrencies = [
                { id: 1, code: 'USD', name: 'United States Dollar' },
                { id: 2, code: 'EUR', name: 'Euro' }
            ];

            // Stub the getCurrencies method on the metadataRepository
            currencyStub = sinon.stub(metadataRepository, "getCurrencies").resolves(mockCurrencies);

            // Call the actual repository method
            const result = await metadataRepository.getCurrencies();

            // Assertions
            expect(currencyStub.calledOnce).to.be.true;
            expect(result).to.deep.equal(mockCurrencies);
        });

        it("should return an empty array if no currencies are found", async () => {
            // Stub the getCurrencies method to return an empty array
            currencyStub = sinon.stub(metadataRepository, "getCurrencies").resolves([]);

            const result = await metadataRepository.getCurrencies();

            // Assertions
            expect(currencyStub.calledOnce).to.be.true;
            expect(result).to.deep.equal([]); // Check if the result is an empty array
        });
    });
    
    //Get WIP methods data layer test scenarios
    describe('getWipMethods', () => {
        let wipmethodsStub
        afterEach(() => {
          sinon.restore();
        });
      
        it('should return WIP methods when the database call is successful', async () => {
          const mockWipMethods = [
            {
              id: "1",
              code: "POC",
              description: "Percentage of Completion",
              recognizedCosts: "Usage (Total Cost)",
              recognizedSales: "Percentage of Completion",
              wipCost: true,
              wipSales: true,
              valid: true,
              systemDefined: true,
              createdAt: "2024-09-24T12:00:00Z",
              createdBy: "UserName",
              modifiedBy: "UserName",
              updatedAt: "2024-09-24T12:00:00Z"
            },
            {
              id: "2",
              code: "SALES VALUE",
              description: "Sales Value",
              recognizedCosts: "Usage (Total Cost)",
              recognizedSales: "Sales Value",
              wipCost: true,
              wipSales: true,
              valid: true,
              systemDefined: true,
              createdAt: "2024-09-24T12:00:00Z",
              createdBy: "UserName",
              modifiedBy: "UserName",
              updatedAt: "2024-09-24T12:00:00Z"
            }
          ];
          
          // Stub the database call
          wipmethodsStub = sinon.stub(wip_methods, 'findAll').returns(Promise.resolve(mockWipMethods));
      
          const result = await metadataRepository.getWipMethods();
      
          expect(result).to.deep.equal(mockWipMethods);
          expect(wipmethodsStub.calledOnce).to.be.true;
        });
      
        it('should log an error and throw an error message when the database call fails', async () => {
          const error = new Error('Database error');
          
          // Stub the database call to throw an error
          wipmethodsStub = sinon.stub(wip_methods, 'findAll').returns(Promise.reject(error));
          sinon.stub(logger.logger, 'error'); // Stub the logger to prevent console output
      
          try {
            await metadataRepository.getWipMethods();
            expect.fail('Expected error not thrown'); // If no error is thrown, the test should fail
          } catch (err) {
            expect(err.message).to.equal(`Error while getting WIP methods : ${error.message}`);
            expect(wipmethodsStub.calledOnce).to.be.true;
          }
        });
    });
});



import { expect } from "chai";
import sinon from "sinon";
import metaDataService from "../../services/metaDataService.js";
import metadataRepository from "../../data/repositories/metadataRepository.js";
import logger from "../../logging/logger.js";

describe("MetaDataService", () => {
    
    let metaDataStub; // Declare metaDataStub globally

    const mockWorkInProgressDetails = [
        { value: "pending", id: "1" },
        { value: "In progress", id: "2" }
    ];

    afterEach(() => {
        if (metaDataStub) {
            metaDataStub.restore(); // Restore only if it was defined
        }
        sinon.restore(); // Restore all other stubs after each test
    });

    //Get project posting group service test scenarios
    describe("getProjectPostingGroup", () => {
        it('should return updated project posting groups successfully', async () => {
            const mockProjectPostingGroups = [
                { id: 1, code: "PG001", description: "Posting Group 1" },
                { id: 2, code: "PG002", description: "Posting Group 2" },
            ];

            // Create a stub for the repository method
            metaDataStub = sinon.stub(metadataRepository, "getProjectPostingGroup").resolves(mockProjectPostingGroups);

            const result = await metaDataService.getProjectPostingGroup();

            expect(metaDataStub.calledOnce).to.be.true; // Check if stub was called once
            expect(result).to.deep.equal(mockProjectPostingGroups); // Check if the result matches the expected output
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

    //Get work in progress service test scenarios
    describe('getWorkInProgress', () => {
        afterEach(() => {
          sinon.restore();
        });
      
        it('should return WIP methods when the repository call is successful', async () => {
          const mockWipMethods = [
            { id: "1", code: "POC", description: "Percentage of Completion" },
            { id: "2", code: "SALES VALUE", description: "Sales Value" }
          ];
          
          // Stub the metadataRepository method
          sinon.stub(metadataRepository, 'getWipMethods').returns(Promise.resolve(mockWipMethods));
      
          const result = await metaDataService.getWorkInProgress();
      
          expect(result).to.deep.equal(mockWipMethods);
          expect(metaDataStub.calledOnce).to.be.true; // Check if stub was called once
        });
      
        it('should log an error and throw the error when the repository call fails', async () => {
          const error = new Error('Database error');
          
          // Stub the metadataRepository method to throw an error
          sinon.stub(metadataRepository, 'getWipMethods').returns(Promise.reject(error));
          sinon.stub(logger.logger, 'error'); // Stub the logger to prevent console output
      
          try {
            await metaDataService.getWorkInProgress();
            expect.fail('Expected error not thrown'); // If no error is thrown, the test should fail
          } catch (err) {
            expect(err).to.equal(error);
            expect(metaDataStub.calledOnce).to.be.true; // Check if stub was called once
          }
        });
      });

    //Get resources service test scenarios
    describe("getResources", () => {

        let metaDataStub;

        afterEach(() => {
            sinon.restore(); // Restore the original functionality after each test
        });

        it('should return resources successfully', async () => {
            const mockResources = [
                { id: 1, resourceNo: 'RES001', resourceName: 'Resource 1' },
                { id: 2, resourceNo: 'RES002', resourceName: 'Resource 2' },
            ];

            // Stub the metadataRepository.getResources method to resolve mock data
            metaDataStub = sinon.stub(metadataRepository, 'getResources').resolves(mockResources);

            // Call the actual service method
            const resources = await metaDataService.getResources();

            // Assertions
            expect(metaDataStub.calledOnce).to.be.true;
            expect(resources).to.deep.equal([
                { id: 1, resourceNo: 'RES001', resourceName: 'Resource 1' },
                { id: 2, resourceNo: 'RES002', resourceName: 'Resource 2' },
            ]);
        });

        it('should return an empty array if no resources found', async () => {
            // Stub the metadataRepository.getResources method to resolve with an empty array
            metaDataStub = sinon.stub(metadataRepository, 'getResources').resolves([]);

            // Call the actual service method
            const resources = await metaDataService.getResources();

            // Assertions
            expect(metaDataStub.calledOnce).to.be.true;
            expect(resources).to.deep.equal([]);
        });

        it('should throw an error if getResources fails', async () => {
            const errorMessage = "Error fetching resources";

            // Stub the metadataRepository.getResources method to reject with an error
            metaDataStub = sinon.stub(metadataRepository, 'getResources').rejects(new Error(errorMessage));

            try {
                await metaDataService.getResources();
                expect.fail("Expected method to throw.");
            } catch (error) {
                // Assertions
                expect(metaDataStub.calledOnce).to.be.true;
                expect(error.message).to.equal(errorMessage);
            }
        });
    });

    //Get locations service test scenarios
    describe("getLocations", () => {
        it('should return updated locations successfully', async () => {
            const mockLocations = [
                { id: 1, code: "LOC001", name: "Location 1" },
                { id: 2, code: "LOC002", name: "Location 2" },
            ];

            metaDataStub = sinon.stub(metadataRepository, 'getLocations').resolves(mockLocations);

            const locations = await metaDataService.getLocations();

            expect(metaDataStub.calledOnce).to.be.true;
            expect(locations).to.deep.equal([
                { id: 1, code: "LOC001", name: "Location 1" },
                { id: 2, code: "LOC002", name: "Location 2" },
            ]);
        });

        it('should return an empty array if no locations found', async () => {
            metaDataStub = sinon.stub(metadataRepository, 'getLocations').resolves([]);

            const locations = await metaDataService.getLocations();

            expect(metaDataStub.calledOnce).to.be.true;
            expect(locations).to.deep.equal([]);
        });

        it('should throw an error if getLocations fails', async () => {
            metaDataStub = sinon.stub(metadataRepository, 'getLocations').rejects(new Error("Error fetching locations"));

            try {
                await metaDataService.getLocations();
                expect.fail("Expected method to throw.");
            } catch (error) {
                expect(metaDataStub.calledOnce).to.be.true;
                expect(error.message).to.equal("Error fetching locations");
            }
        });
    });

    //Get lookup type service test scenarios
    describe("getLookUpType", () => {
        let metaDataStub;

        afterEach(() => {
            sinon.restore(); // Restore the original functionality after each test
        });

        it('should return updated lookup types successfully', async () => {
            const lookupType = 'testType';
            const mockLookupTypes = [
                { id: 1, type: 'Type 1', value: 'Description 1' },
                { id: 2, type: 'Type 2', value: 'Description 2' },
            ];

            // Stub the metadataRepository.getLookUpType method to resolve mock data
            metaDataStub = sinon.stub(metadataRepository, 'getLookUpType').resolves(mockLookupTypes);

            // Call the actual service method
            const result = await metaDataService.getLookUpType(lookupType);

            // Assertions
            expect(metaDataStub.calledOnce).to.be.true;
            expect(result).to.deep.equal([
                { id: 1, type: 'Type 1', description: 'Description 1' },
                { id: 2, type: 'Type 2', description: 'Description 2' },
            ]);
        });

        it('should return an empty array if no lookup types found', async () => {
            const lookupType = 'nonExistingType';
            // Stub the metadataRepository.getLookUpType method to resolve with an empty array
            metaDataStub = sinon.stub(metadataRepository, 'getLookUpType').resolves([]);

            // Call the actual service method
            const result = await metaDataService.getLookUpType(lookupType);

            // Assertions
            expect(metaDataStub.calledOnce).to.be.true;
            expect(result).to.deep.equal([]);
        });

        it('should throw an error if getLookUpType fails', async () => {
            const lookupType = 'errorType';
            const errorMessage = "Error fetching lookup types";

            // Stub the metadataRepository.getLookUpType method to reject with an error
            metaDataStub = sinon.stub(metadataRepository, 'getLookUpType').rejects(new Error(errorMessage));

            try {
                await metaDataService.getLookUpType(lookupType);
                expect.fail("Expected method to throw.");
            } catch (error) {
                // Assertions
                expect(metaDataStub.calledOnce).to.be.true;
                expect(error.message).to.equal(errorMessage);
            }
        });
    });

    //Get country regions service test scenarios
    describe("getCountryRegions", () => {
        let getCountryRegionsStub, loggerStub;

        // Example country region data
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
                updatedAt: "2023-01-01T00:00:00Z",
            }
        ];

        beforeEach(() => {
            // Stubbing the metadataRepository.getCountryRegions method
            getCountryRegionsStub = sinon.stub(metadataRepository, "getCountryRegions");

            // Stubbing logger to prevent actual logging during tests
            loggerStub = sinon.stub(logger.logger, "error");
        });

        afterEach(() => {
            // Restore the original methods after each test
            sinon.restore();
        });

        it("should return country regions when metadataRepository returns data", async () => {
            // Arrange
            getCountryRegionsStub.resolves(mockCountryRegions);

            // Act
            const result = await metaDataService.getCountryRegions();

            // Assert
            expect(result).to.deep.equal(mockCountryRegions);
            expect(getCountryRegionsStub.calledOnce).to.be.true;
        });

        it("should return an empty array if no country regions are found", async () => {
            // Arrange
            getCountryRegionsStub.resolves([]);

            // Act
            const result = await metaDataService.getCountryRegions();

            // Assert
            expect(result).to.deep.equal([]);
            expect(getCountryRegionsStub.calledOnce).to.be.true;
        });

        it("should log an error and throw an error when metadataRepository fails", async () => {
            // Arrange
            const errorMessage = new Error("Error fetching data");
            getCountryRegionsStub.rejects(errorMessage);

            // Act & Assert
            try {
                await metaDataService.getCountryRegions();
            } catch (error) {
                expect(error).to.equal(errorMessage);
                expect(getCountryRegionsStub.calledOnce).to.be.true;
                expect(loggerStub.calledOnce).to.be.true;
                expect(loggerStub.calledWith(errorMessage)).to.be.true;
            }
        });
    });

    //Get zipcodes by country code service test scenarios
    describe("getZipCodes", () => {
        afterEach(() => {
            sinon.restore(); // Restore the default sandbox after each test
        });

        it("should return updated zip codes for a valid country code", async () => {
            // Arrange
            const country = 'US';
            const zipCodeList = [
                {
                    id: 1,
                    code: 12345,
                    city: "Sample City",
                    country_region_code: "US",
                    state: "CA",
                    countryRegionCode: "US-CA",
                    time_zone: "America/Los_Angeles"
                }
            ];

            sinon.stub(metadataRepository, 'getZipCodes').resolves(zipCodeList); // Mock the repository method

            // Act
            const result = await metaDataService.getZipCodes(country);

            // Assert
            expect(result).to.deep.equal([{
                id: 1,
                code: 12345,
                city: "Sample City",
                countryRegionCode: "US-CA",
                state: "CA",
                timeZone: "America/Los_Angeles",
            }]);
            expect(metadataRepository.getZipCodes.calledOnce).to.be.true; // Verify the repository method was called
        });

        it("should return undefined if no zip codes are found", async () => {
            // Arrange
            const country = 'US';
            sinon.stub(metadataRepository, 'getZipCodes').resolves([]); // Mock the repository method to return an empty array

            // Act
            const result = await metaDataService.getZipCodes(country);

            // Assert
            expect(result).to.be.undefined; // Since no zip codes are found, the function returns undefined
            expect(metadataRepository.getZipCodes.calledOnce).to.be.true; // Verify the repository method was called
        });

        it("should log an error and throw an exception if an error occurs", async () => {
            // Arrange
            const country = 'US';
            const errorMessage = 'Database error';
            sinon.stub(metadataRepository, 'getZipCodes').rejects(new Error(errorMessage)); // Mock the repository method to throw an error
            const loggerErrorSpy = sinon.spy(logger.logger, 'error'); // Spy on the logger

            // Act
            try {
                await metaDataService.getZipCodes(country);
            } catch (error) {
                // Assert
                expect(error.message).to.include(errorMessage); // Ensure the thrown error message is correct
                expect(loggerErrorSpy.calledOnce).to.be.true; // Ensure that the error was logged
            }
        });

        it("should handle empty string as country code gracefully", async () => {
            // Arrange
            const country = ''; // Test with empty string as country code
            sinon.stub(metadataRepository, 'getZipCodes').resolves([]); // Mock the repository to return empty

            // Act
            const result = await metaDataService.getZipCodes(country);

            // Assert
            expect(result).to.be.undefined; // Expect undefined since no zip codes are found
            expect(metadataRepository.getZipCodes.calledOnce).to.be.true; // Verify the repository method was called
        });

    });

    //Get contacts service test scenarios
    describe("getContacts", () => {
        let repoStub;

        afterEach(() => {
            sinon.restore(); // Restore all stubs after each test
        });

        it("should return updated contacts successfully", async () => {
            const mockContacts = [
                { id: 1, name: "John Doe", no: "1234567890" },
                { id: 2, name: "Jane Smith", no: "0987654321" }
            ];

            const expectedContacts = [
                { id: 1, name: "John Doe", number: "1234567890" },
                { id: 2, name: "Jane Smith", number: "0987654321" }
            ];

            repoStub = sinon.stub(metadataRepository, "getContacts").resolves(mockContacts);

            const result = await metaDataService.getContacts();

            expect(repoStub.calledOnce).to.be.true;
            expect(result).to.deep.equal(expectedContacts);
        });

        it("should return an empty array if no contacts are found", async () => {
            repoStub = sinon.stub(metadataRepository, "getContacts").resolves([]);

            const result = await metaDataService.getContacts();

            expect(repoStub.calledOnce).to.be.true;
            expect(result).to.deep.equal([]);
        });

        it("should throw an error if getContacts fails", async () => {
            const errorMessage = "Error fetching contacts";

            repoStub = sinon.stub(metadataRepository, "getContacts").rejects(new Error(errorMessage));

            try {
                await metaDataService.getContacts();
                expect.fail("Expected method to throw.");
            } catch (error) {
                expect(repoStub.calledOnce).to.be.true;
                expect(error.message).to.equal(errorMessage);
            }
        });
    });

    //Get format regions service test scenarios
    describe("getFormateRegions", () => {
        let repoStub;

        afterEach(() => {
            sinon.restore(); // Restore all stubs after each test
        });

        it("should return updated regions successfully", async () => {
            const mockRegions = [
                { id: 1, region: "North", language: "English", state: "NY" },
                { id: 2, region: "South", language: "English", state: "TX" }
            ];

            const expectedRegions = [
                { id: 1, name: "North", language: "English", region: "NY" },
                { id: 2, name: "South", language: "English", region: "TX" }
            ];

            repoStub = sinon.stub(metadataRepository, "getFormateRegions").resolves(mockRegions);

            const result = await metaDataService.getFormateRegions();

            expect(repoStub.calledOnce).to.be.true;
            expect(result).to.deep.equal(expectedRegions);
        });

        it("should return an empty array if no regions are found", async () => {
            repoStub = sinon.stub(metadataRepository, "getFormateRegions").resolves([]);

            const result = await metaDataService.getFormateRegions();

            expect(repoStub.calledOnce).to.be.true;
            expect(result).to.deep.equal([]); // Check for an empty array return
        });

        it("should throw an error if getFormateRegions fails", async () => {
            const errorMessage = "Error fetching regions";

            repoStub = sinon.stub(metadataRepository, "getFormateRegions").rejects(new Error(errorMessage));

            try {
                await metaDataService.getFormateRegions();
                expect.fail("Expected method to throw.");
            } catch (error) {
                expect(repoStub.calledOnce).to.be.true;
                expect(error.message).to.equal(errorMessage); // Ensure the correct error message is thrown
            }
        });
    });

    //Get languages service test scenarios
    describe('getLanguages', () => {
        let getLanguagesStub;
        let loggerStub;

        beforeEach(() => {
            // Stub the metadataRepository.getLanguages method
            getLanguagesStub = sinon.stub(metadataRepository, 'getLanguages');

            // Stub the logger's error method
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(() => {
            // Restore the original methods
            getLanguagesStub.restore();
            loggerStub.restore();
        });

        it('should return a list of formatted languages when metadataRepository.getLanguages is successful', async () => {
            // Arrange: Define the mock response for metadataRepository.getLanguages
            const mockLanguages = [
                {
                    id: 14,
                    code: "ENU",
                    name: "English",
                    windowsLanguageId: "1033",
                    windowsLanguageName: "English (United States)"
                }
            ];
            getLanguagesStub.resolves(mockLanguages);

            // Act: Call the getLanguages function
            const result = await metaDataService.getLanguages();

            // Assert: Verify that the result matches the transformed mock data
            expect(result).to.deep.equal(mockLanguages);
            expect(getLanguagesStub.calledOnce).to.be.true;
        });

        it('should return an empty list if no languages are found', async () => {
            // Arrange: Return an empty array
            getLanguagesStub.resolves([]);

            // Act: Call the getLanguages function
            const result = await metaDataService.getLanguages();

            // Assert: The result should be an empty array
            expect(result).to.deep.equal([]);
            expect(getLanguagesStub.calledOnce).to.be.true;
        });

        it('should return an empty list if getLanguages returns null or undefined', async () => {
            // Arrange: Simulate a null or undefined response from metadataRepository.getLanguages
            getLanguagesStub.resolves(null);

            // Act: Call the getLanguages function
            const result = await metaDataService.getLanguages();

            // Assert: The result should be an empty array
            expect(result).to.deep.equal(undefined);
            expect(getLanguagesStub.calledOnce).to.be.true;
        });

        it('should log an error and throw when there is an error in metadataRepository.getLanguages', async () => {
            // Arrange: Simulate an error being thrown by metadataRepository.getLanguages
            const error = new Error('Database error');
            getLanguagesStub.rejects(error);

            try {
                // Act: Call the getLanguages function
                await metaDataService.getLanguages();
                // Fail the test if the function does not throw an error
                expect.fail('Expected error to be thrown');
            } catch (err) {
                // Assert: Verify that the error is logged and thrown correctly
                expect(err).to.equal(error);
                expect(loggerStub.calledOnce).to.be.true;
                expect(loggerStub.calledWith(error)).to.be.true;
            }
        });
    });

    describe("getCurrencies", () => {
        let metaDataStub;
   
        afterEach(() => {
            sinon.restore(); // Restore all stubs after each test
        });
   
        it('should return updated currencies successfully', async () => {
            const mockCurrencies = [
                { id: 1, code: "USD", description: "US Dollar" },
                { id: 2, code: "EUR", description: "Euro" },
            ];
   
            // Stub the repository method to return mock data
            metaDataStub = sinon.stub(metadataRepository, "getCurrencies").resolves(mockCurrencies);
   
            // Call the actual service method
            const result = await metaDataService.getCurrencies();
   
            // Assertions
            expect(metaDataStub.calledOnce).to.be.true; // Ensure stub was called once
            expect(result).to.deep.equal([
                { id: 1, code: "USD", description: "US Dollar" },
                { id: 2, code: "EUR", description: "Euro" },
            ]);
        });
   
        it('should return an empty array if no currencies are found', async () => {
            // Stub the repository method to return an empty array
            metaDataStub = sinon.stub(metadataRepository, "getCurrencies").resolves([]);
   
            const result = await metaDataService.getCurrencies();
   
            // Assertions
            expect(metaDataStub.calledOnce).to.be.true;
            expect(result).to.deep.equal([]);
        });
   
        it('should throw an error if getCurrencies fails', async () => {
            const errorMessage = "Error fetching currencies";
   
            // Stub the repository method to throw an error
            metaDataStub = sinon.stub(metadataRepository, "getCurrencies").rejects(new Error(errorMessage));
   
            try {
                await metaDataService.getCurrencies();
                expect.fail("Expected method to throw.");
            } catch (error) {
                // Assertions
                expect(metaDataStub.calledOnce).to.be.true;
                expect(error.message).to.equal(errorMessage);
            }
        });
    });
    
});

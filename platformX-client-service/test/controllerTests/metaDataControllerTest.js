import { expect } from "chai";
import request from "supertest";
import express from "express";
import metaDataRoutes from "../../routes/metaData.js";
import metaDataService from "../../services/metaDataService.js";
import constants from "../../config/constants.js";
import sinon from "sinon";
import logger from "../../logging/logger.js";
import metaDataController from "../../controllers/metaDataController.js";
import camelcaseConverter from '../../helper/camelcaseConverter.js';

const app = express();
app.use(express.json());
app.use("/clients/metadata", metaDataRoutes);

describe("MetaDataController", () => {

    let metaDataStub;

    afterEach(() => {
        // Restore the original method after each test
        if (metaDataStub) {
            metaDataStub.restore();
        }
    });

    //Get project posting group API endpoints test scenarios
    describe("GET /clients/metadata/project-posting-group - getProjectPostingGroup", () => {
        let metaDataStub;

        afterEach(() => {
            if (metaDataStub) {
                metaDataStub.restore();
            }
        });

        it("should return project posting groups successfully", async () => {
            const mockProjectPostingGroups = [
                { postingGroupId: 1, groupName: "Finance" },
                { postingGroupId: 2, groupName: "IT" }
            ];

            metaDataStub = sinon.stub(metaDataService, "getProjectPostingGroup").resolves(mockProjectPostingGroups);

            const res = await request(app).get("/clients/metadata/project-posting-group");

            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal(mockProjectPostingGroups);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 401 if unauthorized", async () => {
            const errorResponse = { response: { status: 401 } };
            metaDataStub = sinon.stub(metaDataService, "getProjectPostingGroup").rejects(errorResponse);

            const res = await request(app).get("/clients/metadata/project-posting-group");

            expect(res.status).to.equal(401);
            expect(res.body).to.have.property("error", constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 400 if there is a bad request", async () => {
            const errorResponse = { response: { status: 400 } };
            metaDataStub = sinon.stub(metaDataService, "getProjectPostingGroup").rejects(errorResponse);

            const res = await request(app).get("/clients/metadata/project-posting-group");

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property("error", constants.COMMON_ERROR_MESSAGES.BAD_REQUEST);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 500 if there is an internal server error", async () => {
            metaDataStub = sinon.stub(metaDataService, "getProjectPostingGroup").rejects(new Error("Internal Server Error."));

            const res = await request(app).get("/clients/metadata/project-posting-group");

            expect(res.status).to.equal(500);
            expect(res.body).to.have.property("error", constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
            expect(metaDataStub.calledOnce).to.be.true;
        });
    });

    //Get resources API endpoints test scenarios
    describe("GET /clients/metadata/resources - getResources", () => {
        let metaDataStub;

        afterEach(() => {
            if (metaDataStub) {
                metaDataStub.restore();
            }
        });

        it("should return resources successfully", async () => {
            const mockResources = [
                { id: 1, name: "Resource 1", code: "R001" },
                { id: 2, name: "Resource 2", code: "R002" },
            ];

            metaDataStub = sinon.stub(metaDataService, "getResources").resolves(mockResources);

            const res = await request(app).get("/clients/metadata/resources");

            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal(mockResources);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 404 if no resources are found", async () => {
            metaDataStub = sinon.stub(metaDataService, "getResources").resolves([]);

            const res = await request(app).get("/clients/metadata/resources");

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("error", "Resources " + constants.COMMON_ERROR_MESSAGES.NOT_FOUND);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 500 if there is an internal server error", async () => {
            metaDataStub = sinon.stub(metaDataService, "getResources").rejects(new Error("Internal Server Error"));

            const res = await request(app).get("/clients/metadata/resources");

            expect(res.status).to.equal(500);
            expect(res.body).to.have.property("error", constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 401 if unauthorized", async () => {
            const errorResponse = { response: { status: 401 } };
            metaDataStub = sinon.stub(metaDataService, "getResources").rejects(errorResponse);

            const res = await request(app).get("/clients/metadata/resources");

            expect(res.status).to.equal(401);
            expect(res.body).to.have.property("error", constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 400 if there is a bad request", async () => {
            const errorResponse = { response: { status: 400 } };
            metaDataStub = sinon.stub(metaDataService, "getResources").rejects(errorResponse);

            const res = await request(app).get("/clients/metadata/resources");

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property("error", constants.COMMON_ERROR_MESSAGES.BAD_REQUEST);
            expect(metaDataStub.calledOnce).to.be.true;
        });
    });

    //Get locations API endpoints test scenarios
    describe("GET /clients/metadata/locations - getLocations", () => {
        let metaDataStub;

        afterEach(() => {
            if (metaDataStub) {
                metaDataStub.restore();
            }
        });

        it("should return locations successfully", async () => {
            const mockLocations = [
                { locationId: 1, locationName: "New York" },
                { locationId: 2, locationName: "Los Angeles" }
            ];

            metaDataStub = sinon.stub(metaDataService, "getLocations").resolves(mockLocations);

            const res = await request(app).get("/clients/metadata/locations");

            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal(mockLocations);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 500 if there is an internal server error", async () => {
            metaDataStub = sinon.stub(metaDataService, "getLocations").rejects(new Error("Internal Server Error."));

            const res = await request(app).get("/clients/metadata/locations");

            expect(res.status).to.equal(500);
            expect(res.body).to.have.property("error", "Internal Server Error.");
            expect(metaDataStub.calledOnce).to.be.true;
        });
    });

    //Get lookup type API endpoints test scenarios
    describe("GET /clients/metadata/lookuptype/:lookuptype - getLookUpType", () => {
        let metaDataStub;

        afterEach(() => {
            if (metaDataStub) {
                metaDataStub.restore();
            }
        });

        it("should return lookup types successfully", async () => {
            const mockLookupTypes = [
                { id: 1, type: "SOW_Status", description: "SOW Status" },
                { id: 2, type: "Job_Type", description: "Job Type" }
            ];

            const lookupType = 'someType';
            metaDataStub = sinon.stub(metaDataService, "getLookUpType").resolves(mockLookupTypes);

            const res = await request(app).get(`/clients/metadata/lookuptype/${lookupType}`);

            expect(res.status).to.equal(200);
            expect(res.body).to.deep.equal(mockLookupTypes);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 404 if no lookup types are found", async () => {
            const lookupType = 'nonExistingType';
            metaDataStub = sinon.stub(metaDataService, "getLookUpType").resolves([]);

            const res = await request(app).get(`/clients/metadata/lookuptype/${lookupType}`);

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("error").that.includes(constants.COMMON_ERROR_MESSAGES.NOT_FOUND);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 500 if there is an internal server error", async () => {
            const lookupType = 'errorType';
            metaDataStub = sinon.stub(metaDataService, "getLookUpType").rejects(new Error("Internal Server Error."));

            const res = await request(app).get(`/clients/metadata/lookuptype/${lookupType}`);

            expect(res.status).to.equal(500);
            expect(res.body).to.have.property("error", constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 401 if unauthorized", async () => {
            const lookupType = 'unauthorizedType';
            metaDataStub = sinon.stub(metaDataService, "getLookUpType").rejects({ response: { status: 401 } });

            const res = await request(app).get(`/clients/metadata/lookuptype/${lookupType}`);

            expect(res.status).to.equal(401);
            expect(res.body).to.have.property("error").that.includes(constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 400 for a bad request", async () => {
            const lookupType = 'badRequestType';
            metaDataStub = sinon.stub(metaDataService, "getLookUpType").rejects({ response: { status: 400 } });

            const res = await request(app).get(`/clients/metadata/lookuptype/${lookupType}`);

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property("error").that.includes(constants.COMMON_ERROR_MESSAGES.BAD_REQUEST);
            expect(metaDataStub.calledOnce).to.be.true;
        });
    });

    //Get country regions API endpoints test scenarios
    describe("GET /clients/metadata/country-regions - getCountryRegions", () => {
        let req, res, next;

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
                updatedAt: "2023-01-01T00:00:00Z"
            }
        ];

        beforeEach(() => {
            // Mock request and response objects
            req = {};
            res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub().returnsThis(),
            };

            // Stub metaDataService and logger
            sinon.stub(metaDataService, "getCountryRegions");
            sinon.stub(logger.logger, "error");
        });

        afterEach(() => {
            // Restore the original methods after each test
            sinon.restore();
        });

        it("should return 200 with the list of country regions when data is available", async () => {
            // Arrange
            metaDataService.getCountryRegions.resolves(mockCountryRegions);

            // Act
            await metaDataController.getCountryRegions(req, res);

            // Assert
            expect(metaDataService.getCountryRegions.calledOnce).to.be.true;
            expect(res.status.calledWith(200)).to.be.false; // No status 200 since default is 200
            expect(res.json.calledWith(mockCountryRegions)).to.be.true;
        });

        it("should return 404 if no country regions are found", async () => {
            // Arrange
            metaDataService.getCountryRegions.resolves([]);

            // Act
            await metaDataController.getCountryRegions(req, res);

            // Assert
            expect(metaDataService.getCountryRegions.calledOnce).to.be.true;
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({
                error: "Countries " + constants.COMMON_ERROR_MESSAGES.NOT_FOUND,
            })).to.be.true;
        });

        it("should return 401 if metaDataService responds with a 401 error", async () => {
            // Arrange
            const errorResponse = { response: { status: 401 } };
            metaDataService.getCountryRegions.rejects(errorResponse);

            // Act
            await metaDataController.getCountryRegions(req, res);

            // Assert
            expect(metaDataService.getCountryRegions.calledOnce).to.be.true;
            expect(logger.logger.error.calledOnce).to.be.true;
            expect(res.status.calledWith(401)).to.be.true;
            expect(res.json.calledWith({
                error: constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED,
            })).to.be.true;
        });

        it("should return 400 if metaDataService responds with a 400 error", async () => {
            // Arrange
            const errorResponse = { response: { status: 400 } };
            metaDataService.getCountryRegions.rejects(errorResponse);

            // Act
            await metaDataController.getCountryRegions(req, res);

            // Assert
            expect(metaDataService.getCountryRegions.calledOnce).to.be.true;
            expect(logger.logger.error.calledOnce).to.be.true;
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({
                error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST,
            })).to.be.true;
        });

        it("should return 500 for any other errors", async () => {
            // Arrange
            const errorMessage = new Error("Server error");
            metaDataService.getCountryRegions.rejects(errorMessage);

            // Act
            await metaDataController.getCountryRegions(req, res);

            // Assert
            expect(metaDataService.getCountryRegions.calledOnce).to.be.true;
            expect(logger.logger.error.calledOnce).to.be.true;
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({
                error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
            })).to.be.true;
        });
    });

    //Get zipcodes by country code API endpoints test scenarios
    describe('GET /clients/metadata/country/{country}/zipcodes - getZipCodes', () => {
        let req, res, loggerErrorSpy;

        beforeEach(() => {
            // Mock the request and response objects
            req = { params: { country: 'US' } };
            res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            };

            // Spy on the logger error method
            loggerErrorSpy = sinon.spy(logger.logger, 'error');
        });

        afterEach(() => {
            sinon.restore(); // Restore the default sandbox after each test
        });

        it('should return zip code details for a valid country', async () => {
            // Arrange
            const zipCodeList = [
                {
                    id: 1,
                    code: 12345,
                    city: "Sample City",
                    countryRegionCode: "US",
                    state: "CA",
                    timeZone: "America/Los_Angeles",
                },
            ];

            // Stub the metaDataService to return a list of zip codes
            sinon.stub(metaDataService, 'getZipCodes').resolves(zipCodeList);

            // Act
            await metaDataController.getZipCodes(req, res);

            // Assert
            expect(res.status.calledOnce).to.be.false; // Should not set the status since it's a successful request
            expect(res.json.calledWith(zipCodeList)).to.be.true; // Ensure the correct data is returned
        });

        it('should return 404 if no zip codes are found for the country', async () => {
            // Arrange
            sinon.stub(metaDataService, 'getZipCodes').resolves([]); // Return an empty array

            // Act
            await metaDataController.getZipCodes(req, res);

            // Assert
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ error: "Zipcodes " + constants.COMMON_ERROR_MESSAGES.NOT_FOUND + " for the specified country" })).to.be.true;
        });

        it('should return 401 if service returns unauthorized error', async () => {
            // Arrange
            const error = { response: { status: 401 } };
            sinon.stub(metaDataService, 'getZipCodes').throws(error); // Throw an unauthorized error

            // Act
            await metaDataController.getZipCodes(req, res);

            // Assert
            expect(res.status.calledWith(401)).to.be.true;
            expect(res.json.calledWith({ error: constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED })).to.be.true;
        });

        it('should return 400 if service returns bad request error', async () => {
            // Arrange
            const error = { response: { status: 400 } };
            sinon.stub(metaDataService, 'getZipCodes').throws(error); // Throw a bad request error

            // Act
            await metaDataController.getZipCodes(req, res);

            // Assert
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST })).to.be.true;
        });

        it('should return 500 if an internal server error occurs', async () => {
            // Arrange
            const errorMessage = 'Internal Server Error';
            sinon.stub(metaDataService, 'getZipCodes').throws(new Error(errorMessage));

            // Act
            await metaDataController.getZipCodes(req, res);

            // Assert
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR })).to.be.true;
            expect(loggerErrorSpy.calledOnce).to.be.true; // Ensure that the error was logged
        });

        it('should log an error when an exception occurs', async () => {
            // Arrange
            const error = new Error('Unexpected error');
            sinon.stub(metaDataService, 'getZipCodes').throws(error); // Throw a generic error

            // Act
            try {
                await metaDataController.getZipCodes(req, res);
            } catch (e) {
                // Do nothing here, we are catching to avoid test failure
            }

            // Assert
            expect(loggerErrorSpy.calledOnceWith(error)).to.be.true; // Ensure the logger logs the error
        });
    });

    //Get contacts API endpoints test scenarios
    describe("GET /clients/metadata/contacts - getContacts", () => {
        let req, res, serviceStub;

        beforeEach(() => {
            req = {};
            res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub(),
            };
        });

        afterEach(() => {
            sinon.restore();
        });

        it("should return contacts successfully", async () => {
            const mockContacts = [
                { id: 1, name: "John Doe", number: "1234567890" },
                { id: 2, name: "Jane Smith", number: "0987654321" }
            ];

            serviceStub = sinon.stub(metaDataService, "getContacts").resolves(mockContacts);

            await metaDataController.getContacts(req, res);

            expect(serviceStub.calledOnce).to.be.true;
            expect(res.status.calledOnceWith(200)).to.be.false;
            expect(res.json.calledOnceWith(mockContacts)).to.be.true;
        });

        it("should return 404 if no contacts are found", async () => {
            serviceStub = sinon.stub(metaDataService, "getContacts").resolves([]);

            await metaDataController.getContacts(req, res);

            expect(serviceStub.calledOnce).to.be.true;
            expect(res.status.calledOnceWith(404)).to.be.true;
            expect(res.json.calledOnceWith({
                error: "Contacts " + constants.COMMON_ERROR_MESSAGES.NOT_FOUND
            })).to.be.true;
        });

        it("should return 500 if there is a server error", async () => {
            const errorMessage = "Server error";

            serviceStub = sinon.stub(metaDataService, "getContacts").rejects(new Error(errorMessage));

            await metaDataController.getContacts(req, res);

            expect(serviceStub.calledOnce).to.be.true;
            expect(res.status.calledOnceWith(500)).to.be.true;
            expect(res.json.calledOnceWith({
                error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR
            })).to.be.true;
        });
    });

    //Get languages API endpoints test scenarios
    describe('GET /clients/metadata/languages - getLanguages', () => {
        let req, res, metaDataServiceStub, camelcaseConverterStub, loggerStub;

        beforeEach(() => {
            req = {}; // Mock the req object
            res = {
                status: sinon.stub().returnsThis(),
                json: sinon.stub()
            }; // Mock the res object

            // Stub the external dependencies
            metaDataServiceStub = sinon.stub(metaDataService, 'getLanguages');
            camelcaseConverterStub = sinon.stub(camelcaseConverter, 'keysToCamelCase');
            loggerStub = sinon.stub(logger.logger, 'error');
        });

        afterEach(() => {
            // Restore original methods
            metaDataServiceStub.restore();
            camelcaseConverterStub.restore();
            loggerStub.restore();
        });

        it('should return 200 with a list of languages', async () => {
            // Arrange: Mock the response from metaDataService and camelcaseConverter
            const mockLanguages = [
                {
                    id: 14,
                    code: "ENU",
                    name: "English",
                    windowsLanguageId: "1033",
                    windowsLanguageName: "English (United States)"
                }
            ];
            const camelCasedLanguages = [
                {
                    id: 14,
                    code: "ENU",
                    name: "english",
                    windowsLanguageId: "1033",
                    windowsLanguageName: "English (United States)"
                }
            ];
            metaDataServiceStub.resolves(mockLanguages);
            camelcaseConverterStub.returns(camelCasedLanguages);

            // Act: Call the getLanguages function
            await metaDataController.getLanguages(req, res);

            // Assert: Check the response is 200 and contains the correct data
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(camelCasedLanguages)).to.be.true;
        });

        it('should return 404 if no languages are found', async () => {
            // Arrange: Simulate no data being returned
            metaDataServiceStub.resolves([]);

            // Act: Call the getLanguages function
            await metaDataController.getLanguages(req, res);

            // Assert: Check that a 404 is returned with the correct error message
            expect(res.status.calledWith(404)).to.be.true;
            expect(res.json.calledWith({ error: "Languages " + constants.COMMON_ERROR_MESSAGES.NOT_FOUND })).to.be.true;
        });

        it('should return 401 if unauthorized access occurs', async () => {
            // Arrange: Simulate an unauthorized error from the service
            const error = {
                response: { status: 401 }
            };
            metaDataServiceStub.rejects(error);

            // Act: Call the getLanguages function
            await metaDataController.getLanguages(req, res);

            // Assert: Check that a 401 is returned with the correct error message
            expect(res.status.calledWith(401)).to.be.true;
            expect(res.json.calledWith({ error: constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED })).to.be.true;
        });

        it('should return 400 for a bad request', async () => {
            // Arrange: Simulate a bad request error
            const error = {
                response: { status: 400 }
            };
            metaDataServiceStub.rejects(error);

            // Act: Call the getLanguages function
            await metaDataController.getLanguages(req, res);

            // Assert: Check that a 400 is returned with the correct error message
            expect(res.status.calledWith(400)).to.be.true;
            expect(res.json.calledWith({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST })).to.be.true;
        });

        it('should return 500 for an internal server error', async () => {
            // Arrange: Simulate a generic error that does not have a response object
            const error = new Error('Internal Server Error');
            metaDataServiceStub.rejects(error);

            // Act: Call the getLanguages function
            await metaDataController.getLanguages(req, res);

            // Assert: Check that a 500 is returned with the correct error message
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR })).to.be.true;
            expect(loggerStub.calledWith(error)).to.be.true; // Ensure the error is logged
        });
    });

    //Get currencies API endpoints test scenarios
    describe("GET /clients/metadata/currencies - getCurrencies", () => {
        let metaDataStub;
        let camelCaseStub;

        afterEach(() => {
            if (metaDataStub) metaDataStub.restore();
            if (camelCaseStub) camelCaseStub.restore();
        });

        it("should return 404 if no currencies are found", async () => {
            metaDataStub = sinon.stub(metaDataService, "getCurrencies").resolves([]);

            const res = await request(app).get("/clients/metadata/currencies");

            expect(res.status).to.equal(404);
            expect(res.body).to.have.property("error", "Currencies " + constants.COMMON_ERROR_MESSAGES.NOT_FOUND);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 401 if unauthorized", async () => {
            const errorResponse = { response: { status: 401 } };
            metaDataStub = sinon.stub(metaDataService, "getCurrencies").rejects(errorResponse);

            const res = await request(app).get("/clients/metadata/currencies");

            expect(res.status).to.equal(401);
            expect(res.body).to.have.property("error", constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 400 if there is a bad request", async () => {
            const errorResponse = { response: { status: 400 } };
            metaDataStub = sinon.stub(metaDataService, "getCurrencies").rejects(errorResponse);

            const res = await request(app).get("/clients/metadata/currencies");

            expect(res.status).to.equal(400);
            expect(res.body).to.have.property("error", constants.COMMON_ERROR_MESSAGES.BAD_REQUEST);
            expect(metaDataStub.calledOnce).to.be.true;
        });

        it("should return 500 if there is an internal server error", async () => {
            metaDataStub = sinon.stub(metaDataService, "getCurrencies").rejects(new Error("Internal Server Error"));

            const res = await request(app).get("/clients/metadata/currencies");

            expect(res.status).to.equal(500);
            expect(res.body).to.have.property("error", constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR);
            expect(metaDataStub.calledOnce).to.be.true;
        });
    });

    //Get WIP methods API endpoints test scenarios
    describe('GET /clients/metadata/wip - getWip', () => {
        afterEach(() => {
          sinon.restore();
        });
      
        it('should return 200 and the converted response on success', async () => {
          const mockOptions = [
            { id: "1", code: "POC", description: "Percentage of Completion" },
            { id: "2", code: "SALES VALUE", description: "Sales Value" },
          ];
      
          sinon.stub(metaDataService, 'getWorkInProgress').returns(Promise.resolve(mockOptions));
          sinon.stub(camelcaseConverter, 'keysToCamelCase').returns(mockOptions);
      
          const response = await request(app).get('/clients/metadata/wip');
      
          expect(response.status).to.equal(200);
          expect(response.body).to.deep.equal(mockOptions);
        });
      
        it('should return 404 if no options are found', async () => {
          sinon.stub(metaDataService, 'getWorkInProgress').returns(Promise.resolve([]));
      
          const response = await request(app).get('/clients/metadata/wip');
      
          expect(response.status).to.equal(404);
          expect(response.body).to.deep.equal({ error: "WIP Methods " + constants.COMMON_ERROR_MESSAGES.NOT_FOUND });
        });
      
        it('should return 401 if unauthorized error occurs', async () => {
          const error = { response: { status: 401 } };
          sinon.stub(metaDataService, 'getWorkInProgress').returns(Promise.reject(error));
      
          const response = await request(app).get('/clients/metadata/wip');
      
          expect(response.status).to.equal(401);
          expect(response.body).to.deep.equal({ error: constants.COMMON_ERROR_MESSAGES.UNAUTHORIZED });
        });
      
        it('should return 400 if bad request error occurs', async () => {
          const error = { response: { status: 400 } };
          sinon.stub(metaDataService, 'getWorkInProgress').returns(Promise.reject(error));
      
          const response = await request(app).get('/clients/metadata/wip');
      
          expect(response.status).to.equal(400);
          expect(response.body).to.deep.equal({ error: constants.COMMON_ERROR_MESSAGES.BAD_REQUEST });
        });
      
        it('should return 500 for internal server errors', async () => {
          const error = new Error('Internal server error');
          sinon.stub(metaDataService, 'getWorkInProgress').returns(Promise.reject(error));
          sinon.stub(logger.logger, 'error'); // Stub the logger to prevent console output
      
          const response = await request(app).get('/clients/metadata/wip');
      
          expect(response.status).to.equal(500);
          expect(response.body).to.deep.equal({ error: constants.COMMON_ERROR_MESSAGES.INTERNAL_SERVER_ERROR });
        });
      });
});

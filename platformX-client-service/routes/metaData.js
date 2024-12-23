import express from 'express';
import metaDataController from '../controllers/metaDataController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Metadata
 *   description: API for managing Metadata
 */

/**
 * @swagger
 * /clients/metadata/country-regions:
 *   get:
 *     summary: Get all country regions
 *     tags:
 *       - Metadata
 *     responses:
 *       '200':
 *         description: A list of country regions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   code:
 *                     type: string
 *                     maxLength: 10
 *                     example: "US"
 *                   name:
 *                     type: string
 *                     maxLength: 50
 *                     example: "United States"
 *                   isoCode:
 *                     type: string
 *                     maxLength: 2
 *                     example: "US"
 *                   isoNumericCode:
 *                     type: string
 *                     maxLength: 3
 *                     example: "840"
 *                   addressFormat:
 *                     type: string
 *                     maxLength: 100
 *                     example: "{name}\n{address}\n{city}, {state} {zip}"
 *                   contactAddressFormat:
 *                     type: string
 *                     maxLength: 100
 *                     example: "{name}\n{address}\n{city}, {state} {zip}"
 *                   stateName:
 *                     type: string
 *                     maxLength: 50
 *                     example: "California"
 *                   taxScheme:
 *                     type: string
 *                     maxLength: 50
 *                     example: "VAT"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-01-01T00:00:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2023-01-01T00:00:00Z"
 */

router.get('/country-regions', metaDataController.getCountryRegions);

/**
 * @swagger
 * /clients/metadata/country/{country}/zipcodes:
 *   get:
 *     summary: Get ZipCode details for a specific country
 *     tags: [Metadata]
 *     description: Retrieve zipcodes configured in Business Central for the specified country.
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         description: The country code for which to retrieve zipcodes
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   code:
 *                     type: string
 *                     example: "12345"
 *                   city:
 *                     type: string
 *                     example: "Sample City"
 *                   countryRegionCode:
 *                     type: string
 *                     example: "US"
 *                   state:
 *                     type: string
 *                     example: "CA"
 *                   timeZone:
 *                     type: string
 *                     example: "America/Los_Angeles"
 *       404:
 *         description: No zipcodes found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No zipcodes found"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bad request. Please check the request parameters."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/country/:country/zipcodes', metaDataController.getZipCodes);

/**
 * @swagger
 * /clients/metadata/format-regions:
 *   get:
 *     summary: Retrieve all region details
 *     tags: [Metadata]
 *     description: Fetches a list of all regions including ID, Region Name, Language, State, Country Region Code.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   region:
 *                     type: string
 *                     example: North America
 *                   language:
 *                     type: string
 *                     example: English
 *                   state:
 *                     type: string
 *                     example: CA
 *                   countryRegionCode:
 *                     type: string
 *                     example: US
 *       404:
 *         description: No regions found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No regions found"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bad request. Please check the request parameters."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/format-regions', metaDataController.getFormateRegions);

/**
 * @swagger
 * components:
 *   parameters:     
 *   schemas:
 *     ZipCode:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         code:
 *           type: number
 *           example: 12345
 *         city:
 *           type: string
 *           example: Sample City
 *         country_region_code:  
 *           type: string
 *           example: US
 *         state: 
 *           type: string
 *           example: CA
 *         countryRegionCode:
 *           type: string
 *           example: US-CA
 *         time_zone: 
 *           type: string
 *           example: "America/Los_Angeles"
 */
/**
 * @swagger
 * /clients/metadata/contacts:
 *   get:
 *     summary: Retrieve all contacts
 *     tags: [Metadata]
 *     description: Fetches a list of all contacts including ID, Name, Number.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: John Doe
 *                   number:
 *                     type: string
 *                     example: '+1234567890'
 *       404:
 *         description: No contacts found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No contacts found"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bad request. Please check the request parameters."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/contacts', metaDataController.getContacts);

/**
 * @swagger
 * /clients/metadata/languages:
 *   get:
 *     summary: Retrieve all languages
 *     tags: [Metadata]
 *     description: Fetches a list of all languages including ID, Code, Name, Windows Language ID, and Windows Language Name.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   code:
 *                     type: string
 *                     example: en
 *                   name:
 *                     type: string
 *                     example: English
 *                   windowsLanguageId:
 *                     type: string
 *                     example: en-US
 *                   windowsLanguageName:
 *                     type: string
 *                     example: English (United States)
 *       404:
 *         description: No languages found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No languages found"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bad request. Please check the request parameters."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/languages', metaDataController.getLanguages);

/**
 * @swagger
 * /clients/metadata/lookuptype/{lookuptype}:
 *   get:
 *     summary: Get dropdown options based on lookup type.
 *     tags:
 *       - Metadata
 *     description: Retrieve dropdown options depending on the provided lookup type.
 *     parameters:
 *       - in: path
 *         name: lookuptype
 *         required: true
 *         schema:
 *           type: string
 *         description: The type of lookup (e.g., SOW_Status, Job_Type) to retrieve options for.
 *     responses:
 *       200:
 *         description: Successfully retrieved lookup options
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                     description: The unique identifier for the lookup option.
 *                   type:
 *                     type: string
 *                     example: SOW_Status
 *                     description: The type of the lookup option.
 *                   description:
 *                     type: string
 *                     example: SOW Status
 *                     description: A description of the lookup option.
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message.
 */

router.get('/lookuptype/:lookuptype', metaDataController.getLookUpType);

/**
 * @swagger
 * /clients/metadata/wip:
 *   get:
 *     summary: Metadata of WIP
 *     tags: [Metadata]
 *     description: Details of work in progress projects 
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "1"
 *                   code:
 *                     type: string
 *                     example: "POC"
 *                   description:
 *                     type: string
 *                     example: "Percentage of Completion"
 *                   recognizedCosts:
 *                     type: string
 *                     example: "Usage (Total Cost)"
 *                   recognizedSales:
 *                     type: string
 *                     example: "Percentage of Completion"
 *                   wipCost:
 *                     type: boolean
 *                     example: true
 *                   wipSales:
 *                     type: boolean
 *                     example: true
 *                   valid:
 *                     type: boolean
 *                     example: true
 *                   systemDefined:
 *                     type: boolean
 *                     example: true
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-24T12:00:00Z"
 *                   createdBy:
 *                     type: string
 *                     example: "UserName"
 *                   modifiedBy:
 *                     type: string
 *                     example: "UserName"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-09-24T12:00:00Z"
 *             examples:
 *               application/json:
 *                 value:
 *                   - id: "1"
 *                     code: "POC"
 *                     description: "Percentage of Completion"
 *                     recognizedCosts: "Usage (Total Cost)"
 *                     recognizedSales: "Percentage of Completion"
 *                     wipCost: true
 *                     wipSales: true
 *                     valid: true
 *                     systemDefined: true
 *                     createdAt: "2024-09-24T12:00:00Z"
 *                     createdBy: "UserName"
 *                     modifiedBy: "UserName"
 *                     updatedAt: "2024-09-24T12:00:00Z"
 *                   - id: "2"
 *                     code: "SALES VALUE"
 *                     description: "Sales Value"
 *                     recognizedCosts: "Usage (Total Cost)"
 *                     recognizedSales: "Sales Value"
 *                     wipCost: true
 *                     wipSales: true
 *                     valid: true
 *                     systemDefined: true
 *                     createdAt: "2024-09-24T12:00:00Z"
 *                     createdBy: "UserName"
 *                     modifiedBy: "UserName"
 *                     updatedAt: "2024-09-24T12:00:00Z"
 *       400:
 *         description: Bad request. Please check the request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.get('/wip', metaDataController.getWip);

/**
 * @swagger
 * /clients/metadata/project-posting-group:
 *   get:
 *     summary: Get project posting group
 *     tags: [Metadata]
 *     description: Get Project Posting Group options.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   code:
 *                     type: string
 *                     example: 'FIXBIDJOBPOSTING'
 *                   description:
 *                     type: string
 *                     example:  'FIX BID JOB POSTING'
 *             examples:
 *               application/json:
 *                 value:
 *                   - id: 1
 *                     code: 'FIXBIDJOBPOSTING'
 *                     description: 'FIX BID JOB POSTING'
 *                   - id: 1
 *                     code: 'INTERNALJOBPOSTING'
 *                     description: 'FIX BID JOB POSTING'                
 *       404:
 *         description: No project posting groups found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No project posting groups found"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bad request. Please check the request parameters."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.get('/project-posting-group', metaDataController.getProjectPostingGroup);

/**
 * @swagger
 * /clients/metadata/resources:
 *   get:
 *     summary: Get Resources for lookups like Project manager, Person responsable.
 *     tags: [Metadata]
 *     description: Returns a dropdown list of Resource name and code number.  
 *     responses:
 *       200:
 *        description: Successful response with dropdown menu.
 *        content:
 *          application/json:
 *            schema:
 *              type: array  
 *            example:
 *              - id: 1
 *                resourceNo: "INNR000001"
 *                resourceName: "Chaitra"
 *              - id: 2
 *                resourceNo: "INNR000001"
 *                resourceName: "Asha"             
 *       400:
 *         description: Bad request. Please check the request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: Not Found. The specified resource does not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: An error occurred while fetching List.
 */
router.get('/resources', metaDataController.getResources);

/**
 * @swagger
 * /clients/metadata/currencies:
 *   get:
 *     summary: Get Currencies
 *     tags: [Metadata]
 *     description: Get currency options.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   code:
 *                     type: string
 *                     example: 'EUR'
 *                   description:
 *                     type: string
 *                     example:  'EURO'
 *             examples:
 *               application/json:
 *                 value:
 *                   - id: 1
 *                     code: 'USD'
 *                     description: 'US Dollers'
 *                   - id: 2
 *                     code: 'EUR'
 *                     description: 'EURO'             
 *       404:
 *         description: No currencies found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No currencies found"
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Bad request. Please check the request parameters."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

router.get('/currencies',metaDataController.getCurrencies);

/**
 * @swagger
 * /clients/metadata/locations:
 *   get:
 *     summary: Get Location Code details
 *     tags: [Metadata]
 *     description: Retrieve location codes configured in Business Central.
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: 'Texas'
 *                   code:
 *                     type: string
 *                     example: 'TX'
 *             examples:
 *               application/json:
 *                 value:
 *                   - id: 1
 *                     name: 'Texas'
 *                     code: 'TX'
 *                   - id: 2
 *                     name: 'New York'
 *                     code: 'NY'
 *       400:
 *         description: Bad request. Please check the request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       404:
 *         description: No locationcodes found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
 
router.get('/locations',metaDataController.getLocations);

export default router

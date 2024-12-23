const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Client-Service:Clients
 *   description: API for managing Clients
 */

/**
 * @swagger
 * /client-service/clients:
 *   post:
 *     summary: Add a new client
 *     tags: 
 *       - Client-Service:Clients
 *     description: Create a new client record with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the client.
 *               address:
 *                 type: string
 *                 description: The first line of the client's address.
 *               address2:
 *                 type: string
 *                 description: The second line of the client's address.
 *               countryRegionId:
 *                 type: integer
 *                 description: The country region ID where the client is located.
 *               city:
 *                 type: string
 *                 description: The city where the client is located.
 *               state:
 *                 type: string
 *                 description: The state where the client is located.
 *               zipCode:
 *                 type: string
 *                 description: The postal code of the client's address.
 *               phoneNo:
 *                 type: string
 *                 description: The contact phone number for the client.
 *               mobilePhoneNo:
 *                 type: string
 *                 description: The mobile phone number for the client.
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The client's email.
 *               faxNo:
 *                 type: string
 *                 description: The fax number for the client.
 *               website:
 *                 type: string
 *                 format: uri
 *                 description: The website URL of the client.
 *               languageId:
 *                 type: integer
 *                 description: The language code ID for the client.
 *               formatRegionId:
 *                 type: integer
 *                 description: The format region ID for the client.
 *               contactId:
 *                 type: integer
 *                 description: The contact code ID associated with the client.
 *               createdBy:
 *                 type: string
 *                 description: The username of the creator of the client entry.
 *             required:
 *               - name
 *               - createdBy
 *           example:
 *             name: "Textile Enterprises"
 *             address: "123 Business Rd"
 *             address2: "Suite 456"
 *             countryRegionId: 65
 *             city: "Marietta"
 *             state: "Georgia"
 *             zipCode: "30009"
 *             phoneNo: "+1-555-123-4567"
 *             mobilePhoneNo: "+1-555-765-4321"
 *             email: "contact@textileenterprises.com"
 *             faxNo: "+1-555-987-6543"
 *             website: "https://www.textileenterprises.com"
 *             languageId: 1
 *             formatRegionId: 1
 *             contactId: 1
 *             createdBy: "Anand.Periyasamy"
 *     responses:
 *       '201':
 *         description: Client successfully created
 *         headers:
 *           Location:
 *             description: The URL of the newly created client resource.
 *             schema:
 *               type: string
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the created client.
 *                 customerNo:
 *                   type: string
 *                   description: The unique customer number for the client.
 *                 name:
 *                   type: string
 *                   description: The name of the client.
 *                 address:
 *                   type: string
 *                   description: The first line of the client's address.
 *                 address2:
 *                   type: string
 *                   description: The second line of the client's address.
 *                 countryRegionId:
 *                   type: integer
 *                   description: The country region ID.
 *                 countryCode:
 *                   type: string
 *                   description: The country code where the client is located.
 *                 country:
 *                   type: string
 *                   description: The country where the client is located.
 *                 city:
 *                   type: string
 *                   description: The city where the client is located.
 *                 state:
 *                   type: string
 *                   description: The state where the client is located.
 *                 zipCode:
 *                   type: string
 *                   description: The postal code of the client's address.
 *                 phoneNo:
 *                   type: string
 *                   description: The contact phone number for the client.
 *                 mobilePhoneNo:
 *                   type: string
 *                   description: The mobile phone number for the client.
 *                 email:
 *                   type: string
 *                   format: email
 *                   description: The client's email.
 *                 faxNo:
 *                   type: string
 *                   description: The fax number for the client.
 *                 website:
 *                   type: string
 *                   format: uri
 *                   description: The website URL of the client.
 *                 languageId:
 *                   type: integer
 *                   description: The language code ID for the client.
 *                 languageCode:
 *                   type: string
 *                   description: The language code for the client.
 *                 languageName:
 *                   type: string
 *                   description: The full name of the language used by the client.
 *                 formatRegionId:
 *                   type: integer
 *                   description: The format region ID for the client.
 *                 formatRegion:
 *                   type: string
 *                   description: The format region for the client.
 *                 formatRegionName:
 *                   type: string
 *                   description: The full name of the format region for the client.
 *                 contactId:
 *                   type: integer
 *                   description: The contact code ID associated with the client.
 *                 contactCode:
 *                   type: string
 *                   description: The contact code associated with the client.
 *                 contactName:
 *                   type: string
 *                   description: The name of the primary contact for the client.
 *                 createdBy:
 *                   type: string
 *                   description: The username of the creator of the client entry.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Created date of the client.
 *                 modifiedBy:
 *                   type: string
 *                   description: The username of the last modifier of the client entry.
 *                 modifiedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last modified date of the client.
 *               example:
 *                 id: 1
 *                 customerNo: "C000001"
 *                 name: "Textile Enterprises"
 *                 address: "123 Business Rd"
 *                 address2: "Suite 456"
 *                 countryRegionId: 65
 *                 countryCode: "US"
 *                 country: "United States"
 *                 city: "Marietta"
 *                 state: "Georgia"
 *                 zipCode: "30009"
 *                 phoneNo: "+1-555-123-4567"
 *                 mobilePhoneNo: "+1-555-765-4321"
 *                 email: "contact@textileenterprises.com"
 *                 faxNo: "+1-555-987-6543"
 *                 website: "https://www.textileenterprises.com"
 *                 languageId: 1
 *                 languageCode: "ENU"
 *                 languageName: "English"
 *                 formatRegionId: 1
 *                 formatRegion: "en-CA"
 *                 formatRegionName: "English (Canada)"
 *                 contactId: 1
 *                 contactCode: "CT000001"
 *                 contactName: "John Doe"
 *                 createdBy: "Anand.Periyasamy"
 *                 createdAt: "2024-08-29T14:00:00Z"
 *                 modifiedBy: "Anand.Periyasamy"
 *                 modifiedAt: "2024-08-29T14:00:00Z"
 *       '400':
 *         description: Bad request. Please check the request payload.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '401':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.post('/');

/**
 * @swagger
 * /client-service/clients/{id}:
 *   patch:
 *     summary: Update a client record
 *     tags: 
 *       - Client-Service:Clients
 *     description: Update the details of an existing client record.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the client to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the client.
 *               address:
 *                 type: string
 *                 description: The first line of the client's address.
 *               address2:
 *                 type: string
 *                 description: The second line of the client's address.
 *               countryRegionId:
 *                 type: integer
 *                 description: The country code where the client is located.
 *               city:
 *                 type: string
 *                 description: The city where the client is located.
 *               state:
 *                 type: string
 *                 description: The state where the client is located.
 *               zipCode:
 *                 type: string
 *                 description: The postal code of the client's address.
 *               phoneNo:
 *                 type: string
 *                 description: The contact phone number for the client.
 *               mobilePhoneNo:
 *                 type: string
 *                 description: The mobile phone number for the client.
 *               email:
 *                 type: string
 *                 description: The client email.
 *               faxNo:
 *                 type: string
 *                 description: The fax number for the client.
 *               website:
 *                 type: string
 *                 format: uri
 *                 description: The website URL of the client.
 *               languageId:
 *                 type: integer
 *                 description: The language code ID for the client.
 *               formatRegionId:
 *                 type: integer
 *                 description: The format region ID for the client.
 *               contactId:
 *                 type: integer
 *                 description: The contact code ID associated with the client.
 *               modifiedBy:
 *                   type: string
 *                   description: The username of the last modifier of the client entry.
 *             required:
 *               - name
 *               - modifiedBy
 *           example:
 *             name: "Textile Enterprises-updated"
 *             address: "123 Business Rd-updated"
 *             modifiedBy: "Anand.Periyasamy"
 *     responses:
 *       '200':
 *         description: Client successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: The ID of the client.
 *                 customerNo:
 *                   type: string
 *                   description: The unique customer number for the client.
 *                 name:
 *                   type: string
 *                   description: The name of the client.
 *                 address:
 *                   type: string
 *                   description: The first line of the client's address.
 *                 address2:
 *                   type: string
 *                   description: The second line of the client's address.
 *                 countryRegionId:
 *                   type: integer
 *                   description: The country region ID.
 *                 countryCode:
 *                   type: string
 *                   description: The country code where the client is located.
 *                 country:
 *                   type: string
 *                   description: The country where the client is located.
 *                 city:
 *                   type: string
 *                   description: The city where the client is located.
 *                 state:
 *                   type: string
 *                   description: The state where the client is located.
 *                 zipCode:
 *                   type: string
 *                   description: The postal code of the client's address.
 *                 phoneNo:
 *                   type: string
 *                   description: The contact phone number for the client.
 *                 mobilePhoneNo:
 *                   type: string
 *                   description: The mobile phone number for the client.
 *                 email:
 *                   type: string
 *                   description: The client email.
 *                 faxNo:
 *                   type: string
 *                   description: The fax number for the client.
 *                 website:
 *                   type: string
 *                   format: uri
 *                   description: The website URL of the client.
 *                 languageId:
 *                   type: integer
 *                   description: The language code ID for the client.
 *                 languageCode:
 *                   type: string
 *                   description: The language code for the client.
 *                 languageName:
 *                   type: string
 *                   description: The full name of the language used by the client.
 *                 formatRegionId:
 *                   type: integer
 *                   description: The format region ID for the client.
 *                 formatRegion:
 *                   type: string
 *                   description: The format region for the client.
 *                 formatRegionName:
 *                   type: string
 *                   description: The full name of the format region for the client.
 *                 contactId:
 *                   type: integer
 *                   description: The contact code ID associated with the client.
 *                 contactCode:
 *                   type: string
 *                   description: The contact code associated with the client.
 *                 contactName:
 *                   type: string
 *                   description: The name of the primary contact for the client.
 *                 createdBy:
 *                   type: string
 *                   description: The client entry created by.
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Created date of the client.
 *                 modifiedBy:
 *                   type: string
 *                   description: The client entry modified by.
 *                 modifiedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Last modified date of the client.
 *               example:
 *                 id: 1
 *                 customerNo: "C000001"
 *                 name: "Textile Enterprises-updated"
 *                 address: "123 Business Rd-updated"
 *                 address2: "Suite 456"
 *                 countryRegionId: 1
 *                 countryCode: "US"
 *                 country: "United States"
 *                 city: "Marietta"
 *                 state: "Georgia"
 *                 zipCode: "30067"
 *                 phoneNo: "+1-555-123-4567"
 *                 mobilePhoneNo: "+1-555-765-4321"
 *                 email: "contact@textileenterprises.com"
 *                 faxNo: "+1-555-987-6543"
 *                 website: "https://www.textileenterprises.com"
 *                 languageId: 1
 *                 languageCode: "ENU"
 *                 languageName: "English"
 *                 formatRegionId: 1
 *                 formatRegion: "en-CA"
 *                 formatRegionName: "English (Canada)"
 *                 contactId: 1
 *                 contactCode: "CT000001"
 *                 contactName: "John Doe"
 *                 createdBy: "Anand.Periyasamy"
 *                 createdAt: "2024-08-29T14:00:00Z"
 *                 modifiedBy: "Anand.Periyasamy"
 *                 modifiedAt: "2024-08-29T14:00:00Z"
 *       '400':
 *         description: Bad request. Please check the request payload.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '401':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '404':
 *         description: Client not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.patch('/:id');

/**
 * @swagger
 * /client-service/clients:
 *   get:
 *     summary: Retrieve client details
 *     tags:
 *       - Client-Service:Clients
 *     description: Fetch client details with support for search, sorting, and pagination.
 *     parameters:
 *       - name: searchTerm
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Keyword to search for client details.
 *       - name: sortField
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Field to sort by (e.g., name, city, state).
 *       - name: sortOrder
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Order of sorting (asc for ascending, desc for descending).
 *       - name: pageNumber
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination (starts at 1).
 *       - name: pageSize
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Number of items per page (default is 10).
 *     responses:
 *       '200':
 *         description: Successful response containing a list of clients with pagination.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pageNumber:
 *                   type: integer
 *                   description: Current page number.
 *                 pageSize:
 *                   type: integer
 *                   description: Number of items per page.
 *                 totalRecords:
 *                   type: integer
 *                   description: Total number of clients available.
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages.
 *                 clients:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Client'
 *             example:
 *               pageNumber: 1
 *               pageSize: 10
 *               totalRecords: 50
 *               totalPages: 5
 *               data:
 *                 - id: 1
 *                   customerNo: "C000001"
 *                   name: "Textile Enterprises"
 *                   address: "123 Business Rd"
 *                   address2: "Suite 456"
 *                   countryRegionId: 1
 *                   countryCode: "US"
 *                   country: "United States"
 *                   city: "Marietta"
 *                   state: "Georgia"
 *                   zipCode: "30067"
 *                   phoneNo: "+1-555-123-4567"
 *                   mobilePhoneNo: "+1-555-765-4321"
 *                   email: "contact@textileenterprises.com"
 *                   faxNo: "+1-555-987-6543"
 *                   website: "https://www.textileenterprises.com"
 *                   languageId: 1
 *                   languageCode: "ENU"
 *                   languageName: "English"
 *                   formatRegionId: 1
 *                   formatRegion: "en-CA"
 *                   formatRegionName: "English (Canada)"
 *                   contactId: 1
 *                   contactCode: "CT000001"
 *                   contactName: "John Doe"
 *                   createdBy: "Anand.Periyasamy"
 *                   createdAt: "2024-08-29T14:00:00Z"
 *                   modifiedBy: "Anand.Periyasamy"
 *                   modifiedAt: "2024-08-29T14:00:00Z"
 *                 - id: 2
 *                   customerNo: "C000002"
 *                   name: "Manufacturing Co."
 *                   address: "456 Industrial Ave"
 *                   address2: ""
 *                   countryRegionId: 1
 *                   countryCode: "US"
 *                   country: "United States"
 *                   city: "Atlanta"
 *                   state: "Georgia"
 *                   zipCode: "30301"
 *                   phoneNo: "+1-555-123-4568"
 *                   mobilePhoneNo: "+1-555-765-4322"
 *                   email: "info@manufacturingco.com"
 *                   faxNo: "+1-555-987-6544"
 *                   website: "https://www.manufacturingco.com"
 *                   languageId: 1
 *                   languageCode: "ENU"
 *                   languageName: "English"
 *                   formatRegionId: 1
 *                   formatRegion: "en-CA"
 *                   formatRegionName: "English (Canada)"
 *                   contactId: 2
 *                   contactCode: "CT000002"
 *                   contactName: "Jane Smith"
 *                   createdBy: "Anand.Periyasamy"
 *                   createdAt: "2024-08-29T14:00:00Z"
 *                   modifiedBy: "Anand.Periyasamy"
 *                   modifiedAt: "2024-08-29T14:00:00Z"
 *       '400':
 *         description: Bad request due to invalid parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '401':
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '404':
 *         description: No clients found for the provided criteria.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

router.get('/');

/**
 * @swagger
 * /client-service/clients/{id}:
 *   get:
 *     summary: Retrieve a specific client by ID
 *     tags:
 *       - Client-Service:Clients
 *     description: Fetch details of a client using their unique ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Unique ID of the client.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response containing client details.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Client'
 *       '400':
 *         description: Bad request due to invalid ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '401':
 *         description: Unauthorized access.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '404':
 *         description: Client not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       '500':
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Client:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique client ID.
 *         customerNo:
 *           type: string
 *           description: Unique customer number.
 *         name:
 *           type: string
 *           description: Client name.
 *         address:
 *           type: string
 *           description: Primary address line.
 *         address2:
 *           type: string
 *           description: Secondary address line.
 *         countryRegionId:
 *           type: integer
 *           description: Country region ID.
 *         countryCode:
 *           type: string
 *           description: Country code.
 *         country:
 *           type: string
 *           description: Country name.
 *         city:
 *           type: string
 *           description: City name.
 *         state:
 *           type: string
 *           description: State name.
 *         zipCode:
 *           type: string
 *           description: Postal code.
 *         phoneNo:
 *           type: string
 *           description: Contact phone number.
 *         mobilePhoneNo:
 *           type: string
 *           description: Mobile phone number.
 *         email:
 *           type: string
 *           description: Client email.
 *         faxNo:
 *           type: string
 *           description: Fax number.
 *         website:
 *           type: string
 *           format: uri
 *           description: Website URL.
 *         languageId:
 *           type: integer
 *           description: Language ID.
 *         languageCode:
 *           type: string
 *           description: Language code.
 *         languageName:
 *           type: string
 *           description: Full language name.
 *         formatRegionId:
 *           type: integer
 *           description: Format region ID.
 *         formatRegion:
 *           type: string
 *           description: Format region.
 *         formatRegionName:
 *           type: string
 *           description: Full format region name.
 *         contactId:
 *           type: integer
 *           description: Contact ID.
 *         contactCode:
 *           type: string
 *           description: Contact code.
 *         contactName:
 *           type: string
 *           description: Primary contact name.
 *         createdBy:
 *           type: string
 *           description: Creator of the entry.
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation date and time.
 *         modifiedBy:
 *           type: string
 *           description: Last modifier of the entry.
 *         modifiedAt:
 *           type: string
 *           format: date-time
 *           description: Last modification date and time.
 *       example:
 *         id: 1
 *         customerNo: "C000001"
 *         name: "Textile Enterprises"
 *         address: "123 Business Rd"
 *         address2: "Suite 456"
 *         countryRegionId: 1
 *         countryCode: "US"
 *         country: "United States"
 *         city: "Marietta"
 *         state: "Georgia"
 *         zipCode: "30067"
 *         phoneNo: "+1-555-123-4567"
 *         mobilePhoneNo: "+1-555-765-4321"
 *         email: "contact@textileenterprises.com"
 *         faxNo: "+1-555-987-6543"
 *         website: "https://www.textileenterprises.com"
 *         languageId: 1
 *         languageCode: "ENU"
 *         languageName: "English"
 *         formatRegionId: 1
 *         formatRegion: "en-CA"
 *         formatRegionName: "English (Canada)"
 *         contactId: 1
 *         contactCode: "CT000001"
 *         contactName: "John Doe"
 *         createdBy: "Anand.Periyasamy"
 *         createdAt: "2024-08-29T14:00:00Z"
 *         modifiedBy: "Anand.Periyasamy"
 *         modifiedAt: "2024-08-29T14:00:00Z"
 */

router.get('/:id');

module.exports = router;

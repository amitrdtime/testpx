const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Client-Service:Statement of Work (SOW)
 *   description: API for managing Statement of Work (SOWs)
 */

/**
 * @swagger
 * /client-service/client/{clientid}/sow:
 *   post:
 *     summary: Create a new Statement of Work (SOW)
 *     tags:
 *       - Client-Service:Statement of Work (SOW)
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         description: Client Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Description of the SOW
 *                 example: "This is a sample SOW description."
 *               customerNo:
 *                 type: string
 *                 description: Identifier for the customer 
 *               startingDate:
 *                 type: string
 *                 format: date
 *               endingDate:
 *                 type: string
 *                 format: date
 *               customerId:
 *                 type: number
 *                 description: Unique identifier for the customer
 *               personResponsibleId:
 *                 type: number
 *                 description: ID of the person responsible for the SOW
 *               jobTypeId:
 *                 type: number
 *                 description: Job type ID
 *               projectManagerId:
 *                 type: number
 *                 description: Project manager ID
 *               sowStatusId:
 *                 type: number
 *                 description: SOW status ID
 *               projectPostingGroupId:
 *                 type: number
 *                 description: Project posting group ID
 *               locationId:
 *                 type: number
 *                 description: Location ID
 *               currencyId:
 *                 type: number
 *                 description: Currency ID
 *               invoiceCurrencyId:
 *                 type: number
 *                 description: Invoice currency ID
 *               exchCalculationCostId:
 *                 type: number
 *                 description: Exchange calculation cost ID
 *               exchCalculationPriceId:
 *                 type: number
 *                 description: Exchange calculation price ID
 *               blockedId:
 *                 type: number
 *                 description: Blocked ID
 *               createdBy:
 *                 type: string
 *                 description: User who created the SOW
 *             required:
 *               - description
 *               - customerId
 *               - createdBy
 *     responses:
 *       '201':
 *         description: SOW successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: Unique identifier for the SOW
 *                   example: 1
 *                 sowNo:
 *                   type: string
 *                   example: "SOW12345"
 *                 description:
 *                   type: string
 *                   example: "This is a sample SOW description."
 *                 customerNo:
 *                   type: string
 *                 customerName:
 *                   type: string
 *                   example: "Acme Corporation"
 *                 address:
 *                   type: string
 *                 address2:
 *                   type: string
 *                 city:
 *                   type: string
 *                 cityToState:
 *                   type: string
 *                 zipCode:
 *                   type: string
 *                 countryRegion:
 *                   type: string
 *                 contactNo:
 *                   type: string
 *                 phoneNo:
 *                   type: string
 *                 mobileNo:
 *                   type: string
 *                 email:
 *                   type: string
 *                 contact:
 *                   type: string
 *                 personResponsible:
 *                   type: string
 *                   example: "John Doe" 
 *                 jobType:
 *                   type: string
 *                   example: "Fixed Bid"
 *                 projectManager:
 *                   type: string
 *                   example: "Manager A"
 *                 sowStatus:
 *                   type: string
 *                   example: "Open"
 *                 projectPosting:
 *                   type: string
 *                 locationCode:
 *                   type: string
 *                 startingDate:
 *                   type: string
 *                   format: date
 *                 endingDate:
 *                   type: string
 *                   format: date
 *                 currencyCode:
 *                   type: string
 *                 invoiceCurrencyCode:
 *                   type: string
 *                 exchCalculationCost:
 *                   type: string
 *                 exchCalculationPrice:
 *                   type: string
 *                 blocked:
 *                   type: string
 *                   example: "All"
 *                 customerId:
 *                   type: number
 *                 personResponsibleId:
 *                   type: number
 *                 jobTypeId:
 *                   type: number
 *                 projectManagerId:
 *                   type: number
 *                 sowStatusId:
 *                   type: number
 *                 projectPostingGroupId:
 *                   type: number
 *                 locationId:
 *                   type: number
 *                 currencyId:
 *                   type: number
 *                 invoiceCurrencyId:
 *                   type: number
 *                 exchCalculationCostId:
 *                   type: number
 *                 exchCalculationPriceId:
 *                   type: number
 *                 blockedId:
 *                   type: number
 *                 createdBy:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-08-29T14:00:00Z"
 *                 modifiedBy:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-09-20T14:00:00Z"
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */

router.post('/:clientid/sow');

/**
 * @swagger
 * /client-service/client/{clientid}/sow/{sowid}:
 *   patch:
 *     summary: Update an existing Statement of Work (SOW)
 *     tags:
 *       - Client-Service:Statement of Work (SOW)
 *     parameters:
 *       - in: path
 *         name: sowid
 *         required: true
 *       - in: path
 *         name: clientid
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the SOW to update
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: Description of the SOW
 *                 example: "This is an updated SOW description."
 *               startingDate:
 *                 type: string
 *                 format: date
 *               endingDate:
 *                 type: string
 *                 format: date
 *               customerId:
 *                 type: number
 *               personResponsibleId:
 *                 type: number
 *               jobTypeId:
 *                 type: number
 *               projectManagerId:
 *                 type: number
 *               sowStatusId:
 *                 type: number
 *               projectPostingGroupId:
 *                 type: number
 *               locationId:
 *                 type: number
 *               currencyId:
 *                 type: number
 *               invoiceCurrencyId:
 *                 type: number
 *               exchCalculationCostId:
 *                 type: number
 *               exchCalculationPriceId:
 *                 type: number
 *               blockedId:
 *                 type: number 
 *               modifiedBy:
 *                 type: string
 *             required:
 *               - description
 *               - customerId
 *               - modifiedBy
 *     responses:
 *       '200':
 *         description: SOW successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                 sowNo:
 *                   type: string
 *                 description:
 *                   type: string
 *                   example: "This is an updated SOW description."
 *                 customerNo:
 *                   type: string
 *                 customerName:
 *                   type: string
 *                   example: "Acme Corporation"
 *                 address:
 *                   type: string
 *                 address2:
 *                   type: string
 *                 city:
 *                   type: string
 *                 cityToState:
 *                   type: string
 *                 zipCode:
 *                   type: string
 *                 countryRegion:
 *                   type: string
 *                 contactNo:
 *                   type: string
 *                 phoneNo:
 *                   type: string
 *                 mobileNo:
 *                   type: string
 *                 email:
 *                   type: string
 *                 contact:
 *                   type: string
 *                 personResponsible:
 *                   type: string
 *                 jobType:
 *                   type: string
 *                 projectManager:
 *                   type: string
 *                 sowStatus:
 *                   type: string
 *                 projectPosting:
 *                   type: string
 *                 locationCode:
 *                   type: string
 *                 startingDate:
 *                   type: string
 *                   format: date
 *                 endingDate:
 *                   type: string
 *                   format: date
 *                 currencyCode:
 *                   type: string
 *                 invoiceCurrencyCode:
 *                   type: string
 *                 exchCalculationCost:
 *                   type: string
 *                 exchCalculationPrice:
 *                   type: string
 *                 blocked:
 *                   type: string
 *                 customerId:
 *                   type: number
 *                 personResponsibleId:
 *                   type: number
 *                 jobTypeId:
 *                   type: number
 *                 projectManagerId:
 *                   type: number
 *                 sowStatusId:
 *                   type: number
 *                 projectPostingGroupId:
 *                   type: number
 *                 locationId:
 *                   type: number
 *                 currencyId:
 *                   type: number
 *                 invoiceCurrencyId:
 *                   type: number
 *                 exchCalculationCostId:
 *                   type: number
 *                 exchCalculationPriceId:
 *                   type: number
 *                 blockedId:
 *                   type: number
 *                 createdBy:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 modifiedBy:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       '400':
 *         description: Bad Request
 *       '404':
 *         description: SOW not found
 *       '500':
 *         description: Internal Server Error
 */

router.patch('/:clientid/sow/:sowid');

/**
 * @swagger
 *  /client-service/client/{clientid}/sows:
 *   get:
 *     summary: Get SOWs details by Client No and search term with sorting and pagination
 *     tags: 
 *       - Client-Service:Statement of Work (SOW)   
 *     description: Retrieve SOWs details by Client No with search, sorting, and pagination.
 *     parameters:
 *       - name: clientid
 *         in: path
 *         required: true
 *         description: Client id
 *         schema:
 *           type: string
 *       - name: searchTerm
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Search keyword for SOW details.
 *       - name: sortField
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *         description: Field name to sort by (e.g., description, sowNo).
 *       - name: sortOrder
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sorting order (asc for ascending, desc for descending).
 *       - name: pageNumber
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number for pagination (starting at 1).
 *       - name: pageSize
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *         description: Number of items per page (default is 0 if not specified which will get all the records).
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 pageNumber:
 *                   type: integer
 *                   description: Page number for pagination (starting at 1)
 *                 pageSize:
 *                   type: integer
 *                   description: Number of items per page (default is 0 if not specified which will get all the records).
 *                 totalRecords:
 *                   type: integer
 *                   description: Total number of records available
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         description: Unique identifier for the SOW
 *                       sowNo:
 *                         type: string
 *                       description:
 *                         type: string
 *                       customerNo:
 *                         type: string
 *                       customerName:
 *                         type: string
 *                       address:
 *                         type: string
 *                       address2:
 *                         type: string
 *                       city:
 *                         type: string
 *                       cityToState:
 *                         type: string
 *                       zipCode:
 *                         type: string
 *                       countryRegion:
 *                         type: string
 *                       contactNo:
 *                         type: string
 *                       phoneNo:
 *                         type: string
 *                       mobileNo:
 *                         type: string
 *                       email:
 *                         type: string
 *                       contact:
 *                         type: string
 *                       personResponsible:
 *                         type: string
 *                       jobType:
 *                         type: string
 *                       jobTypeId:
 *                         type: number
 *                       projectManager:
 *                         type: string
 *                       projectManagerId:
 *                         type: number
 *                       sowStatus:
 *                         type: string
 *                       sowStatusId:
 *                         type: number
 *                       projectPosting:
 *                         type: string
 *                       projectPostingGroupId:
 *                         type: number
 *                       locationCode:
 *                         type: string
 *                       locationId:
 *                         type: number
 *                       startingDate:
 *                         type: string
 *                         format: date
 *                       endingDate:
 *                         type: string
 *                         format: date
 *                       currencyCode:
 *                         type: string
 *                       currencyId:
 *                         type: number
 *                       invoiceCurrencyCode:
 *                         type: string
 *                       invoiceCurrencyId:
 *                         type: number
 *                       exchCalculationCost:
 *                         type: string
 *                       exchCalculationCostId:
 *                         type: number
 *                       exchCalculationPrice:
 *                         type: string
 *                       exchCalculationPriceId:
 *                         type: number
 *                       blocked:
 *                         type: string
 *                       blockedId:
 *                         type: number
 *                       createdBy:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       modifiedBy:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *             example:
 *               pageNumber: 1
 *               pageSize: 10
 *               totalRecords: 1
 *               totalPages: 1
 *               data:
 *                 - id: 1
 *                   sowNo: "SOW12345"
 *                   description: "This is a sample SOW description."
 *                   customerNo: "C00001"
 *                   customerName: "Acme Corporation"
 *                   address: "123 Main St"
 *                   address2: "Apt 4B"
 *                   city: "New York"
 *                   cityToState: "NY"
 *                   zipCode: "10001"
 *                   countryRegion: "USA"
 *                   contactNo: "555-1234"
 *                   phoneNo: "555-5678"
 *                   mobileNo: "555-8765"
 *                   email: "john.doe@example.com"
 *                   contact: "John Doe"
 *                   personResponsible: "Jane Smith"
 *                   jobType: "Fixed Bid"
 *                   jobTypeId: 1
 *                   projectManager: "Manager A"
 *                   projectManagerId: "p1"
 *                   sowStatus: "Open"
 *                   sowStatusId: 1
 *                   projectPosting: "Project Posting 1"
 *                   projectPostingGroupId: 1
 *                   locationCode: "LOC01"
 *                   locationId: 1
 *                   startingDate: "2024-09-01"
 *                   endingDate: "2024-12-31"
 *                   currencyCode: "USD"
 *                   currencyId: 1
 *                   invoiceCurrencyCode: "USD"
 *                   invoiceCurrencyId: 1
 *                   exchCalculationCost: "1.0"
 *                   exchCalculationCostId: 1
 *                   exchCalculationPrice: "1.0"
 *                   exchCalculationPriceId: 1
 *                   blocked: "All"
 *                   blockedId: 1
 *                   createdBy: "admin"
 *                   createdAt: "2024-08-01T10:00:00Z"
 *                   modifiedBy: "admin"
 *                   updatedAt: "2024-09-20T14:00:00Z"
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
 *         description: No SOWs found
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

router.get('/:clientid/sows');

/**
 * @swagger
 * /client-service/client/{clientid}/sow/{sowid}:
 *   get:
 *     summary: Get a SOW details by number
 *     tags: 
 *        - Client-Service:Statement of Work (SOW)
 *     description: Retrieve the details of a specific SOW using its number.
 *     parameters:
 *       - name: sowid
 *         in: path
 *         required: true
 *         description: The number of SOW
 *       - in: path
 *         name: clientid
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: Unique identifier for the SOW
 *                 sowNo:
 *                   type: string
 *                 description:
 *                   type: string
 *                 customerNo:
 *                   type: string
 *                 customerName:
 *                   type: string
 *                 address:
 *                   type: string
 *                 address2:
 *                   type: string
 *                 city:
 *                   type: string
 *                 cityToState:
 *                   type: string
 *                 zipCode:
 *                   type: string
 *                 countryRegion:
 *                   type: string
 *                 contactNo:
 *                   type: string
 *                 phoneNo:
 *                   type: string
 *                 mobileNo:
 *                   type: string
 *                 email:
 *                   type: string
 *                 contact:
 *                   type: string
 *                 personResponsible:
 *                   type: string
 *                 jobType:
 *                   type: string
 *                 jobTypeId:
 *                   type: number
 *                 projectManager:
 *                   type: string
 *                 projectManagerId:
 *                   type: number
 *                 sowStatus:
 *                   type: string
 *                 sowStatusId:
 *                   type: number
 *                 projectPosting:
 *                   type: string
 *                 projectPostingGroupId:
 *                   type: number
 *                 locationCode:
 *                   type: string
 *                 locationId:
 *                   type: number
 *                 startingDate:
 *                   type: string
 *                   format: date
 *                 endingDate:
 *                   type: string
 *                   format: date
 *                 currencyCode:
 *                   type: string
 *                 currencyId:
 *                   type: number
 *                 invoiceCurrencyCode:
 *                   type: string
 *                 invoiceCurrencyId:
 *                   type: number
 *                 exchCalculationCost:
 *                   type: string
 *                 exchCalculationCostId:
 *                   type: number
 *                 exchCalculationPrice:
 *                   type: string
 *                 exchCalculationPriceId:
 *                   type: number
 *                 blocked:
 *                   type: string
 *                 blockedId:
 *                   type: number
 *                 createdBy:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 modifiedBy:
 *                   type: string
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *             example:
 *               id: 1
 *               sowNo: "sow-12345"
 *               description: "This is a sample SOW description."
 *               customerNo: "CUST001"
 *               customerName: "Acme Corporation"
 *               address: "123 Main St"
 *               address2: "Apt 4B"
 *               city: "New York"
 *               cityToState: "NY"
 *               zipCode: "10001"
 *               countryRegion: "USA"
 *               contactNo: "555-1234"
 *               phoneNo: "555-5678"
 *               mobileNo: "555-8765"
 *               email: "john.doe@example.com"
 *               contact: "John Doe"
 *               personResponsible: "Jane Smith"
 *               jobType: "Fixed Bid"
 *               jobTypeId: "1"
 *               projectManager: "Manager A"
 *               projectManagerId: "1"
 *               sowStatus: "Open"
 *               sowStatusId: "1"
 *               projectPosting: "Project Posting 1"
 *               projectPostingGroupId: "1"
 *               locationCode: "LOC01"
 *               locationId: "1"
 *               startingDate: "2024-09-01"
 *               endingDate: "2024-12-31"
 *               currencyCode: "USD"
 *               currencyId: "1"
 *               invoiceCurrencyCode: "USD"
 *               invoiceCurrencyId: "1"
 *               exchCalculationCost: "1.0"
 *               exchCalculationCostId: "1"
 *               exchCalculationPrice: "1.0"
 *               exchCalculationPriceId: "1"
 *               blocked: "All"
 *               blockedId: "1"
 *               createdBy: "admin"
 *               createdAt: "2024-08-01T10:00:00Z"
 *               modifiedBy: "admin"
 *               updatedAt: "2024-09-20T14:00:00Z"
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
 *         description: SOW not found
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

router.get('/:clientid/sow/:sowid');

module.exports = router;
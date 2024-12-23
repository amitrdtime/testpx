const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: [Client-Service:Project Resources API]
 *   description: API for managing project resources under SOW number and project number
 */

/**
 * @swagger
 * /client-service/client/{clientno}/sow/{sowno}/project/{projectno}/resources:
 *   get:
 *     summary: Retrieve project resources by SOW and project number
 *     tags:
 *       - [Client-Service:Project Resources API]
 *     description: Get the list of resources for a specific project under an SOW. Useful for understanding resource allocation and financial details.
 *     parameters:
 *       - name: clientno
 *         in: path
 *         required: true
 *         description: The client number associated with the project.
 *         schema:
 *           type: string
 *       - name: sowno
 *         in: path
 *         required: true
 *         description: The SOW number associated with the project.
 *         schema:
 *           type: string
 *       - name: projectno
 *         in: path
 *         required: true
 *         description: The project number for which resources are being queried.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful retrieval of project resources
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Resource'
 *       '400':
 *         description: Bad request due to invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid SOW number or project number"
 *       '401':
 *         description: Unauthorized access to the endpoint
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       '404':
 *         description: Resources not found for the specified SOW and project number
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No resources found for the given SOW and project number"
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get('/resources');
/**
 * @swagger
 * /client-service/client/{clientno}/sow/{sowno}/project/{projectno}/resource/{resourceno}:
 *   put:
 *     summary: Update an existing resource for a specific project under an SOW
 *     tags:
 *       - [Client-Service:Project Resources API]
 *     description: Modify details of an existing resource for a project, such as quantity, cost, or planned delivery date.
 *     parameters:
 *       - name: clientno
 *         in: path
 *         required: true
 *         description: The client number associated with the project.
 *         schema:
 *           type: string
 *       - name: sowno
 *         in: path
 *         required: true
 *         description: The SOW number associated with the project.
 *         schema:
 *           type: string
 *       - name: projectno
 *         in: path
 *         required: true
 *         description: The project number associated with the resource.
 *         schema:
 *           type: string
 *       - name: resourceno
 *         in: path
 *         required: true
 *         description: The resource number that needs to be updated.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       200:
 *         description: Resource successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Resource successfully updated"
 *                 resource:
 *                   $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Invalid request parameters or body
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request body"
 *       401:
 *         description: Unauthorized access to the endpoint
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Resource not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.put('/resource/:resourceno');
/**
 * @swagger
 * /client-service/client/{clientno}/sow/{sowno}/project/{projectno}/resource:
 *   post:
 *     summary: Add a new resource to a specific project under an SOW
 *     tags:
 *       - [Client-Service:Project Resources API]
 *     description: Create a new resource for a project. This can include labor, materials, or other resource types allocated to the project.
 *     parameters:
 *       - name: clientno
 *         in: path
 *         required: true
 *         description: The client number associated with the project.
 *         schema:
 *           type: string
 *       - name: sowno
 *         in: path
 *         required: true
 *         description: The SOW number associated with the project.
 *         schema:
 *           type: string
 *       - name: projectno
 *         in: path
 *         required: true
 *         description: The project number for which resources are being added.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Resource'
 *     responses:
 *       201:
 *         description: Resource successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Resource successfully created"
 *                 resource:
 *                   $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Invalid input data provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request body"
 *       401:
 *         description: Unauthorized access to the endpoint
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.post('/resource');
/**
 * @swagger
 * /client-service/client/{clientno}/sow/{sowno}/project/{projectno}/resource/{resourceno}:
 *   get:
 *     summary: Get an existing resource for a specific project under an SOW
 *     tags:
 *       - [Client-Service:Project Resources API]
 *     description: Retrieve details of an existing resource for a project.
 *     parameters:
 *       - name: clientno
 *         in: path
 *         required: true
 *         description: The client number associated with the project.
 *         schema:
 *           type: string
 *       - name: sowno
 *         in: path
 *         required: true
 *         description: The SOW number associated with the project.
 *         schema:
 *           type: string
 *       - name: projectno
 *         in: path
 *         required: true
 *         description: The project number associated with the resource.
 *         schema:
 *           type: string
 *       - name: resourceno
 *         in: path
 *         required: true
 *         description: The resource number that needs to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Resource successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Resource successfully retrieved"
 *                 resource:
 *                   $ref: '#/components/schemas/Resource'
 *       400:
 *         description: Invalid request parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid request parameters"
 *       401:
 *         description: Unauthorized access to the endpoint
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       404:
 *         description: Resource not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Resource not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get('/resource/:resourceno');
module.exports = router;

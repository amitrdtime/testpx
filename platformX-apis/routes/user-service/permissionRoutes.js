const express = require('express');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User-Service:Permissions
 *   description: API for managing permissions
 */

/**
 * @swagger
 * /user-service/permissions:
 *   post:
 *     summary: Create a new Permission
 *     tags: [User-Service:Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissionName:
 *                 type: string
 *                 description: Name of the permission
 *                 example: "Create"
 *               description:
 *                 type: string
 *                 description: Description of the permission
 *                 example: "Manage permissions and settings"
 *               module:
 *                 type: string
 *                 description: The permission for the module
 *                 example: "Manage permissions for the module and settings"
 *               status:
 *                 type: string
 *                 description: Status of the permission
 *                 example: "Active"
 *               createdBy:
 *                 type: string
 *                 description: User ID of the creator
 *                 example: sunil.sinha
 *             required:
 *               - permissionName
 *               - status
 *               - createdBy
 *     responses:
 *       '201':
 *         description: Permission successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 permissionId:
 *                   type: integer
 *                   example: 1
 *                 permissionName:
 *                   type: string
 *                   example: "Administrator"
 *                 description:
 *                   type: string
 *                   example: "Manages user permissions and settings"
 *                 module:
 *                   type: string
 *                   example: "Manage permissions for the module and settings"
 *                 status:
 *                   type: string
 *                   example: "Active"
 *                 createdBy:
 *                   type: string
 *                   example: sunil.sinha
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2023-01-01T00:00:00Z"
 *       '400':
 *         description: Bad request. Please check the request parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid permission name or missing required fields."
 *       '401':
 *         description: Unauthorized access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access."
 *       '409':
 *         description: Conflict. Permission with this name already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Permission name already exists."
 *       '500':
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Server encountered an unexpected condition."
 */
router.post('/');

/**
 * @swagger
 * /user-service/permissions:
 *   get:
 *     summary: Retrieve a list of all permissions
 *     tags: [User-Service:Permissions]
 *     parameters:
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
 *         description: A list of permissions successfully retrieved
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
 *                   description: Total number of permissions available.
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages.
 *                 permissions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       permissionId:
 *                         type: number
 *                         example: 1
 *                       permissionName:
 *                         type: string
 *                         example: "Create"
 *                       description:
 *                         type: string
 *                         example: "Permission managed by admin."
 *                       module:
 *                         type: string
 *                         example: "Permission for module managed by admin."
 *                       status:
 *                         type: string
 *                         example: "Active"
 *                       createdBy:
 *                         type: string
 *                         example: "Admin"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-01-01T10:00:00Z"
 *                       modifiedBy:
 *                         type: string
 *                         example: "sunil.sinha"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-10-01T12:00:00Z"
 *       '400':
 *         description: Bad request. Please check the request parameters.
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
 *         description: No permissions found
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
router.get('/');

/**
 * @swagger
 * /user-service/permissions/{permissionId}:
 *   patch:
 *     summary: Update an existing Permission
 *     tags: [User-Service:Permissions]
 *     parameters:
 *       - in: path
 *         name: permissionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the Permission to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               permissionName:
 *                 type: string
 *                 description: Name of the permission
 *                 example: "Create"
 *               description:
 *                 type: string
 *                 description: Description of the permission
 *                 example: "Permission managed by Admin."
 *               module:
 *                 type: string
 *                 description: The permission for the module
 *                 example: "Permission module managed by Admin."
 *               status:
 *                 type: string
 *                 description: Status of the permission
 *                 example: "Active"
 *               modifiedBy:
 *                 type: string
 *                 description: User who last modified the permission
 *                 example: "sunil.sinha"
 *             required:
 *               - permissionName
 *               - modifiedBy
 *     responses:
 *       '200':
 *         description: Permission successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 permissionId:
 *                   type: number
 *                 permissionName:
 *                   type: string
 *                   example: "Create"
 *                 description:
 *                   type: string
 *                   example: "Permission managed by Admin"
 *                 module:
 *                   type: string
 *                   example: "Permission for module managed by Admin"
 *                 status:
 *                   type: string
 *                   example: "Active"
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
 *         description: Bad request. Please check the request parameters.
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
 *         description: No Permissions found
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
router.patch('/:permissionId');

export default router
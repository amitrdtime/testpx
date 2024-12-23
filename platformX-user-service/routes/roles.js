import express from 'express';
import roleController from '../controllers/roleController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User-Service:Roles
 *   description: API for managing roles
 */

/**
 * @swagger
 * /roles:
 *   post:
 *     summary: Create a new Role
 *     tags: [User-Service:Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *                 description: Name of the role
 *                 example: "Administrator"
 *               description:
 *                 type: string
 *                 description: Description of the role
 *                 example: "Manages user permissions and settings"
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the role
 *                 example: "2023-01-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the role
 *                 example: "2024-01-01"
 *               status:
 *                 type: string
 *                 description: Status of the role
 *                 example: "Active"
 *               createdBy:
 *                 type: integer
 *                 description: User ID of the creator
 *                 example: Anand.Periyasamy
 *             required:
 *               - roleName
 *               - startDate
 *               - status
 *               - createdBy
 *     responses:
 *       '201':
 *         description: Role successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roleId:
 *                   type: integer
 *                   example: 1
 *                 roleName:
 *                   type: string
 *                   example: "Administrator"
 *                 description:
 *                   type: string
 *                   example: "Manages user permissions and settings"
 *                 startDate:
 *                   type: string
 *                   format: date
 *                 endDate:
 *                   type: string
 *                   format: date
 *                 status:
 *                   type: string
 *                   example: "Active"
 *                 createdBy:
 *                   type: integer
 *                   example: Anand.Periyasamy
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
 *                   example: "Invalid role name or missing required fields."
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
 *         description: Conflict. Role with this name already exists.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Role name already exists."
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
router.post('/',roleController.createRole);

/**
 * @swagger
 * /roles/{roleId}:
 *   patch:
 *     summary: Update an existing Role
 *     tags: [User-Service:Roles]
 *     parameters:
 *       - in: path
 *         name: roleId
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique identifier of the Role to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               roleName:
 *                 type: string
 *                 description: Name of the role
 *                 example: "BizOps"
 *               description:
 *                 type: string
 *                 description: Description of the role
 *                 example: "Responsible for managing projects."
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the role
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the role
 *               status:
 *                 type: string
 *                 description: Status of the role
 *                 example: "Active"
 *               modifiedBy:
 *                 type: string
 *                 description: User who last modified the role
 *                 example: "Komal"
 *             required:
 *               - roleName
 *               - modifiedBy
 *     responses:
 *       '200':
 *         description: Role successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roleId:
 *                   type: number
 *                 roleName:
 *                   type: string
 *                   example: "Project Manager"
 *                 description:
 *                   type: string
 *                   example: "Responsible for managing projects."
 *                 startDate:
 *                   type: string
 *                   format: date
 *                 endDate:
 *                   type: string
 *                   format: date
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
 *         description: No Roles found
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

router.patch('/:roleId', roleController.updateRole);

export default router;
import express from 'express';
import userController from '../controllers/userController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: API for managing Projects
 */


/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Retrieve a list of projects
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: A list of projects
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 */
router.get('/', projectController.getProjects);

/**
 * @swagger
 * /api/projects:
 *   put:
 *     summary: Create a Project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Project'
 *           example:
 *             email: useremail@test.com
 *             roleId: 4
 *     responses:
 *       200:
 *         description: Projects Create successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Projects not found
 */
router.put('/', projectController.createProjects);

export default router

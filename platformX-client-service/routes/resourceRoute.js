import express from 'express';
import resourceController from '../controllers/resourceController.js';
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Resources
 *   description: API for managing Resources
 */

/**
 * @swagger
 * /resources:
 *   get:
 *     summary: Get resources like  project manger, person responsible ..etc
 *     tags: [Resources]
 *     description: Retrieve resources to populate a dropdown with name and code.
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
 *                   name:
 *                     type: string
 *                     description: The name of the resources.
 *                   code:
 *                     type: string
 *                     description: The code of the resources.
 *             example:
 *               - name: "resources 1"
 *                 code: "R001"
 *               - name: "resources 2"
 *                 code: "R002"
 *       404:
 *         description: No resources found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Resources not found."
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */

router.get('/', resourceController.getResources);

export default router
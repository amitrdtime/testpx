import express from 'express';
import userController from '../controllers/userController.js';
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for managing users
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 * /users/{email}:
 *   get:
 *     summary: Get a user by Email ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The user description by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: User not found
 */
router.get('/:email', userController.getUserByEmail);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *           example:
 *             email: useremail@test.com
 *             empId: INNXXXX
 *             phone: XXXXXXXXXX
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid input
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /users/{empId}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: empId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: string
 *           example:
 *             phoneNumber: +11-9087998737
 *             personalEmail: sin@innve.com
 *             gender: Male
 *             dob: 20/11/1990
 *             bloodGroup: O+
 *             nationality: Indian
 *             currentAddress: Noida
 *             permanentAddress: Noida
 *             secondaryNumber: +91-999999999
 *             updatedAt: 08/10/2024
 *             modifiedBy: ssinha
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User not found
 */
router.put('/:empId', userController.updateUser);

/**
 * @swagger
 * /users/{email}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete('/:email', userController.deleteUser);

export default router

import { Router } from "express";
import * as usersController from "../controllers/users.controller";

export const usersRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: "Users"
 * /api/users/create:
 *   post:
 *     summary: Add an user to the database
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "User 1"
 *               email:
 *                 type: string
 *                 example: "user1@user.com"
 *               password:
 *                 type: string
 */
usersRouter.post("/create", usersController.createUser);

/**
 * @swagger
 * tags:
 *   - name: "Users"
 * /api/users/all:
 *   get:
 *     summary: Get all users details
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
usersRouter.get("/all", usersController.getAllUsers);

/**
 * @swagger
 * tags:
 *   - name: "Users"
 * /api/users/id/{id}:
 *   get:
 *     summary: Get user details by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
usersRouter.get("/id/:userId", usersController.getUserById);

/**
 * @swagger
 * tags:
 *   - name: "Users"
 * /api/users/update/{id}:
 *   put:
 *     summary: Update specified user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "User 1"
 *               email:
 *                 type: string
 *                 example: "user1@user.com"
 *               password:
 *                 type: string
 */
usersRouter.put("/update/:userId", usersController.updateUser);

/**
 * @swagger
 * tags:
 *   - name: "Users"
 * /api/users/delete/{id}:
 *   delete:
 *     summary: Delete specified user
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       204:
 *         description: Successful response
 */
usersRouter.delete("/delete/:userId", usersController.deleteUser);

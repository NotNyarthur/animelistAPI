import { Router } from "express";
import * as authController from "../controllers/auth.controller"

export const authRouter = Router()

/**
 * @swagger
 * tags:
 *   - name: "Auth"
 * /api/auth/signup:
 *   put:
 *     summary: Create a new user
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
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
authRouter.post("/signup", authController.signup)

/**
 * @swagger
 * tags:
 *   - name: "Auth"
 * /api/auth/login:
 *   put:
 *     summary: Login with an existent user
 *     tags: [Auth]
 *     security:
 *       - BearerAuth: []
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
 *               password:
 *                 type: string
 */
authRouter.post("/login", authController.login)
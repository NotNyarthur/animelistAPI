"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const usersController = __importStar(require("../controllers/users.controller"));
exports.usersRouter = (0, express_1.Router)();
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
exports.usersRouter.post("/create", usersController.createUser);
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
exports.usersRouter.get("/all", usersController.getAllUsers);
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
exports.usersRouter.get("/id/:userId", usersController.getUserById);
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
exports.usersRouter.put("/update/:userId", usersController.updateUser);
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
exports.usersRouter.delete("/delete/:userId", usersController.deleteUser);

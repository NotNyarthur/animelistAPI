"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
const zod_1 = require("zod");
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         username:
 *           type: string
 *           example: "User 1"
 *         email:
 *           type: string
 *           example: "user1@user.com"
 *         password:
 *           type: string
 */
exports.createUserSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.updateUserSchema = zod_1.z.object({
    username: zod_1.z.string().optional(),
    email: zod_1.z.string().email().optional(),
    password: zod_1.z.string().optional(),
});
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});

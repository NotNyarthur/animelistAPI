import { z } from "zod";

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
export const createUserSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password: z.string(),
});

export const updateUserSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
});

export const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

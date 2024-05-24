import { Router } from "express";
import * as studiosController from "../controllers/studios.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const studiosRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: "Studios"
 * /api/studios/create:
 *   post:
 *     summary: Add a studio to the database
 *     tags: [Studios]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Studio'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 */
studiosRouter.post("/create", studiosController.createStudio);

/**
 * @swagger
 * tags:
 *   - name: "Studios"
 * /api/studios/all:
 *   get:
 *     summary: Get all studios' details
 *     tags: [Studios]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Studio'
 * 
 */
studiosRouter.get("/all", studiosController.getAllStudios);

/**
 * @swagger
 * tags:
 *   - name: "Studios"
 * /api/studios/id/{id}:
 *   get:
 *     summary: Get studio details by id
 *     tags: [Studios]
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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     minimum: 1
 *                   name:
 *                     type: string
 *                   animes:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                           minimum: 1
 *                         name:
 *                           type: string
 */
studiosRouter.get("/id/:studioId", studiosController.getStudioById);

/**
 * @swagger
 * tags:
 *   - name: "Studios"
 * /api/studios/delete/{id}:
 *   delete:
 *     summary: Delete specified studio
 *     tags: [Studios]
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
studiosRouter.delete("/delete/:studioId", authMiddleware, studiosController.deleteStudio);

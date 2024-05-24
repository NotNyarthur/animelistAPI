import { Router } from "express";
import * as genresController from "../controllers/genres.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export const genresRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: "Genres"
 * /api/genres/create:
 *   post:
 *     summary: Add a genre to the database
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
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
genresRouter.post("/create", genresController.createGenre);

/**
 * @swagger
 * tags:
 *   - name: "Genres"
 * /api/genres/all:
 *   get:
 *     summary: Get all genres' details
 *     tags: [Genres]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Genre'
 * 
 */
genresRouter.get("/all", genresController.getAllGenres);

/**
 * @swagger
 * tags:
 *   - name: "Genres"
 * /api/genres/id/{id}:
 *   get:
 *     summary: Get genre details by id
 *     tags: [Genres]
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
genresRouter.get("/id/:genreId", genresController.getGenreById);

/**
 * @swagger
 * tags:
 *   - name: "Genres"
 * /api/genres/delete/{id}:
 *   delete:
 *     summary: Delete specified genre
 *     tags: [Genres]
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
genresRouter.delete("/delete/genreId", authMiddleware, genresController.deleteGenre);
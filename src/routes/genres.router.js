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
exports.genresRouter = void 0;
const express_1 = require("express");
const genresController = __importStar(require("../controllers/genres.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.genresRouter = (0, express_1.Router)();
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
exports.genresRouter.post("/create", genresController.createGenre);
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
exports.genresRouter.get("/all", genresController.getAllGenres);
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
exports.genresRouter.get("/id/:genreId", genresController.getGenreById);
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
exports.genresRouter.delete("/delete/genreId", auth_middleware_1.authMiddleware, genresController.deleteGenre);

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
exports.studiosRouter = void 0;
const express_1 = require("express");
const studiosController = __importStar(require("../controllers/studios.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
exports.studiosRouter = (0, express_1.Router)();
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
exports.studiosRouter.post("/create", studiosController.createStudio);
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
exports.studiosRouter.get("/all", studiosController.getAllStudios);
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
exports.studiosRouter.get("/id/:studioId", studiosController.getStudioById);
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
exports.studiosRouter.delete("/delete/:studioId", auth_middleware_1.authMiddleware, studiosController.deleteStudio);

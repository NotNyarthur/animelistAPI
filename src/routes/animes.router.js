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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animeRouter = void 0;
const express_1 = require("express");
const animesController = __importStar(require("../controllers/animes.controller"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const multer_1 = __importDefault(require("multer"));
exports.animeRouter = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   - name: "Anime"
 * /api/animes/create:
 *   post:
 *     summary: Add an anime to the database
 *     tags: [Anime]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Anime'
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               season:
 *                 type: string
 *               format:
 *                 type: string
 *                 enum: ["TV", "OVA", "ONA", "Movie", "Special"]
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               episodios:
 *                 type: integer
 *                 minimum: 1
 *               ep_duration:
 *                 type: integer
 *                 minimum: 1
 *               englishname:
 *                 type: string
 *               japanesename:
 *                 type: string
 *               picture:
 *                 type: string
 *               synopsis:
 *                 type: string
 *               studios:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     studioId:
 *                       type: integer
 *                       minimum: 1
 *               genres:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     genreId:
 *                       type: integer
 *                       minimum: 1
 */
exports.animeRouter.post("/create", animesController.createAnime);
/**
 * @swagger
 * tags:
 *   - name: "Anime"
 * /api/animes/all:
 *   get:
 *     summary: Get all anime's details
 *     tags: [Anime]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Anime'
 */
exports.animeRouter.get("/all", animesController.getAllAnime);
/**
 * @swagger
 * tags:
 *   - name: "Anime"
 * /api/animes/id/{id}:
 *   get:
 *     summary: Get anime details by id
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *     responses:
 *       200:
 *         description: Successful response
 */
exports.animeRouter.get("/id/:animeId", animesController.getAnimeById);
/**
 * @swagger
 * tags:
 *   - name: "Anime"
 * /api/animes/update/{id}:
 *   put:
 *     summary: Update specified anime
 *     tags: [Anime]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The anime ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               season:
 *                 type: string
 *               format:
 *                 type: string
 *                 enum: ["TV", "OVA", "ONA", "Movie", "Special"]
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *               episodios:
 *                 type: integer
 *                 minimum: 1
 *               ep_duration:
 *                 type: integer
 *                 minimum: 1
 *               englishname:
 *                 type: string
 *               japanesename:
 *                 type: string
 *               picture:
 *                 type: string
 *               synopsis:
 *                 type: string
 *               studios:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     studioId:
 *                       type: integer
 *                       minimum: 1
 *               genres:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     genreId:
 *                       type: integer
 *                       minimum: 1
 */
exports.animeRouter.put("/update/:animeId", auth_middleware_1.authMiddleware, animesController.updateAnime);
/**
 * @swagger
 * tags:
 *   - name: "Anime"
 * /api/animes/delete/{id}:
 *   delete:
 *     summary: Delete specified anime
 *     tags: [Anime]
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
exports.animeRouter.delete("/delete/:animeId", auth_middleware_1.authMiddleware, animesController.deleteAnime);
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
/**
 * @swagger
 * tags:
 *   - name: "Anime"
 * /api/animes/uploadPicture:
 *   post:
 *     summary: Uploads a picture to Cloudinary
 *     tags: [Anime]
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: Picture to upload
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       201:
 *         description: Picture uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 image:
 *                   type: string
 *       400:
 *         description: Picture is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: "Picture is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: string
 *                   example: "Error uploading picture"
 */
exports.animeRouter.post("/uploadPicture", upload.single("image"), animesController.uploadPicture);

import { Router } from "express";
import * as animesController from "../controllers/animes.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import multer from "multer";

export const animeRouter = Router();

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
animeRouter.post("/create", animesController.createAnime);

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
animeRouter.get("/all", animesController.getAllAnime);

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
animeRouter.get("/id/:animeId", animesController.getAnimeById);

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
animeRouter.put(
  "/update/:animeId",
  authMiddleware,
  animesController.updateAnime
);

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
animeRouter.delete(
  "/delete/:animeId",
  authMiddleware,
  animesController.deleteAnime
);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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
animeRouter.post(
  "/uploadPicture",
  upload.single("image"),
  animesController.uploadPicture
);

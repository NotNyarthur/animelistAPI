"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAnimeSchema = exports.CreateAnimeSchema = void 0;
const zod_1 = require("zod");
/**
 * @swagger
 * components:
 *   schemas:
 *     Anime:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Listeners"
 *         season:
 *           type: string
 *           example: "Primavera 2020"
 *         format:
 *           type: string
 *           enum: ["TV", "OVA", "ONA", "Movie", "Special"]
 *           example: "TV"
 *         start_date:
 *           type: string
 *           format: date
 *           example: "2020-04-04"
 *         end_date:
 *           type: string
 *           format: date
 *           example: "2020-06-20"
 *         episodios:
 *           type: integer
 *           example: 13
 *         ep_duration:
 *           type: integer
 *           example: 24
 *         englishname:
 *           type: string
 *           example: "Listeners"
 *         japanesename:
 *           type: string
 *           example: "LISTENERS リスナーズ"
 *         picture:
 *           type: string
 *           example: "https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/bx109856-zDYLvuF4Vuno.jpg"
 *         synopsis:
 *           type: string
 *           example: "La historia se desarrolla en un mundo..."
 *         genres:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Genre'
 *         studios:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Studio'
 *     Genre:
 *       type: object
 *       properties:
 *         genreId:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Action"
 *     Studio:
 *       type: object
 *       properties:
 *         studioId:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Studio Ghibli"
 */
exports.CreateAnimeSchema = zod_1.z.object({
    name: zod_1.z.string().trim(),
    season: zod_1.z.string(),
    format: zod_1.z.enum(["TV", "OVA", "ONA", "Movie", "Special"]),
    start_date: zod_1.z.string().date(),
    end_date: zod_1.z.string().date(),
    episodios: zod_1.z.number().min(1),
    ep_duration: zod_1.z.number().min(1),
    englishname: zod_1.z.string(),
    japanesename: zod_1.z.string(),
    picture: zod_1.z.string(),
    synopsis: zod_1.z.string(),
    studios: zod_1.z.array(zod_1.z.object({
        studioId: zod_1.z.number().positive().min(1),
    })),
    genres: zod_1.z.array(zod_1.z.object({
        genreId: zod_1.z.number().positive().min(1),
    })),
});
exports.UpdateAnimeSchema = zod_1.z.object({
    name: zod_1.z.string().trim().optional(),
    season: zod_1.z.string().optional(),
    format: zod_1.z.enum(["TV", "OVA", "ONA", "Movie", "Special"]).optional(),
    start_date: zod_1.z.string().date().optional(),
    end_date: zod_1.z.string().date().optional(),
    episodios: zod_1.z.number().min(1).optional(),
    ep_duration: zod_1.z.number().min(1).optional(),
    englishname: zod_1.z.string().optional(),
    japanesename: zod_1.z.string().optional(),
    picture: zod_1.z.string().optional(),
    synopsis: zod_1.z.string().optional(),
    studios: zod_1.z
        .array(zod_1.z.object({
        studioId: zod_1.z.number().positive().min(1),
    }))
        .optional(),
    genres: zod_1.z
        .array(zod_1.z.object({
        genreId: zod_1.z.number().positive().min(1),
    }))
        .optional(),
});

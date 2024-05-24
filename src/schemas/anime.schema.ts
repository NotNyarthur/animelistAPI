import { z } from "zod";

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
export const CreateAnimeSchema = z.object({
  name: z.string().trim(),
  season: z.string(),
  format: z.enum(["TV", "OVA", "ONA", "Movie", "Special"]),
  start_date: z.string().date(),
  end_date: z.string().date(),
  episodios: z.number().min(1),
  ep_duration: z.number().min(1),
  englishname: z.string(),
  japanesename: z.string(),
  picture: z.string(),
  synopsis: z.string(),
  studios: z.array(
    z.object({
      studioId: z.number().positive().min(1),
    })
  ),
  genres: z.array(
    z.object({
      genreId: z.number().positive().min(1),
    })
  ),
});

export const UpdateAnimeSchema = z.object({
  name: z.string().trim().optional(),
  season: z.string().optional(),
  format: z.enum(["TV", "OVA", "ONA", "Movie", "Special"]).optional(),
  start_date: z.string().date().optional(),
  end_date: z.string().date().optional(),
  episodios: z.number().min(1).optional(),
  ep_duration: z.number().min(1).optional(),
  englishname: z.string().optional(),
  japanesename: z.string().optional(),
  picture: z.string().optional(),
  synopsis: z.string().optional(),
  studios: z
    .array(
      z.object({
        studioId: z.number().positive().min(1),
      })
    )
    .optional(),
  genres: z
    .array(
      z.object({
        genreId: z.number().positive().min(1),
      })
    )
    .optional(),
});

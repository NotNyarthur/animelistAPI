import { Request, Response } from "express";
import { CreateAnimeSchema, UpdateAnimeSchema } from "../schemas/anime.schema";
import { ZodError, z } from "zod";
import { prisma } from "../config/prisma";
import streamifier from "streamifier";
import { cloudinary } from "../config/cloudinary";

export const getAllAnime = async (_req: Request, res: Response) => {
  try {
    const animes = await prisma.anime.findMany({
      select: {
        id: true,
        name: true,
        season: true,
        start_date: true,
        end_date: true,
        format: true,
        episodios: true,
        ep_duration: true,
        englishname: true,
        picture: true,
        synopsis: true,
        japanesename: true,
        studios: {
          select: {
            studio: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        genres: {
          select: {
            genre: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return res.status(200).json(animes);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};

export const createAnime = async (_req: Request, res: Response) => {
  try {
    const { body } = _req;

    const validatedBody = CreateAnimeSchema.parse(body);

    await Promise.all(
      validatedBody.studios.map(async (studio) => {
        const existingStudio = await prisma.studio.findUnique({
          where: {
            id: studio.studioId,
          },
        });
        if (!existingStudio) {
          throw new Error(`Studio ${studio.studioId} not found`);
        }
      })
    );

    await Promise.all(
      validatedBody.genres.map(async (genre) => {
        const existingGenre = await prisma.genre.findUnique({
          where: {
            id: genre.genreId,
          },
        });
        if (!existingGenre) {
          throw new Error(`Genre ${genre.genreId} not found`);
        }
      })
    );

    const date = z.string().date();
    validatedBody.start_date = date.parse(validatedBody.start_date);
    validatedBody.end_date = date.parse(validatedBody.end_date);

    const anime = await prisma.anime.create({
      data: {
        ...validatedBody,
        studios: {
          create: validatedBody.studios.map((studio) => ({
            studio: { connect: { id: studio.studioId } },
          })),
        },
        genres: {
          create: validatedBody.genres.map((genre) => ({
            genre: { connect: { id: genre.genreId } },
          })),
        },
      },
      include: {
        studios: true,
        genres: true,
      },
    });
    return res.status(201).json(anime);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.issues,
      });
    }

    if (error instanceof Error) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};

export const getAnimeById = async (_req: Request, res: Response) => {
  try {
    const animeId: string = _req.params.animeId;

    const anime = await prisma.anime.findUnique({
      where: {
        id: parseInt(animeId),
      },
      select: {
        id: true,
        name: true,
        season: true,
        start_date: true,
        end_date: true,
        format: true,
        episodios: true,
        ep_duration: true,
        englishname: true,
        picture: true,
        synopsis: true,
        japanesename: true,
        studios: {
          select: {
            studio: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        genres: {
          select: {
            genre: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!anime) {
      throw new Error("Anime not found");
    }

    return res.status(200).json(anime);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};

export const updateAnime = async (_req: Request, res: Response) => {
  try {
    const animeId: string = _req.params.animeId;

    const { body } = _req;
    const validatedBody = UpdateAnimeSchema.parse(body);

    const anime = await prisma.anime.findUnique({
      where: {
        id: parseInt(animeId),
      },
    });

    if (!anime) {
      throw new Error("Anime not found");
    }

    const { studios, genres, ...animeData } = validatedBody;

    const updatedAnime = await prisma.anime.update({
      where: { id: parseInt(animeId) },
      data: {
        ...animeData,
        studios: studios
          ? {
              deleteMany: {},
              create: studios.map((studio) => ({
                studio: { connect: { id: studio.studioId } },
              })),
            }
          : undefined,
        genres: genres
          ? {
              deleteMany: {},
              create: genres.map((genre) => ({
                genre: { connect: { id: genre.genreId } },
              })),
            }
          : undefined,
      },
    });

    return res.status(200).json(updatedAnime);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        errors: error.issues,
      });
    }

    if (error instanceof Error) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};

export const deleteAnime = async (_req: Request, res: Response) => {
  try {
    const animeId: string = _req.params.animeId;

    const anime = await prisma.anime.findUnique({
      where: {
        id: parseInt(animeId),
      },
    });

    if (!anime) {
      throw new Error("Anime not found");
    }

    await prisma.anime.delete({
      where: {
        id: parseInt(animeId),
      },
    });

    return res.status(204).json({
      message: "Anime deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};

export const uploadPicture = async (_req: Request, res: Response) => {
  try {
    const { file } = _req;
    if (!file) {
      throw new Error("Picture is required");
    }

    const uploadStream = (fileBuffer: Buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "animelist",
          },
          (error, result) => {
            if (error) {
              reject(new Error("Error uploading picture"));
            } else {
              resolve(result);
            }
          }
        );
        streamifier.createReadStream(fileBuffer).pipe(stream);
      });
    };

    const result: any = await uploadStream(file.buffer);
    return res.status(201).json({
      picture: result.secure_url,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};

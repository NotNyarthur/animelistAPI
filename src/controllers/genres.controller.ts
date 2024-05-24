import { Request, Response } from "express";
import { createGenreSchema } from "../schemas/genre.schema";
import { ZodError } from "zod";
import { prisma } from "../config/prisma";

export const getAllGenres = async (_req: Request, res: Response) => {
  try {
    const genres = await prisma.genre.findMany();

    return res.status(200).json(genres);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};

export const createGenre = async (_req: Request, res: Response) => {
  try {
    const { body } = _req;

    const validatedBody = createGenreSchema.parse(body);

    const genre = await prisma.genre.findFirst({
      where: {
        name: validatedBody.name,
      },
    });

    if (genre) {
      throw new Error("Genre already exists");
    }

    const newGenre = await prisma.genre.create({
      data: validatedBody,
    });

    return res.status(201).json(newGenre);
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

export const getGenreById = async (_req: Request, res: Response) => {
  try {
    const genreId: string = _req.params.genreId;

    const genre = await prisma.genre.findUnique({
      where: {
        id: parseInt(genreId),
      },
      include: {
        anime: {
          select: {
            anime: {
              select: {
                id: true,
                name: true,
                episodios: true,
              },
            },
          },
        },
      },
    });

    if (!genre) {
      throw new Error("Genre not found");
    }

    return res.status(200).json(genre);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};

export const deleteGenre = async (_req: Request, res: Response) => {
  try {
    const genreId: string = _req.params.genreId;

    const genre = await prisma.genre.findUnique({
      where: {
        id: parseInt(genreId),
      },
    });

    if (!genre) {
      throw new Error("Genre not found");
    }

    await prisma.genre.delete({
      where: {
        id: parseInt(genreId),
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

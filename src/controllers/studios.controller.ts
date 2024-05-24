import { Request, Response } from "express";
import { createStudioSchema } from "../schemas/studio.schema";
import { ZodError } from "zod";
import { prisma } from "../config/prisma";

export const getAllStudios = async (_req: Request, res: Response) => {
  try {
    const studios = await prisma.studio.findMany();

    return res.status(200).json(studios);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};

export const createStudio = async (_req: Request, res: Response) => {
  try {
    const { body } = _req;

    const validatedBody = createStudioSchema.parse(body);

    const studio = await prisma.studio.findFirst({
      where: {
        name: validatedBody.name,
      },
    });

    if (studio) {
      throw new Error("Studio already exists");
    }

    const newStudio = await prisma.studio.create({
      data: validatedBody,
    });

    return res.status(201).json(newStudio);
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

export const getStudioById = async (_req: Request, res: Response) => {
  try {
    const studioId: string = _req.params.studioId;

    const studio = await prisma.studio.findUnique({
      where: {
        id: parseInt(studioId),
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

    if (!studio) {
      throw new Error("Studio not found");
    }

    return res.status(200).json(studio);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};

export const deleteStudio = async (_req: Request, res: Response) => {
  try {
    const studioId: string = _req.params.studioId;

    const studio = await prisma.studio.findUnique({
      where: {
        id: parseInt(studioId),
      },
    });

    if (!studio) {
      throw new Error("Studio not found");
    }

    await prisma.studio.delete({
      where: {
        id: parseInt(studioId),
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

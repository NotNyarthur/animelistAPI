import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { createUserSchema, updateUserSchema } from "../schemas/user.schema";
import { ZodError } from "zod";
import bcrypt from "bcrypt";

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    return res.status(200).json(users);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};

export const createUser = async (_req: Request, res: Response) => {
  try {
    const { body } = _req;
    const validatedBody = createUserSchema.parse(body);

    const user = await prisma.user.findFirst({
      where: {
        email: validatedBody.email,
      },
    });

    if (user) {
      throw new Error("Username already exists");
    }

    validatedBody.password = await bcrypt.hash(validatedBody.password, 10);

    const newUser = await prisma.user.create({
      data: validatedBody,
    });

    const { password, ...userData } = newUser;

    return res.status(201).json(userData);
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

export const getUserById = async (_req: Request, res: Response) => {
  try {
    const userId: string = _req.params.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
      select: {
        id: true,
        username: true,
      },
    });

    if (!user) {
      throw new Error("Username not found");
    }

    return res.status(200).json(user);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};

export const updateUser = async (_req: Request, res: Response) => {
  try {
    const userId: string = _req.params.userId;
    const { body } = _req;
    const validatedBody = updateUserSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    if (validatedBody.password) {
      validatedBody.password = await bcrypt.hash(validatedBody.password, 10);
    }

    let updatedUser = await prisma.user.update({
      where: {
        id: parseInt(userId),
      },
      data: validatedBody,
    });

    const { password, ...userData } = updatedUser;

    return res.status(200).json(userData);
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

export const deleteUser = async (_req: Request, res: Response) => {
  try {
    const userId: string = _req.params.userId;

    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(userId),
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    await prisma.user.delete({
      where: {
        id: parseInt(userId),
      },
    });

    return res.status(204).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({
        errors: error.message,
      });
    }
  }
};

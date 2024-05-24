import { Request, Response } from "express";
import { prisma } from "../config/prisma";
import { createUserSchema, loginSchema } from "../schemas/user.schema";
import bcrypt from "bcrypt";
import { IPayload } from "../types";
import jwt from "jsonwebtoken";
import { ZodError } from "zod";

export const signup = async (_req: Request, res: Response) => {
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

    const payload: IPayload = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    };

    const secretkey = process.env.SECRET_KEY;

    if (!secretkey) {
      throw new Error("Secret key not found");
    }

    const accessToken = jwt.sign(payload, secretkey, { expiresIn: "7d" });
    return res.status(201).json({
      access_token: accessToken,
    });
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

export const login = async (_req: Request, res: Response) => {
  try {
    const { body } = _req;
    const validatedBody = loginSchema.parse(body);

    const user = await prisma.user.findFirst({
      where: {
        username: validatedBody.username,
      },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const validPass = bcrypt.compare(validatedBody.password, user.password);

    if (!validPass) {
      throw new Error("Invalid credentials");
    }

    const payload: IPayload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const secretkey = process.env.SECRET_KEY;

    if (!secretkey) {
      throw new Error("Secret key not found");
    }

    const accessToken = jwt.sign(payload, secretkey, { expiresIn: "7d" });
    return res.status(200).json({
      access_token: accessToken,
    });
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

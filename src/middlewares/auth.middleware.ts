import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ errors: "Unauthorized" });
    }
    const token = authorization.split(" ")[1];

    const secretkey = process.env.SECRET_KEY;

    if (!secretkey) {
        throw new Error("Secret key not found");
      }

    jwt.verify(token, secretkey as jwt.Secret);

    return next();
  } catch (error) {
    return res.status(401).json({ errors: "Unauthorized" });
  }
};

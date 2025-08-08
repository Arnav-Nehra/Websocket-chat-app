import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

export interface AuthInterface extends Request {
  userId?: string;
}
const tokenSchema = z.object({
  userId: z.string(),
});

export default function middleware(
  req: AuthInterface,
  res: Response,
  next: NextFunction,
) {
  try {
    const token = req.headers.authorization ?? " ";
    const decoded = jwt.verify(token, "arnavsecret");
    const parseDecoded = tokenSchema.parse(decoded);

    if (parseDecoded.userId) {
      req.userId = parseDecoded.userId;
      next();
    } else {
      return res.status(403).json({ message: "user not authorized" });
    }
  } catch (err) {
    console.log(err);
    res.json("invalid or expired token");
  }
}

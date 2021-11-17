import { verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { User } from "@prisma/client";
import { MyRequest } from "../types/MyRequestTypes";
import { SECRET_KEY } from "../helpers/config";

export const isAuthenticated = async (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.get("Authorization")?.split(" ")[1] || "";
  try {
    const { id } = (await verify(token, SECRET_KEY)) as User & {
      exp: number;
    };
    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).json("Not Authenticated");
  }
};

import { verify } from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { User } from "@prisma/client";
import { MyRequest } from "../types/MyRequestTypes";
import config from "../helpers/config";

export const isAuthenticated = async (
  req: MyRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.get("Authorization")?.split(" ")[1] || "";
  try {
    const decoded = await verify(token, config.SECRET_KEY);
    req.userId = (decoded as User).id;
    next();
  } catch (error) {
    res.status(401).json("Not Authenticated");
  }
};

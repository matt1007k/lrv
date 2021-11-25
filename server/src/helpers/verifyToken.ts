import { User } from "@prisma/client";
import { verify } from "jsonwebtoken";
import { Request } from "express";
import { SECRET_KEY } from "./config";

export const verifyToken = async (req: Request) => {
  const token = req.get("Authorization")?.split(" ")[1] || "";
  try {
    const { id } = (await verify(token, SECRET_KEY)) as User & {
      exp: number;
    };
    return id;
  } catch (error) {
    return null;
  }
};

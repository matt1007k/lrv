import { Request, Response } from "express";
import { STORAGE_URL } from "../helpers/config";

export const upload = async (req: Request, res: Response) => {
  const filePath = `${STORAGE_URL}${req.file?.filename}`;
  res.status(200).json({ filePath });
};

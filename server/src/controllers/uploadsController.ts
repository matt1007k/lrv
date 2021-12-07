import { Request, Response } from "express";
import fs from "fs-extra";
import path from "path";

import { STORAGE_URL } from "../helpers/config";
import { uploadMessage } from "../validators/messagesValidation";

export const upload = async (req: Request, res: Response) => {
  const filePath = `storage/${req.file?.filename}`;
  const fullPath = `${STORAGE_URL}${req.file?.filename}`;
  res.status(200).json({ filePath, fullPath });
};
export const deleteFile = async (req: Request, res: Response) => {
  const filePath = req.body.path;
  const pathLocal = path.resolve(`src/${filePath}`);
  try {
    if (fs.existsSync(pathLocal)) {
      await fs.unlink(pathLocal);
      res.status(200).json({ message: uploadMessage.wasRemoved });
    } else res.status(404).json({ message: uploadMessage.notFound });
  } catch (error) {}
};

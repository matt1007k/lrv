import { Request, Response, NextFunction } from "express";
import { MAX_FILE_SIZE } from "../helpers/multer";

const IsInvalidUploadFile = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === "LIMIT_FILE_TYPES") {
    res.status(422).json({ error: "El archivo no es una imagen." });
    return;
  }
  if (error.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({
      error: `La archivo es muy grande, el tamaño máximo permitido: ${
        MAX_FILE_SIZE / 1000
      }Kb`,
    });
    return;
  }
  next();
};

export default IsInvalidUploadFile;

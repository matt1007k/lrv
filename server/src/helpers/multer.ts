import { Request } from "express";
import multer from "multer";

export const MAX_FILE_SIZE = 1024 * 1024 * 1;

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/storage");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Error en el tipo de archivo");
    error.name = "LIMIT_FILE_TYPES";
    return cb(error, false);
  }

  cb(null, true);
};

const uploadMulter = multer({
  storage: fileStorageEngine,
  limits: {
    fieldSize: MAX_FILE_SIZE,
  },
  fileFilter,
});

export default uploadMulter;

import multer from "multer";
import { NextFunction, Router } from "express";
import { upload } from "../controllers/uploadsController";
import path from "path";

const router = Router();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./src/storage");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, Date.now() + "-" + fileName);
  },
});

const uploadMulter = multer({
  storage: fileStorageEngine,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
  //   fileFilter: (req, file, cb) => {
  // if (
  //   file.mimetype == "image/png" ||
  //   file.mimetype == "image/jpg" ||
  //   file.mimetype == "image/jpeg"
  // ) {
  //   cb(null, true);
  // } else {
  //   cb(null, false);
  //   cb(new Error("Las extensiones permitidas son .png, .jpg y .jpeg"));
  // }
  //   },
});

router.post("/", uploadMulter.single("file"), upload);

export default router;

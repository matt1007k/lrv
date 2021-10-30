import { Router } from "express";
import { deleteFile, upload } from "../controllers/uploadsController";
import uploadMulter from "../helpers/multer";

const router = Router();

router.post("/", uploadMulter.single("file"), upload);
router.delete("/", deleteFile);

export default router;

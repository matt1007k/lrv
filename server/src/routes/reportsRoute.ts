import { Router } from "express";
import { reportClaimsPDF } from "../controllers/reportsController";

const router = Router();
router.get("/claims-pdf", reportClaimsPDF);

export default router;

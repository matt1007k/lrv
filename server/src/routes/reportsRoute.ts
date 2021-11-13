import { Router } from "express";
import {
  reportClaimsExcel,
  reportClaimsPDF,
} from "../controllers/reportsController";

const router = Router();
router.get("/claims-pdf", reportClaimsPDF);
router.get("/claims-excel", reportClaimsExcel);

export default router;

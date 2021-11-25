import { Router } from "express";
import {
  changeStatus,
  create,
  detail,
  detailCount,
  getAll,
} from "../controllers/claimsController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import checkForErrors from "../middlewares/checkForErrors";
import { claimValidator } from "../validators/claimValidator";

const route = Router();

route.get("", isAuthenticated, getAll);
route.get("/detail/:trackingCode", detail);
route.get("/detail-count", isAuthenticated, detailCount);
route.post("", claimValidator, checkForErrors, create);
route.post("/change-status/:trackingCode", changeStatus);

export default route;

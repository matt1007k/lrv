import { Router } from "express";
import {
  create,
  detail,
  detailCount,
  getAll,
} from "../controllers/claimsController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import checkForErrors from "../validators/checkForErrors";
import { claimValidator } from "../validators/claimValidator";

const route = Router();

route.get("", isAuthenticated, getAll);
route.get("/detail/:id", detail);
route.get("/detail-count", detailCount);
route.post("", claimValidator, checkForErrors, create);

export default route;

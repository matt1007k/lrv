import { Router } from "express";
import { create, detailCount, getAll } from "../controllers/claimsController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import checkForErrors from "../validators/checkForErrors";
import { claimValidator } from "../validators/claimValidator";

const route = Router();

route.get("", getAll);
route.get("/detail-count", detailCount);
route.post("", claimValidator, checkForErrors, create);

export default route;

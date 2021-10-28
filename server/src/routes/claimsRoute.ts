import { Router } from "express";
import { create, getAll } from "../controllers/claimsController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import checkForErrors from "../validators/checkForErrors";
import { claimValidator } from "../validators/claimValidator";

const route = Router();

route.get("", getAll);
route.post("", claimValidator, checkForErrors, create);

export default route;

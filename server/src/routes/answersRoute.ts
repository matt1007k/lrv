import { Router } from "express";
import {
  create,
  getAll,
  getAllByClaim,
} from "../controllers/answersController";
import checkForErrors from "../middlewares/checkForErrors";
import { answerValidator } from "../validators/answerValidator";

const route = Router();

route.get("/", getAll);
route.post("/", answerValidator, checkForErrors, create);
route.get("/:claimId", getAllByClaim);

export default route;

import { Router } from "express";
import {
  changeInfo,
  changePassword,
  detail,
  logIn,
  register,
  forgotPassword,
  changeResetPassword,
} from "../controllers/usersController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import checkForErrors from "../middlewares/checkForErrors";
import {
  userInfoValidator,
  userLoginValidator,
} from "../validators/userValidator";

const router = Router();

router.post("/register", [...userInfoValidator, checkForErrors], register);
router.post("/login", [...userLoginValidator, checkForErrors], logIn);
router.post("/update-password", isAuthenticated, changePassword);
router.post(
  "/update-info",
  isAuthenticated,
  userInfoValidator,
  checkForErrors,
  changeInfo
);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", changeResetPassword);

router.get("/detail/:email?", isAuthenticated, detail);

export default router;

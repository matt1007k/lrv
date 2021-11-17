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
import checkForErrors from "../validators/checkForErrors";
import { userInfoValidator } from "../validators/userValidator";

const router = Router();

router.post("/register", checkForErrors, userInfoValidator, register);
router.post("/login", logIn);
router.post("/update-password", isAuthenticated, changePassword);
router.post(
  "/update-info",
  isAuthenticated,
  checkForErrors,
  userInfoValidator,
  changeInfo
);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", changeResetPassword);

router.get("/detail/:email?", detail);

export default router;

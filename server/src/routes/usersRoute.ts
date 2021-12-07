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
  userChangePasswordValidator,
  userForgotPasswordValidator,
  userInfoValidator,
  userLoginValidator,
  userRegisterValidator,
} from "../validators/userValidator";

const router = Router();

router.post("/register", [...userRegisterValidator, checkForErrors], register);
router.post("/login", [...userLoginValidator, checkForErrors], logIn);
router.post(
  "/update-password",
  isAuthenticated,
  userChangePasswordValidator,
  checkForErrors,
  changePassword
);
router.post(
  "/update-info",
  isAuthenticated,
  userInfoValidator,
  checkForErrors,
  changeInfo
);
router.post(
  "/forgot-password",
  [...userForgotPasswordValidator, checkForErrors],
  forgotPassword
);
router.post("/reset-password", changeResetPassword);

router.get("/detail/:email?", isAuthenticated, detail);

export default router;

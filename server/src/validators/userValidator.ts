import { body } from "express-validator";
import { userErrors } from "./messagesValidation";

export const userInfoValidator = [
  body("email")
    .isLength({ min: 1 })
    .withMessage(userErrors.email.required)
    .isString()
    .withMessage(userErrors.email.required)
    .isEmail()
    .withMessage(userErrors.email.isEmail),

  body("name")
    .isLength({ min: 1 })
    .withMessage(userErrors.name.required)
    .isString()
    .withMessage(userErrors.name.required),
];

export const userForgotPasswordValidator = [
  body("email")
    .isLength({ min: 1 })
    .withMessage(userErrors.email.required)
    .isString()
    .withMessage(userErrors.email.required)
    .isEmail()
    .withMessage(userErrors.email.isEmail),
];

export const userLoginValidator = [
  body("email")
    .isLength({ min: 1 })
    .withMessage(userErrors.email.required)
    .isString()
    .withMessage(userErrors.email.required)
    .isEmail()
    .withMessage(userErrors.email.isEmail),
  body("password")
    .isLength({ min: 1 })
    .withMessage(userErrors.password.required)
    .isString()
    .withMessage(userErrors.password.required),
];

export const userRegisterValidator = [
  body("name")
    .isLength({ min: 1 })
    .withMessage(userErrors.name.required)
    .isString()
    .withMessage(userErrors.name.required),
  body("email")
    .isLength({ min: 1 })
    .withMessage(userErrors.email.required)
    .isString()
    .withMessage(userErrors.email.required)
    .isEmail()
    .withMessage(userErrors.email.isEmail),
  body("password")
    .isLength({ min: 1 })
    .withMessage(userErrors.password.required)
    .isString()
    .withMessage(userErrors.password.required),
  body("confirmPassword")
    .isLength({ min: 1 })
    .withMessage(userErrors.confirmPassword.required)
    .isString()
    .withMessage(userErrors.confirmPassword.required),
];

export const userChangePasswordValidator = [
  body("currentPassword")
    .isLength({ min: 1 })
    .withMessage(userErrors.password.required)
    .isString()
    .withMessage(userErrors.password.required),
  body("newPassword")
    .isLength({ min: 1 })
    .withMessage(userErrors.newPassword.required)
    .isString()
    .withMessage(userErrors.newPassword.required),
  body("confirmPassword")
    .isLength({ min: 1 })
    .withMessage(userErrors.confirmPassword.required)
    .isString()
    .withMessage(userErrors.confirmPassword.required),
];

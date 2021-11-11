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
  body("name")
    .isLength({ min: 1 })
    .withMessage(userErrors.email.required)
    .isString()
    .withMessage(userErrors.email.required)
    .isEmail()
    .withMessage(userErrors.email.isEmail),
];

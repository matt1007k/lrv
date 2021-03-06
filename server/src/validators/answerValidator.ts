import { body } from "express-validator";
import { answerErrors } from "./messagesValidation";

export const answerValidator = [
  body("text")
    .isLength({ min: 1 })
    .withMessage(answerErrors.text.required)
    .isString()
    .withMessage(answerErrors.text.required),
  body("trackingCode")
    .isLength({ min: 1 })
    .withMessage(answerErrors.trackingCode.required)
    .isString()
    .withMessage(answerErrors.trackingCode.required),
];

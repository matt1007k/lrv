import { body } from "express-validator";
import { claimErrors } from "./messagesValidation";

export const claimValidator = [
  body("fullName")
    .isLength({ min: 1 })
    .withMessage(claimErrors.fullName.required),
  body("email")
    .isLength({ min: 1 })
    .withMessage(claimErrors.email.required)
    .isEmail()
    .withMessage(claimErrors.email.isEmail),
  body("address")
    .isLength({ min: 1 })
    .withMessage(claimErrors.address.required),
  body("department")
    .isLength({ min: 1 })
    .withMessage(claimErrors.department.required),
  body("province")
    .isLength({ min: 1 })
    .withMessage(claimErrors.province.required),
  body("district")
    .isLength({ min: 1 })
    .withMessage(claimErrors.district.required),
  body("phone").isLength({ min: 1 }).withMessage(claimErrors.phone.required),
  body("type").isLength({ min: 1 }).withMessage(claimErrors.type.required),
  body("detail").isLength({ min: 1 }).withMessage(claimErrors.detail.required),
  body("order").isLength({ min: 1 }).withMessage(claimErrors.order.required),
];

import { body } from "express-validator";
import { claimErrors } from "./messagesValidation";

export const claimValidator = [
  body("fullName")
    .isLength({ min: 1, max: 191 })
    .withMessage(claimErrors.fullName.required)
    .isString()
    .withMessage(claimErrors.fullName.required),
  body("email")
    .isLength({ min: 1 })
    .withMessage(claimErrors.email.required)
    .isString()
    .withMessage(claimErrors.email.required)
    .isEmail()
    .withMessage(claimErrors.email.isEmail),
  body("address")
    .isLength({ min: 1 })
    .withMessage(claimErrors.address.required)
    .isString()
    .withMessage(claimErrors.address.required),
  body("reference")
    .isLength({ min: 1 })
    .withMessage(claimErrors.reference.required)
    .isString()
    .withMessage(claimErrors.reference.required),
  body("department")
    .isLength({ min: 1 })
    .withMessage(claimErrors.department.required)
    .isString()
    .withMessage(claimErrors.department.required),
  body("province")
    .isLength({ min: 1 })
    .withMessage(claimErrors.province.required)
    .isString()
    .withMessage(claimErrors.province.required),
  body("district")
    .isLength({ min: 1 })
    .withMessage(claimErrors.district.required)
    .isString()
    .withMessage(claimErrors.district.required),
  body("phone")
    .isLength({ min: 1 })
    .withMessage(claimErrors.phone.required)
    .isNumeric()
    .withMessage(claimErrors.phone.isNumeric)
    .isMobilePhone("es-PE")
    .withMessage(claimErrors.phone.isPhone),
  body("type").isLength({ min: 1 }).withMessage(claimErrors.type.required),
  body("detail")
    .isLength({ min: 1 })
    .withMessage(claimErrors.detail.required)
    .isString()
    .withMessage(claimErrors.detail.required),
  body("order")
    .isLength({ min: 1 })
    .withMessage(claimErrors.order.required)
    .isString()
    .withMessage(claimErrors.order.required),
];

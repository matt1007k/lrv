import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const simpleValidationResult = validationResult.withDefaults({
  formatter: (error) => error.msg,
});

const checkForErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = simpleValidationResult(req);

  if (!errors.isEmpty())
    return res.status(422).json({ errors: errors.mapped() });

  next();
};

export default checkForErrors;

import { Request, Response, NextFunction } from "express";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404);
  const error = new Error("Not Found");
  next(error);
};

export const errorHandler = (error: any, req: Request, res: Response) => {
  res.status(req.statusCode || 500);
  res.json({
    message: error.message,
  });
};

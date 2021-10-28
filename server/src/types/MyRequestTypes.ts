import { Request } from "express";

export interface MyRequest extends Request {
  userId?: number;
}

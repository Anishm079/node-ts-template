import { Request, Response, NextFunction } from "express";
import logger from "../config/logger.config";

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Your code logic here
  } catch (error: any) {
    logger.error(error?.message, { stack: error?.stack });
    if (typeof next === "function") {
      return next(new Error("Internal Server Error"));
    } else {
      logger.error("The 'next' middleware function is not available.");
      throw new Error("Internal Server Error");
    }
  }
};

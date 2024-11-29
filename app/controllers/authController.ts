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
    // Log the error message along with the stack trace for better debugging
    logger.error(error?.message, { stack: error?.stack });

    // Ensure the 'next' middleware function is available before calling it
    if (typeof next === "function") {
      return next(new Error("Internal Server Error"));
    } else {
      // Handle the case where 'next' is not a function
      logger.error("The 'next' middleware function is not available.");
      throw new Error("Internal Server Error");
    }
  }
};

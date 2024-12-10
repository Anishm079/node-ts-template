import mongoose from "mongoose";
import logger from "./logger.config";
import { MONGO_CONNECTION_STRING } from "../constants";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_CONNECTION_STRING as string);
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error: any) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info(`MongoDB disconnected!`);
  } catch (error: any) {
    logger.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export { connectDB , disconnectDB };

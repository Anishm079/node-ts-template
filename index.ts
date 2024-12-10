import http from "http";
import app from "./app/app";
import { connectDB, disconnectDB } from "./app/config/mongodb.config";
import logger from "./app/config/logger.config";
import { PORT } from "./app/constants";
import { createWorkerProcesses } from "./app/config/workers.config";

const server = http.createServer(app);

const exitHandler = (err?: Error): void => {
  logger.info(err);
  process.exit(1);
};

const unexpectedErrorHandler = (err: Error): void => {
  exitHandler(err);
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGINT", (): void => {
  disconnectDB();
  process.exit(0);
});

(async () => {
  // Connect to the database
  try {
    await connectDB();
    logger.info("Database connected successfully");

    // Start the server
    function startServer() {
      server.listen(PORT, () => {
        logger.info(`App is running on PORT: ${PORT}`);
      });
    }

    // Create worker threads
    if (require.main === module) {
      createWorkerProcesses(1, startServer); // 1 worker thread will be created
    }
  } catch (error) {
    logger.error("Failed to connect to the database", error);
    process.exit(1); // Exit the process with failure
  }
})();

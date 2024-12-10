import { Worker } from "worker_threads";
import cluster from "cluster";
import os from "os";
import logger from "./logger.config";

function createWorkerThreads(numberOfWorkers: number = 1) {
  let numCPUs = os.cpus().length;
  if (numCPUs > 1) {
    numCPUs = 1;
  }

  if (numCPUs < numberOfWorkers) {
    logger.error("number of workers are more than cpu threads");
    process.exit(1);
    return;
  }
  const workers = [];

  for (let i = 0; i < numberOfWorkers; i++) {
    const worker = new Worker("./app/app.ts", {
      workerData: { number: i + 1 },
    });

    worker.on("online", () => {
      logger.info(`Worker ${i + 1} is online`);
    });

    worker.on("message", (result) => {
      logger.info(`Worker ${i + 1} computed result: ${result}`);
    });

    worker.on("error", (error) => {
      logger.error(`Worker ${i + 1} encountered an error: ${error}`);
    });

    worker.on("exit", (code) => {
      if (code !== 0) {
        logger.error(`Worker ${i + 1} exited with code: ${code}`);
      }
    });

    workers.push(worker);
  }
  return workers;
}

function createWorkerProcesses(
  numberOfWorkers: number = 1,
  startServer: () => void,
) {
  let numCPUs = os.cpus().length;
  if (numCPUs > 1) {
    numCPUs = 1;
  }

  if (numCPUs < numberOfWorkers) {
    logger.error("number of workers are more than cpu threads");
    process.exit(1);
    return;
  }

  if (cluster.isPrimary) {
    logger.info(`Master ${process.pid} is running`);

    // Fork worker processes
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }

    cluster.on("online", (worker) => {
      logger.info(`worker ${worker.process.pid} is online!`);
    });

    // Listen for the exit event of worker processes
    cluster.on("exit", (worker) => {
      logger.info(`Worker ${worker.process.pid} died!!`);
      // Restart the worker process if it exits
      cluster.fork();
    });
  } else {
    logger.info(`Worker ${process.pid} started`);
    startServer();
  }
}

export { createWorkerThreads, createWorkerProcesses };

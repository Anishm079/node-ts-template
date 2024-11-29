import fs from 'fs';
import path from 'path';
import pino, { Logger, LoggerOptions } from 'pino';

const baseDir = path.join(__dirname, '../../logs');
const errorDir = path.join(baseDir, 'error');
const infoDir = path.join(baseDir, 'info');
const debugDir = path.join(baseDir, 'debug');
const fatalDir = path.join(baseDir, 'fatal');
const silentDir = path.join(baseDir, 'silent');
const warnDir = path.join(baseDir, 'warn');
const traceDir = path.join(baseDir, 'trace');
// Add more directories as needed for other log levels

// Function to create directory if it doesn't exist
const createDirIfNotExists = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Create necessary directories
createDirIfNotExists(baseDir);
createDirIfNotExists(errorDir);
createDirIfNotExists(infoDir);
createDirIfNotExists(debugDir);
createDirIfNotExists(fatalDir);
createDirIfNotExists(silentDir);
createDirIfNotExists(warnDir);
createDirIfNotExists(traceDir);

const loggerOptions: LoggerOptions = {
  level: 'info', // Log level
  timestamp: true,
  transport: {
    targets: [
      {
        target: 'pino-pretty', // Pretty-print logs in development
        options: {
          colorize: true,
          destination: 1, // stdout
        },
        level: 'info',
      },
      {
        target: 'pino/file',
        options: {
          destination: path.join(errorDir, 'error.log'), // Error logs destination
        },
        level: 'error',
      },
      {
        target: 'pino/file',
        options: {
          destination: path.join(infoDir, 'info.log'), // Info logs destination
        },
        level: 'info',
      },
      {
        target: 'pino/file',
        options: {
          destination: path.join(debugDir, 'debug.log'), // Info logs destination
        },
        level: 'debug',
      },
      {
        target: 'pino/file',
        options: {
          destination: path.join(warnDir, 'warn.log'), // Info logs destination
        },
        level: 'warn',
      },
      {
        target: 'pino/file',
        options: {
          destination: path.join(traceDir, 'trace.log'), // Info logs destination
        },
        level: 'trace',
      },
      {
        target: 'pino/file',
        options: {
          destination: path.join(fatalDir, 'fatal.log'), // Info logs destination
        },
        level: 'fatal',
      },
      {
        target: 'pino/file',
        options: {
          destination: path.join(silentDir, 'silent.log'), // Info logs destination
        },
        level: 'silent',
      }
    ],
  }
};

const logger: Logger = pino(loggerOptions);

export default logger;

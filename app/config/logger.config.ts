import pino, { Logger, LoggerOptions } from 'pino';

const loggerOptions: LoggerOptions = {
  level: 'info', // Log level
  transport: {
    target: 'pino-pretty', // Pretty-print logs in development
    options: { colorize: true },
  },
};

const logger: Logger = pino(loggerOptions);

export default logger;
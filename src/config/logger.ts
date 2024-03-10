import winston from 'winston';

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.json(),
    winston.format.colorize(),
  ),
  defaultMeta: { service: 'api' },
  transports: [
    new winston.transports.File({
      level: 'info',
      filename: 'logs/app.log',
      handleExceptions: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
    }),
  ],
});

export const stream = {
  write: (message: string) => {
    logger.info(message);
  },
};

export default logger;

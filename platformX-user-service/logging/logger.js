import winston from "winston";
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(timestamp({
        format: "YYYY-MM-DD hh:mm:ss.SSS A",
      }), json()),
    transports: [
      new winston.transports.File({
        filename: 'logs/userservice.log',
      }),
      new winston.transports.File({
        filename: 'logs/userservice-error.log',
        level: 'error',
      }),
    ],
  });
  
  

export default {
  logger,
};
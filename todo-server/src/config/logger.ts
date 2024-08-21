import winston from 'winston';
import config from './settings';

const { combine, timestamp, printf } = winston.format;

const logFormat = printf(({ level, message, timestamp: logTimestamp }) => {
    return `${logTimestamp} [${level}] ${message}`;
});

const logger = winston.createLogger({
    level: config.log_level,
    format: combine(
        timestamp(),
        logFormat,
    ),
    transports: [
        new winston.transports.Console(),
    ],
});

export default logger;
const { format, createLogger, transports } = require('winston');
const { timestamp, combine, printf, errors, json } = format;
const customLogger = require('./customLogger');

function logger() {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`;
  });

  const formatLogs = format.combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }));

  return createLogger({
    format: format.combine(formatLogs),
    defaultMeta: { service: 'tweet-api' },
    transports: [
      new transports.Console({
        format: combine(format.colorize(), logFormat)}), 
      new customLogger({format: combine(json())})
    ],
  });
}

module.exports = logger;

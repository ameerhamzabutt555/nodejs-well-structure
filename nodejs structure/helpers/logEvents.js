const { format, createLogger, transports } = require('winston');

const {
  combine, timestamp, label, prettyPrint,
} = format;
const CATEGORY = 'winston custom format';
const errorFilter = format((info) => (info.level === 'error' ? info : false));

const infoFilter = format((info) => (info.level === 'info' ? info : false));
const debugFilter = format((info) => (info.level === 'debug' ? info : false));
const logger = createLogger({
  level: 'debug',
  format: combine(
    label({ label: CATEGORY }),
    timestamp({
      format: 'MMM-DD-YYYY HH:mm:ss',
    }),
    prettyPrint(),
  ),
  transports: [
    new transports.File({
      filename: 'logs/debug.log',
      level: 'debug',
      format: combine(debugFilter(), timestamp()),
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: combine(errorFilter(), timestamp()),
    }),
    new transports.File({
      filename: 'logs/info.log',
      level: 'info',
      format: combine(infoFilter(), timestamp()),
    }),
    new transports.Console(),
  ],
});

module.exports = logger;

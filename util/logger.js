/**
 * Created by hatim on 12/07/17.
 */

const winston = require('winston');
const fs = require('fs');

const env = process.env.NODE_ENV || 'dev';
const logDir = 'log';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const tsFormat = () => (new Date()).toLocaleDateString();

winston.emitErrs = true;
let logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: `${logDir}/all-logs.log`,
            handleExceptions: true,
            json: true,
            maxsize: 524880,
            maxFiles: 5,
            colorize: false,
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            humanReadableUnhandledException: true,
            json: false,
            colorize: true,
        }),
    ],
    exitOnError: false,
});

module.exports = logger;
module.exports.stream = {
    write: (message, encoding) => {
        logger.info(message);
    },
};

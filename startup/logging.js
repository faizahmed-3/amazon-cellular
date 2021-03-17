const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
    winston.exceptions.handle(
        new winston.transports.Console({format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )}),
        new winston.transports.File({filename: 'uncaughtExceptions.log'})
    );


    process.on('unhandledRejection', error => {
        throw Error(error);
    });

    winston.add(new winston.transports.Console({format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple()
        )}));
    // winston.add(new winston.transports.File({filename: 'logfile.log'}));
    // winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/', level: 'warn'}));

}
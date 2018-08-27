const winston = require('winston'); //for logging errors --has a transport- a storage device for our logs.
require('winston-mongodb');
require('express-async-errors');  //passes the asyncMiddlware function to every route handler so async's don't have to be wrapped in the function

module.exports = function() {
  winston.handleExceptions(    //only handles uncaught exceptions, it will not work with unhandled promise rejections. Chances it will be available in the future
    new winston.transports.Console({ colorize: true, prettyPrint: true }), //if handed to another developer, he wouldn't be able to see our log on our machine. So display on console as well.
    new winston.transports.File({ filename: 'uncaughtExceptions.log' })); //using a file transport

  process.on('unhandledRejection', (ex) => {      //process is an object that is an event emitter. Event emitter is an object that can publish events. 'On' lets us subscribe to those events
    throw ex;                                     //this catches unhandled rejections, so we throw it to the winston.handleException
  });

  winston.add(winston.transports.File, { filename: 'logfile.log' });
  winston.add(winston.transports.MongoDB, {
    db: 'mongodb://localhost/vidly',
    level: 'info'  //Set the level here (info, warn and error messages will be logged)
  });
}
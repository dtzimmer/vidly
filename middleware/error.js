const winston = require('winston');

module.exports = function(err, req, res, next) {  //this only catches errors within the req response pipeline
  winston.error(err.message, err); //the second argument is the meta data - properties that are stored in MongoDB = expand meta in mongoDB


  res.status(500).send('Something failed.');
}


//Different types of Winston levels you could run:
//error is the top, so if you only include error, then you will not log warn, info, verbose, debug, silly.
//but if you want info, then you'll log warn and error.
//error

//warn

//info

//verbose

//debug

//silly
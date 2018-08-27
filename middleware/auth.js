const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided')

  try{
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded;
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token');
  }
}


























//Middleware functions

//function that takes a request object and either returns a response to the client or passes control to another middleware function

//Examples
//route handler function
//---it takes a req object and returns a response to the client. It terminates the req res cycle

//Example
// express.json (built-in)
// returns a middleware function that reads the request, if there is a json object in the body of the req,
// parses the body of req into a json object and then it will set req.body property.

//Example
// express.urlendcoded() - if you had html form and post that to the server. You can pass arrays and complex objects.

//Example
// express.static('<anyfolder>') -- displays static content from a file.


//Request processing pipeline -

//the requests will go through the pipeline

//create custom middleware functions that can go at the front of the request pipeline (e.g. authorization, authentication, etc)

// app.use(function(req, res, next) {
//   console.log('Logging...');
//   next(); //we need to pass it to the next middleware function. Otherwise you need something to terminate the req res cycle.
// })
//
// app.use(function(req, res, next) {
//   console.log('Authenticating...');
//   next(); //passes to the next middleware function
// })

//You should put each middleware function in their own file.
//_____________________________________________________________________
//logger.js

// function log(req, res, next) {
//   console.log('Logging...');
//   next()
// }
//
// module.exports = log;
//
// ___________________________________________________________________
// index.js
// const logger = require('.logger');
//
// app.use(logger); //define custom middleware function
//_____________________________________________________________________
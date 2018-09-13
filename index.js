const winston = require('winston');
const express = require('express');
const config = require("config");
const app = express();

//Refactored for 'Separation of Concerns'  Now index.js is just for setting up the application.

require('./startup/logging')(); //put this first so just in case we get an error loading modules that we log that error and terminate the process
require('./startup/cors')(app);
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
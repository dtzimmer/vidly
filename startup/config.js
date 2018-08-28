const config = require('config');

module.exports = function() {
  if (!config.get('jwtPrivateKey')) {
    throw new Error('FATAL ERROR: jwtPrivateKey is not defined.'); //throw an object not a string. You will not have the stack trays
  }

}

//to set your jwtPrivateKey
//in the terminal...
//export vidly_jwtPrivateKey=_________<----------type HERE mySecureKey
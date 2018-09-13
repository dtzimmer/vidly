const config = require('config');


module.exports = function (req, res, next) {

  if(!config.get('requiresAuth')) return next();

  if (!req.user.isAdmin) return res.status(403).send('Access denied.');

  next();
};

//401 Unauthorized = if user tries to access a protected resource but they don't supply a valid json web token.
// if they supply one and they still can't then we use 403 - forbidden
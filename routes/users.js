const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const _ = require('lodash'); //by convention we store it to underscore
const {User, validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password'); //exclude the password property
  res.send(user);
})

router.post('/', async (req, res) => {
  const { error } = validate(req.body);  //uses the joi validation
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email }); //looks up by one of their properties (email)
  if (user) return res.status(400).send('User already registered.');

  user = new User(_.pick(req.body, ['name', 'email', 'password']));  //reset the user object, because it should be null. We are now setting the properties
  const salt = await bcrypt.genSalt(10); //genSalt generates random characters to be included with the password
  user.password = await bcrypt.hash(user.password, salt); //add the hashed password to the salt (random characters)
  await user.save();


  const token = user.generateAuthToken();
  res
    .header('x-auth-token', token)
    .header('access-control-expose-headers', 'x-auth-token')
    .send(_.pick(user, ['_id', 'name', 'email'])); //set header, prefix is x- with arbitrary name, first arg is name, second is value which is token. We set header, then send response
});

module.exports = router;
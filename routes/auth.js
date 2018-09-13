const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash'); //by convention we store it to underscore
const {User} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { error } = validate(req.body);  //uses the joi validation
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email }); //looks up by one of their properties (email)
  if (!user) return res.status(400).send('Invalid email or password');

  const validPassword = await bcrypt.compare(req.body.password, user.password)
  if (!validPassword) return res.status(400).send('Invalid email or password');

  const token = user.generateAuthToken();
  res.send(token);
});

// Information Expert Principle - An object that has enough information and is an expert in a given area , that object should be responsible
// for making decisions and performing tasks. Like a chef in a restaurant. The act of cooking is done by the chef not waiter. Does not have the
//right skill or information.  Apply in this code.

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(), //final email() is to verify if the email is an email
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
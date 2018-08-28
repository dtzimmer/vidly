const {User} = require('../../../models/user'); //load user module that exports an object with two properties, one is user, and validate function so we use object destructure
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('user.generateAuthToken', () => { //describe is a test suite
  it('should return a valid JWT', () => {
    const payload = { _id: new mongoose.Types.ObjectId().toHexString(),
      isAdmin: true
    }
    const user = new User(payload);
    const token = user.generateAuthToken(); //call the generatAuthToken
    const decoded = jwt.verify(token, config.get('jwtPrivateKey')); //call it and verify it. it will be decoded and returned here
    expect (decoded).toMatchObject(payload); //decoded should match the object that we pass here
  });
});
const mongoose = require('mongoose');
const validator = require('validator');

const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    validate(val) {
      if (!validator.isEmail(val)) {
        throw new Error('You must provide an email address');
      }
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
  }
});

const User = mongoose.model('User', schema);

module.exports = User;


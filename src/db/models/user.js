const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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

schema.pre('save', async function(next){
  const user = this;
  
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model('User', schema);

module.exports = User;


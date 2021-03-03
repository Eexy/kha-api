const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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

schema.virtual('todos', {
  ref: 'Todo',
  localField: '_id',
  foreignField: 'owner'
});

schema.statics.findByCredential = async (email, password) => {
  const user = await User.findOne({email});

  if(!user){
    throw new Error("Unable to find user");
  }

  // We check if the passwords are the same
  const isMatch = await bcrypt.compare(password, user.password);
  if(!isMatch){
    throw new Error("Password is incorrect");
  }

  return user;
}

schema.methods.generateJWT = function() {
  const user = this;

  const payload = {
    id: user._id.toString(),
    date: Date.now().toString()
  };

  const token = jwt.sign(payload, process.env.SECRETKEY, {algorithm: "HS256"});
  
  return token;
}

schema.methods.toJson = function(){
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;

  return userObject;
}

schema.pre('save', async function(next){
  const user = this;
  
  if(user.isModified('password')){
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

const User = mongoose.model('User', schema);

module.exports = User;


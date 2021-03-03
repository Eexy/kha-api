const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  description: {
    type: String,
    trim: true,
    required: true
  },
  completed: {
    type: Boolean,
    required: true,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
});

schema.virtual

const Todo = mongoose.model('Todo', schema);

module.exports = Todo;
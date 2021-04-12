const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://taskapp:${process.env.ATLAS_PWD}@cluster0.1znlw.mongodb.net/${process.env.CLUSTER_NAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
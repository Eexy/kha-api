const express = require('express');
const app = express();
const helmet = require('helmet');
const userRouter = require('./routers/user');
const PORT = process.env.PORT || 3000;

// connect to db
require('../db/db');

// configure express
app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// set routers
app.use(userRouter);


app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
})
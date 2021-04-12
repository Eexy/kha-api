require('dotenv').config();
const express = require('express');
const app = express();
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const userRouter = require('./routers/user');
const todoRouter = require('./routers/todo');
const PORT = process.env.PORT || 3000;

// connect to db
require('../db/db');

// configure express
app.use(helmet());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// set routers
app.use(userRouter);
app.use(todoRouter);

app.get('*', (req, res) => {
  res.send({error: "incorrect url"});
});

app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
})
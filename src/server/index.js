const express = require('express');
const helmet = require('helmet');
const app = express();
const PORT = process.env.PORT || 3000;

// connect to db
require('../db/db');

app.use(helmet);


app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`);
})
const express = require('express');
const app = express();
require('dotenv').config();
const DB = require('./models/mongoose');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const { handleError, convertToApiError } = require('./middleware/apiError');
// PARSING
app.use(bodyParser.json());
// SANITIZE
app.use(xss());
app.use(mongoSanitize());
//routes
app.use('/api', routes);
// error handling
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});
const port = process.env.PORT || 3001;
DB.initConnection(async () => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});

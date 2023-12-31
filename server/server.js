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
const passport = require('passport');
const { jwtStrategy } = require('./middleware/passport');
var cors = require('cors');
app.use(cors());
// PARSING
app.use(bodyParser.json());
// SANITIZE
app.use(xss());
app.use(mongoSanitize());
//routes
app.use('/api', routes);
//Passport
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);
// error handling
app.use(convertToApiError);
app.use((err, req, res, next) => {
  handleError(err, res);
});
const port = process.env.PORT || 3001;
DB.initConnection(async () => {
  app.listen(port, () => {
    console.log(`Server running on port: http://localhost:${port}`);
  });
});

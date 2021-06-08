const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const api = require('./routes');
const app = express();

const PORT = process.env.PORT || '3000';
const HOST = process.env.HOST || 'http://localhost';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost/my_database';
const NODE_ENV = process.env.NODE_ENV || 'development';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(() => console.log('Mongo connected'));

app.use(logger(NODE_ENV));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api);

// error-handler settings
require('./config/error-handler')(app);
app.listen(PORT, () => console.log(`Server is ready at: ${HOST}:${PORT}`));

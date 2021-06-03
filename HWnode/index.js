const express = require('express');
const mongoose = require('mongoose');
const todosRoutes = require('./router/todos');

const PORT = process.env.PORT || '3000';
// Try to pass every global variable in as an env var with this module
// https://www.npmjs.com/package/dotenv

mongoose.connect('mongodb://localhost/my_database', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Mongo connected'));

const app = express();
app.use(express.json());

app.use('/todos', todosRoutes);
app.use(function (err, req, res) {
  res.status(400).send(err);
})
app.listen(PORT, () => console.log('Server is ready'));

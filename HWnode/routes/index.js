const todosRoutes = require('./todos.route');
const express = require('express');
const router = express.Router();

router.use('/todos', todosRoutes);

module.exports = router;

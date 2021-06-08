const express = require('express');
const router = express.Router();
const TodoSchema = require('../schemas/todo.schema');
const middleware = require('../middleware');
const todosController = require('../controllers/todos.controller');

router
  .get('/', todosController.getTodos)
  .get('/:id', todosController.getTodo)
  .post('/', middleware(TodoSchema), todosController.addTodo)
  .put('/:id', middleware(TodoSchema), todosController.updateTodo)
  .delete('/:id', todosController.removeTodo)
  .get('/:id/markDone', todosController.markDone)
  .get('/:id/markUndone', todosController.markUndone);

module.exports = router;

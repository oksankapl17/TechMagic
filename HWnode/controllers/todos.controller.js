const todosService = require('../services').todos;

module.exports = {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  removeTodo,
  markDone,
  markUndone
};

async function getTodos(req, res, next) {
  try {
    const data = await todosService.getTodos();
    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

async function getTodo(req, res, next) {
  try {
    const data = await todosService.getTodo(req.params.id);
    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

async function addTodo(req, res, next) {
  try {
    const data = await todosService.addTodo(req.body);
    return res.status(201).json({ data });
  } catch (error) {
    next(error);
  }
}

async function updateTodo(req, res, next) {
  try {
    const data = await todosService.updateTodo(req.params.id);
    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

async function removeTodo(req, res, next) {
  try {
    const data = await todosService.removeTodo(req.params.id);
    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

async function markDone(req, res, next) {
  try {
    const data = await todosService.updateTodo(req.params.id, { completed: true });
    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

async function markUndone(req, res, next) {
  try {
    const data = await todosService.updateTodo(req.params.id, { completed: false });
    return res.status(200).json({ data });
  } catch (error) {
    next(error);
  }
}

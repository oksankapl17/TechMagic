'use strict';
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const TodoModel = require('../models/todos');
const { badRequest, notFound } = require('../config/errorHelper');

module.exports = {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  removeTodo
};

async function getTodos() {
  return TodoModel.find();
}

async function getTodo(todoId) {
  if (!todoId) {
    throw badRequest('Please provide id');
  }
  const todo = await TodoModel.findById(todoId);
  if (!todo) {
    throw notFound('Todo not found');
  }
  return todo;
}

async function addTodo(data) {
  const existingTodo = await TodoModel.findOne({ name: data.name });
  if (existingTodo) {
    throw badRequest('Todo already exists');
  }
  return await TodoModel.create(data);
}

async function updateTodo(todoId, payload) {
  if (!todoId) {
    throw badRequest('Please provide id');
  }
  return TodoModel.findByIdAndUpdate({ _id: ObjectId(todoId) }, payload, { new: true });
}

async function removeTodo(todoId) {
  if (!todoId) {
    throw badRequest('Please provide id');
  }
  return TodoModel.findByIdAndRemove(todoId);
}

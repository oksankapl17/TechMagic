const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TodoModel = require('../models/todos');
const TodoSchema = require('../schemas/todo.schema');
const middleware = require('../middleware/index');

router.get('/', async function getTodos(req, res) {
  try {
    const todos = await TodoModel.find({});
    if (!todos.length) {
      return res.status(404).json({message: 'Todos not found'});
    }
    return res.status(200).json({data: todos});
  } catch (e) {
    return res.status(400).json({message: e && e.message})
  }
});

router.get('/:id', async function getTodo(req, res) {
  try {
    const {id} = req.params;
    if (!id) {
 return res.status(422).json({error: 'Please provide id'}); 
}
    const todo = await TodoModel.find({_id: mongoose.Types.ObjectId(id)});
    if (!todo.length) {
      return res.status(404).json({message: 'Todo not found'});
    }
    return res.status(200).json({data: todo});
  } catch (e) {
    return res.status(400).json({message: e && e.message})
  }
});

router.post('/', middleware(TodoSchema), async function addTodo(req, res) {
  try {
    const data = await TodoModel.create(req.body);
    return res.send(data);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put('/:id', middleware(TodoSchema), async function updateTodo(req, res) {
  try {
    const {id} = req.params;
    if (!id) {
 return res.status(422).json({error: 'Please provide id'}); 
}
    const todo = await TodoModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, req.body, {new: true});
    if (!todo) {
      return res.status(404).json({message: 'Todo not found'});
    }
    return res.status(200).json({data: todo});
  } catch (e) {
    return res.status(400).json({message: e && e.message})
  }
});

router.delete('/:id', async function removeTodo(req, res) {
  try {
    const {id} = req.params;
    if (!id) {
 return res.status(422).json({error: 'Please provide id'}); 
}
    const todo = await TodoModel.deleteOne({_id: mongoose.Types.ObjectId(id)});
    console.log(todo);
    if (!todo.length) {
      return res.status(404).json({message: 'Todo not found'});
    }
    return res.status(200).json({data: todo});
  } catch (e) {
    return res.status(400).json({message: e && e.message})
  }
});

router.put('/:id/markDone', async function markDone(req, res) {
  try {
    const {id} = req.params;
    if (!id) {
 return res.status(422).json({error: 'Please provide id'}); 
}
    const todo = await TodoModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {completed: true}, {new: true});
    if (!todo) {
      return res.status(404).json({message: 'Todo not found'});
    }
    return res.status(200).json({data: todo});
  } catch (e) {
    return res.status(400).json({message: e && e.message})
  }
});

router.put('/:id/markUndone', async function markUndone(req, res) {
  try {
    const {id} = req.params;
    if (!id) {
 return res.status(422).json({error: 'Please provide id'}); 
}
    const todo = await TodoModel.findOneAndUpdate({_id: mongoose.Types.ObjectId(id)}, {completed: false}, {new: true});
    if (!todo) {
      return res.status(404).json({message: 'Todo not found'});
    }
    return res.status(200).json({data: todo});
  } catch (e) {
    return res.status(400).json({message: e && e.message})
  }
});


module.exports = router;

const Joi = require('joi');

const todoSchema = Joi.object({
  name: Joi.string().min(6).max(30).required(),
  description: Joi.string().min(6).max(100).required(),
  completed: Joi.boolean().required()
});

module.exports = todoSchema;

const express = require('express');
const router = express.Router();

const Todo = require('../models/Todo');

// Get all todos
router.get(
  '/', async (req, res) => {
    try {
      const todos = await Todo.find();
      res.json(todos);
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

// create a todo
router.post(
  '/', async (req, res) => { 
    const todo = new Todo({
      text: req.body.text
    });
    try {
      const newTodo = await todo.save();
      res.status(201).json(newTodo);
    }
    catch (err) { 
      res.status(400).json({ message: err.message });
    }
  }
)

// toggle completed status
router.patch(
  '/:id', async (req, res) => { 
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) { 
        return res.status(404).json({ message: 'Todo ID not found!' });
      }
      if (!todo.completed) {
        todo.completed = true;
        todo.save();
        res.json(todo, { message: 'Todo marked as completed!' });
      }
      else { 
        todo.completed = false;
        todo.save();
        res.json(todo, { message: 'Todo marked as not completed!' });
      }
      
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
)

// delete a todo by id 
router.delete(
  '/:id', async (req, res) => { 
    try {
      const todo = await Todo.findById(req.params.id);
      if (!todo) {
        return res.status(404).json({ message: 'Todo ID not found!' });
      }
      await Todo.findByIdAndDelete(req.params.id);
      res.json({ message: 'Todo deleted successfully!' });
    }
    catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
)

module.exports = router;
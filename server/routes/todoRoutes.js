import express from 'express';
import { readTodos, writeTodos } from '../utils/storage.js';

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await readTodos();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// GET single todo by id
router.get('/:id', async (req, res) => {
  try {
    const todos = await readTodos();
    const todo = todos.find(t => t.id === req.params.id);
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo' });
  }
});

// POST create new todo
router.post('/', async (req, res) => {
  try {
    const { title, details, isImportant } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const todos = await readTodos();
    const newTodo = {
      id: `todo-${Date.now()}`,
      title: title.trim(),
      details: details ? details.trim() : '',
      isCompleted: false,
      isImportant: Boolean(isImportant),
      createdAt: new Date().toISOString()
    };

    todos.unshift(newTodo);
    await writeTodos(todos);
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT update existing todo
router.put('/:id', async (req, res) => {
  try {
    const todos = await readTodos();
    const index = todos.findIndex(t => t.id === req.params.id);
    if (index === -1) return res.status(404).json({ error: 'Todo not found' });

    const current = todos[index];
    const { title, details, isCompleted, isImportant } = req.body;

    const updatedTodo = {
      ...current,
      title: title !== undefined ? title.trim() : current.title,
      details: details !== undefined ? details.trim() : current.details,
      isCompleted: isCompleted !== undefined ? Boolean(isCompleted) : current.isCompleted,
      isImportant: isImportant !== undefined ? Boolean(isImportant) : current.isImportant
    };

    todos[index] = updatedTodo;
    await writeTodos(todos);
    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE todo
router.delete('/:id', async (req, res) => {
  try {
    const todos = await readTodos();
    const filtered = todos.filter(t => t.id !== req.params.id);
    if (filtered.length === todos.length) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    await writeTodos(filtered);
    res.json({ message: 'Todo deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

export default router;

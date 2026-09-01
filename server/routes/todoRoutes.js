import express from 'express';
import { readTodos, writeTodos } from '../utils/storage.js';

const router = express.Router();

// GET all todos
router.get('/', async (req, res) => {
  try {
    const todos = await readTodos();
    const { search, category, status, important } = req.query;

    let filtered = todos;

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        t => t.title.toLowerCase().includes(q) || (t.details && t.details.toLowerCase().includes(q))
      );
    }

    if (category && category !== 'All') {
      filtered = filtered.filter(t => t.category === category);
    }

    if (status === 'completed') {
      filtered = filtered.filter(t => t.isCompleted);
    } else if (status === 'pending') {
      filtered = filtered.filter(t => !t.isCompleted);
    }

    if (important === 'true') {
      filtered = filtered.filter(t => t.isImportant);
    }

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// GET single todo by id
router.get('/:id', async (req, res) => {
  try {
    const todos = await readTodos();
    const todo = todos.find(t => t.id === req.params.id);

    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch todo details' });
  }
});

// POST create new todo
router.post('/', async (req, res) => {
  try {
    const { title, details, isImportant, category, dueDate } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Task title is required' });
    }

    const todos = await readTodos();
    const newTodo = {
      id: `todo-${Date.now()}`,
      title: title.trim(),
      details: details ? details.trim() : '',
      isCompleted: false,
      isImportant: Boolean(isImportant),
      category: category || 'General',
      createdAt: new Date().toISOString(),
      dueDate: dueDate || ''
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

    if (index === -1) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    const current = todos[index];
    const { title, details, isCompleted, isImportant, category, dueDate } = req.body;

    const updatedTodo = {
      ...current,
      title: title !== undefined ? title.trim() : current.title,
      details: details !== undefined ? details.trim() : current.details,
      isCompleted: isCompleted !== undefined ? Boolean(isCompleted) : current.isCompleted,
      isImportant: isImportant !== undefined ? Boolean(isImportant) : current.isImportant,
      category: category !== undefined ? category : current.category,
      dueDate: dueDate !== undefined ? dueDate : current.dueDate,
      updatedAt: new Date().toISOString()
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

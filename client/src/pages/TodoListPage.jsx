import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/api';

function TodoListPage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Form states matching original design
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      const created = await createTodo({
        title,
        details,
        isImportant
      });
      setTodos(prev => [created, ...prev]);
      setTitle('');
      setDetails('');
      setIsImportant(false);
    } catch (err) {
      alert(err.message || 'Error adding task');
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleComplete = async (id, currentStatus) => {
    try {
      const updated = await updateTodo(id, { isCompleted: !currentStatus });
      setTodos(prev => prev.map(t => (t.id === id ? updated : t)));
    } catch (err) {
      alert('Failed to update task status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await deleteTodo(id);
      setTodos(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  return (
    <div className="fullElem active todo-list-page">
      <button className="back" onClick={() => navigate('/')} title="Close">
        &times;
      </button>

      <h2>Your Personalized Task List</h2>

      <div className="todo-container">
        <div className="addTask">
          <form onSubmit={handleAddTask}>
            <input
              type="text"
              id="task"
              placeholder="Enter Task"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="Enter Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
            />
            <div className="mark-imp">
              <input
                type="checkbox"
                id="check"
                checked={isImportant}
                onChange={(e) => setIsImportant(e.target.checked)}
              />
              <label htmlFor="check">Mark as Important!</label>
            </div>
            <button type="submit" disabled={submitting}>
              {submitting ? 'Adding...' : 'Add Task'}
            </button>
          </form>
        </div>

        <div className="allTask">
          {loading ? (
            <div className="loading-spinner">Loading tasks...</div>
          ) : error ? (
            <div style={{ color: '#ef5350', fontSize: '1.2rem', padding: '20px' }}>
              {error} - Make sure Express server is running on http://localhost:5000
            </div>
          ) : todos.length === 0 ? (
            <div style={{ opacity: 0.8, fontSize: '1.2rem' }}>No tasks added yet.</div>
          ) : (
            todos.map(todo => (
              <div
                key={todo.id}
                className={`task ${todo.isCompleted ? 'task-completed' : ''}`}
              >
                <h5>
                  {todo.title}
                  {todo.isImportant && <span className="true">★ Important</span>}
                </h5>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    type="button"
                    onClick={() => handleToggleComplete(todo.id, todo.isCompleted)}
                    style={{
                      backgroundColor: todo.isCompleted ? '#757575' : '#2e7d32',
                      color: 'white',
                      cursor: 'pointer'
                    }}
                  >
                    {todo.isCompleted ? 'Completed' : 'Mark as Completed'}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(todo.id)}
                    style={{
                      backgroundColor: '#c62828',
                      color: 'white',
                      padding: '12px 20px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoListPage;

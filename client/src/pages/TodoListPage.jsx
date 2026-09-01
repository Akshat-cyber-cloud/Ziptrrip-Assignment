import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import AddTaskForm from '../components/AddTaskForm';
import TodoCard from '../components/TodoCard';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from '../services/api';
import { Search } from 'lucide-react';

function TodoListPage() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all'); // all | pending | completed | important
  const [searchQuery, setSearchQuery] = useState('');

  const loadTodos = async () => {
    try {
      setLoading(true);
      const data = await fetchTodos();
      setTodos(data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Failed to load tasks from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const handleAddTask = async (newTaskData) => {
    try {
      const created = await createTodo(newTaskData);
      setTodos(prev => [created, ...prev]);
    } catch (err) {
      alert(err.message || 'Error adding task');
    }
  };

  const handleToggleComplete = async (id, isCompleted) => {
    try {
      const updated = await updateTodo(id, { isCompleted });
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

  // Filter & Search Logic
  const filteredTodos = todos.filter(todo => {
    // Search query filter
    const matchesSearch =
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (todo.details && todo.details.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'pending') return !todo.isCompleted;
    if (activeFilter === 'completed') return todo.isCompleted;
    if (activeFilter === 'important') return todo.isImportant;
    return true;
  });

  return (
    <div className="page-container">
      <Header />

      <div className="dashboard-grid">
        <div className="sidebar">
          <AddTaskForm onAddTask={handleAddTask} />
        </div>

        <div className="main-content">
          <div className="tasks-section">
            <div className="tasks-header">
              <h2>Your Todo List ({filteredTodos.length})</h2>
              <div className="filters-bar">
                <button
                  className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('all')}
                >
                  All Tasks
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'pending' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('pending')}
                >
                  Pending
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'completed' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('completed')}
                >
                  Completed
                </button>
                <button
                  className={`filter-btn ${activeFilter === 'important' ? 'active' : ''}`}
                  onClick={() => setActiveFilter('important')}
                >
                  Important ⭐
                </button>
              </div>
            </div>

            <div className="search-box">
              <div style={{ position: 'relative' }}>
                <Search
                  size={18}
                  style={{
                    position: 'absolute',
                    left: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    opacity: 0.6
                  }}
                />
                <input
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                  placeholder="Search tasks by title or notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="loading-spinner">Loading tasks from Express server...</div>
            ) : error ? (
              <div className="empty-state" style={{ color: '#ef5350' }}>{error}</div>
            ) : filteredTodos.length === 0 ? (
              <div className="empty-state">
                <h3>No tasks found</h3>
                <p>Try creating a new task or resetting your search filter.</p>
              </div>
            ) : (
              <div className="todo-list">
                {filteredTodos.map(todo => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoListPage;

import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { fetchTodoById, updateTodo, deleteTodo } from '../services/api';
import { ArrowLeft, Edit3, Trash2, CheckCircle, Clock, Star, Calendar, Tag } from 'lucide-react';

function TodoDetailPage() {
  const [searchParams] = useSearchParams();
  const todoId = searchParams.get('id');
  const navigate = useNavigate();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editDetails, setEditDetails] = useState('');
  const [editCategory, setEditCategory] = useState('');
  const [editDueDate, setEditDueDate] = useState('');
  const [editIsImportant, setEditIsImportant] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!todoId) {
      setError('No Todo ID specified in query parameters.');
      setLoading(false);
      return;
    }

    const getDetail = async () => {
      try {
        setLoading(true);
        const data = await fetchTodoById(todoId);
        setTodo(data);
        // Initialize edit form
        setEditTitle(data.title);
        setEditDetails(data.details || '');
        setEditCategory(data.category || 'General');
        setEditDueDate(data.dueDate || '');
        setEditIsImportant(Boolean(data.isImportant));
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Failed to load todo details');
      } finally {
        setLoading(false);
      }
    };

    getDetail();
  }, [todoId]);

  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editTitle.trim()) return;

    setSaving(true);
    try {
      const updated = await updateTodo(todoId, {
        title: editTitle,
        details: editDetails,
        category: editCategory,
        dueDate: editDueDate,
        isImportant: editIsImportant
      });
      setTodo(updated);
      setIsEditing(false);
    } catch (err) {
      alert(err.message || 'Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async () => {
    if (!todo) return;
    try {
      const updated = await updateTodo(todo.id, { isCompleted: !todo.isCompleted });
      setTodo(updated);
    } catch (err) {
      alert('Failed to update task status');
    }
  };

  const handleDeleteTodo = async () => {
    if (!window.confirm('Are you sure you want to delete this todo item?')) return;
    try {
      await deleteTodo(todo.id);
      navigate('/');
    } catch (err) {
      alert('Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="detail-page-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Todo List
        </Link>
        <div className="detail-card">
          <div className="loading-spinner">Loading Todo Item (ID: {todoId})...</div>
        </div>
      </div>
    );
  }

  if (error || !todo) {
    return (
      <div className="detail-page-container">
        <Link to="/" className="back-link">
          <ArrowLeft size={18} /> Back to Todo List
        </Link>
        <div className="detail-card">
          <div className="empty-state">
            <h3 style={{ color: '#ef5350' }}>Error Loading Todo</h3>
            <p>{error || 'Todo item not found'}</p>
            <button className="btn-secondary" style={{ marginTop: '16px' }} onClick={() => navigate('/')}>
              Return to Todo List
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page-container">
      <Link to="/" className="back-link">
        <ArrowLeft size={18} /> Back to Todos List
      </Link>

      <div className="detail-card">
        {isEditing ? (
          <form onSubmit={handleSaveEdit}>
            <div className="detail-header">
              <h2>Edit Todo Details</h2>
              <div className="detail-actions">
                <button type="button" className="btn-secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Task Title</label>
              <input
                type="text"
                className="form-input"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Detailed Description</label>
              <textarea
                className="form-textarea"
                rows={4}
                value={editDetails}
                onChange={(e) => setEditDetails(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="form-select"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Design">Design</option>
                <option value="Development">Development</option>
                <option value="General">General</option>
              </select>
            </div>

            <div className="form-group">
              <label>Due Date</label>
              <input
                type="date"
                className="form-input"
                value={editDueDate}
                onChange={(e) => setEditDueDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label className="form-checkbox">
                <input
                  type="checkbox"
                  checked={editIsImportant}
                  onChange={(e) => setEditIsImportant(e.target.checked)}
                />
                <span>Mark as Important</span>
              </label>
            </div>
          </form>
        ) : (
          <>
            <div className="detail-header">
              <div className="detail-title">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                  <span className={`badge ${todo.isCompleted ? 'badge-category' : 'badge-important'}`}>
                    {todo.isCompleted ? 'Completed' : 'In Progress'}
                  </span>
                  {todo.isImportant && (
                    <span className="badge badge-important">
                      <Star size={12} fill="#e8a7a7" style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                      Important
                    </span>
                  )}
                  {todo.category && <span className="badge badge-category">{todo.category}</span>}
                </div>
                <h2>{todo.title}</h2>
              </div>

              <div className="detail-actions">
                <button
                  className="btn-secondary"
                  onClick={handleToggleStatus}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <CheckCircle size={16} />
                  {todo.isCompleted ? 'Mark Pending' : 'Mark Complete'}
                </button>
                <button
                  className="btn-secondary"
                  onClick={() => setIsEditing(true)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Edit3 size={16} /> Edit
                </button>
                <button
                  className="btn-danger"
                  onClick={handleDeleteTodo}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </div>

            <div className="detail-body">
              <h3>Description & Notes</h3>
              <div className="detail-description">
                {todo.details ? todo.details : <em style={{ opacity: 0.6 }}>No details provided for this task.</em>}
              </div>
            </div>

            <div className="detail-info-grid">
              <div className="info-item">
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Tag size={14} /> ID
                </label>
                <span style={{ fontSize: '0.9rem', fontFamily: 'monospace', opacity: 0.9 }}>{todo.id}</span>
              </div>

              <div className="info-item">
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} /> Created At
                </label>
                <span>{new Date(todo.createdAt).toLocaleString()}</span>
              </div>

              <div className="info-item">
                <label style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={14} /> Due Date
                </label>
                <span>{todo.dueDate ? todo.dueDate : 'No due date set'}</span>
              </div>

              {todo.updatedAt && (
                <div className="info-item">
                  <label>Last Updated</label>
                  <span>{new Date(todo.updatedAt).toLocaleString()}</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoDetailPage;

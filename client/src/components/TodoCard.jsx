import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ExternalLink, Star } from 'lucide-react';

function TodoCard({ todo, onToggleComplete, onDelete }) {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    // Prevent navigation if click came from checkbox or action buttons
    if (
      e.target.tagName === 'INPUT' ||
      e.target.closest('.action-btn') ||
      e.target.closest('.todo-check')
    ) {
      return;
    }
    // Navigate to single todo item page with query parameter `?id=...`
    navigate(`/todo?id=${todo.id}`);
  };

  return (
    <div
      className={`todo-card ${todo.isCompleted ? 'completed' : ''}`}
      onClick={handleCardClick}
    >
      <div className="todo-content">
        <input
          type="checkbox"
          className="todo-check"
          checked={todo.isCompleted}
          onChange={() => onToggleComplete(todo.id, !todo.isCompleted)}
        />
        <div className="todo-details">
          <h4>{todo.title}</h4>
          {todo.details && <p>{todo.details}</p>}
          <div className="todo-meta">
            {todo.category && <span className="badge badge-category">{todo.category}</span>}
            {todo.isImportant && (
              <span className="badge badge-important">
                <Star size={12} fill="#e8a7a7" style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                Important
              </span>
            )}
            {todo.dueDate && (
              <span style={{ fontSize: '0.8rem', opacity: 0.75 }}>
                Due: {todo.dueDate}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="action-btn"
          title="View Single Todo Page"
          onClick={() => navigate(`/todo?id=${todo.id}`)}
        >
          <ExternalLink size={18} />
        </button>
        <button
          className="action-btn delete-btn"
          title="Delete Todo"
          onClick={() => onDelete(todo.id)}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}

export default TodoCard;

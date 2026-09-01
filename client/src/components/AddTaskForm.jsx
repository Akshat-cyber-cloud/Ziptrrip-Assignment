import React, { useState } from 'react';
import { PlusCircle, Star } from 'lucide-react';

function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategory] = useState('Work');
  const [dueDate, setDueDate] = useState('');
  const [isImportant, setIsImportant] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSubmitting(true);
    try {
      await onAddTask({
        title,
        details,
        category,
        dueDate,
        isImportant
      });
      // Reset form
      setTitle('');
      setDetails('');
      setCategory('Work');
      setDueDate('');
      setIsImportant(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="add-task-card">
      <h3>
        <PlusCircle size={22} color="#64B5F6" />
        Add New Task
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Task Title *</label>
          <input
            id="title"
            type="text"
            className="form-input"
            placeholder="e.g. Prepare Quarterly Report"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="details">Details / Notes</label>
          <textarea
            id="details"
            className="form-textarea"
            placeholder="Enter additional description or instructions..."
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Design">Design</option>
            <option value="Development">Development</option>
            <option value="General">General</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            type="date"
            className="form-input"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label className="form-checkbox">
            <input
              type="checkbox"
              checked={isImportant}
              onChange={(e) => setIsImportant(e.target.checked)}
            />
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Star size={16} fill={isImportant ? '#e8a7a7' : 'none'} color="#e8a7a7" />
              Mark as Important
            </span>
          </label>
        </div>

        <button type="submit" className="btn-primary" disabled={submitting}>
          {submitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </div>
  );
}

export default AddTaskForm;

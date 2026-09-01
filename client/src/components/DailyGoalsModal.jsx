import React, { useState } from 'react';

function DailyGoalsModal({ onClose }) {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('dailyGoals');
    return saved ? JSON.parse(saved) : [];
  });
  const [goalText, setGoalText] = useState('');

  const saveGoals = (updated) => {
    setGoals(updated);
    localStorage.setItem('dailyGoals', JSON.stringify(updated));
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!goalText.trim()) return;
    const updated = [...goals, { text: goalText.trim(), completed: false }];
    saveGoals(updated);
    setGoalText('');
  };

  const toggleGoal = (index) => {
    const updated = goals.map((g, i) => i === index ? { ...g, completed: !g.completed } : g);
    saveGoals(updated);
  };

  const deleteGoal = (index) => {
    const updated = goals.filter((_, i) => i !== index);
    saveGoals(updated);
  };

  const completedCount = goals.filter(g => g.completed).length;
  const percentage = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

  return (
    <div className="fullElem active">
      <button className="back" onClick={onClose} title="Close">
        &times;
      </button>

      <div className="goals-page">
        <div className="goals-container">
          <div className="goals-header">
            <h2>Daily Goals Tracker</h2>
            <div className="progress-container">
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${percentage}%` }}></div>
              </div>
              <p className="progress-text">{percentage}% Completed</p>
            </div>
          </div>

          <form className="add-goal-section" onSubmit={handleAddGoal}>
            <input
              type="text"
              placeholder="What is your main focus for today?"
              value={goalText}
              onChange={(e) => setGoalText(e.target.value)}
            />
            <button type="submit">Add Goal</button>
          </form>

          <div className="goals-list">
            {goals.map((goal, index) => (
              <div key={index} className={`goal-item ${goal.completed ? 'completed' : ''}`}>
                <div className="goal-left">
                  <input
                    type="checkbox"
                    className="goal-checkbox"
                    checked={goal.completed}
                    onChange={() => toggleGoal(index)}
                  />
                  <span className="goal-text">{goal.text}</span>
                </div>
                <button
                  type="button"
                  className="delete-goal-btn"
                  title="Delete Goal"
                  onClick={() => deleteGoal(index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DailyGoalsModal;

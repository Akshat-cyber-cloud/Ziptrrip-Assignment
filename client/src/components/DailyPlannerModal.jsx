import React, { useState } from 'react';

function DailyPlannerModal({ onClose }) {
  const [plannerData, setPlannerData] = useState(() => {
    const saved = localStorage.getItem('dayPlanData');
    return saved ? JSON.parse(saved) : {};
  });

  const hours = Array.from({ length: 18 }, (_, idx) => `${6 + idx}:00 - ${7 + idx}:00`);

  const handleChange = (idx, value) => {
    const updated = { ...plannerData, [idx]: value };
    setPlannerData(updated);
    localStorage.setItem('dayPlanData', JSON.stringify(updated));
  };

  return (
    <div className="fullElem active">
      <button className="back" onClick={onClose} title="Close">
        &times;
      </button>
      <h2>Plan Your Day To Be More Productive</h2>
      <div className="day-planner">
        {hours.map((timeRange, idx) => (
          <div key={idx} className="day-planner-time">
            <p>{timeRange}</p>
            <input
              type="text"
              placeholder="..."
              value={plannerData[idx] || ''}
              onChange={(e) => handleChange(idx, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyPlannerModal;

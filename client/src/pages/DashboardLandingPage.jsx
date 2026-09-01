import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import DailyPlannerModal from '../components/DailyPlannerModal';
import PomodoroTimerModal from '../components/PomodoroTimerModal';
import MotivationModal from '../components/MotivationModal';
import DailyGoalsModal from '../components/DailyGoalsModal';

function DashboardLandingPage() {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null); // 'planner' | 'pomodoro' | 'motivation' | 'goals' | null

  return (
    <section className="AllElems">
      <Header />

      <div className="AllFeatuers">
        <div className="todo elem" id="0" onClick={() => navigate('/todos')}>
          <img
            src="https://images.unsplash.com/photo-1755263087492-c9f3cd4d2ced?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="To Do List"
          />
          <h2>To Do List</h2>
        </div>

        <div className="daily elem" id="1" onClick={() => setActiveModal('planner')}>
          <img
            src="https://images.unsplash.com/photo-1628440501245-393606514a9e?q=80&w=1331&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Daily Planner"
          />
          <h2>Daily Planner</h2>
        </div>

        <div className="pomodoro elem" id="2" onClick={() => setActiveModal('pomodoro')}>
          <img
            src="https://images.unsplash.com/photo-1518281361980-b26bfd556770?q=80&w=2010&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Pomodoro Timer"
          />
          <h2>Pomodoro Timer</h2>
        </div>

        <div className="motivation elem" id="3" onClick={() => setActiveModal('motivation')}>
          <img
            src="https://images.unsplash.com/photo-1606840342018-8f1c049681bf?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Motivation"
          />
          <h2>Motivation</h2>
        </div>

        <div className="goals elem" id="4" onClick={() => setActiveModal('goals')}>
          <img
            src="https://plus.unsplash.com/premium_photo-1765718915206-f3bcb87444b7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Daily Goals"
          />
          <h2>Daily Goals</h2>
        </div>
      </div>

      {activeModal === 'planner' && (
        <DailyPlannerModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'pomodoro' && (
        <PomodoroTimerModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'motivation' && (
        <MotivationModal onClose={() => setActiveModal(null)} />
      )}
      {activeModal === 'goals' && (
        <DailyGoalsModal onClose={() => setActiveModal(null)} />
      )}
    </section>
  );
}

export default DashboardLandingPage;

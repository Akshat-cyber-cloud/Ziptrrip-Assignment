import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DashboardLandingPage from './pages/DashboardLandingPage';
import TodoListPage from './pages/TodoListPage';

function App() {
  return (
    <div id="main">
      <Routes>
        <Route path="/" element={<DashboardLandingPage />} />
        <Route path="/todos" element={<TodoListPage />} />
      </Routes>
    </div>
  );
}

export default App;

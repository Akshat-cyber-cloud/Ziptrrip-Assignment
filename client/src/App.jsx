import React from 'react';
import { Routes, Route } from 'react-router-dom';
import TodoListPage from './pages/TodoListPage';
import TodoDetailPage from './pages/TodoDetailPage';

function App() {
  return (
    <div id="main">
      <Routes>
        <Route path="/" element={<TodoListPage />} />
        <Route path="/todos" element={<TodoListPage />} />
        <Route path="/todo" element={<TodoDetailPage />} />
      </Routes>
    </div>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Replace Redirect with Navigate
import Login from './components/Login';
import Register from './components/Register';
import UserTable from './components/UserTable';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/users" element={<UserTable />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
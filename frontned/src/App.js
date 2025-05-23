import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import DiscountRates from './pages/DiscountRates';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/discount-rates" element={<DiscountRates />} />
          {/* Add other routes as your application grows */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
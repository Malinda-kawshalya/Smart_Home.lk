
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import pages
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Inventory from './pages/Inventory';
import Suppliers from './pages/Suppliers';
import Customers from './pages/Customers';
import Orders from './pages/Orders';
import Delivery from './pages/Delivery';
import Support from './pages/Support';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container">
            <Link to="/" className="navbar-brand">Smart Home LK</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link to="/" className="nav-link">Dashboard</Link>
                </li>
                <li className="nav-item">
                  <Link to="/products" className="nav-link">Products</Link>
                </li>
                <li className="nav-item">
                  <Link to="/inventory" className="nav-link">Inventory</Link>
                </li>
                <li className="nav-item">
                  <Link to="/suppliers" className="nav-link">Suppliers</Link>
                </li>
                <li className="nav-item">
                  <Link to="/customers" className="nav-link">Customers</Link>
                </li>
                <li className="nav-item">
                  <Link to="/orders" className="nav-link">Orders</Link>
                </li>
                <li className="nav-item">
                  <Link to="/delivery" className="nav-link">Delivery</Link>
                </li>
                <li className="nav-item">
                  <Link to="/support" className="nav-link">Support</Link>
                </li>
                <li className="nav-item">
                  <Link to="/reports" className="nav-link">Reports</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/suppliers" element={<Suppliers />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/support" element={<Support />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
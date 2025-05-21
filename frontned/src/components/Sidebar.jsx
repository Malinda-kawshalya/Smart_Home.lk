import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const isActiveRoute = (route) => {
    return location.pathname === route ? 'active' : '';
  };

  return (
    <>
      {/* Mobile top navbar */}
      <nav className="navbar navbar-dark bg-primary d-md-none">
        <div className="container-fluid">
          <button
            className="navbar-toggler border-0"
            type="button"
            onClick={() => setCollapsed(!collapsed)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <Link to="/" className="navbar-brand mx-auto">
            <i className="bi bi-house-gear-fill me-2"></i>
            <span>Smart Home LK</span>
          </Link>
          <div className="dropdown">
            <button
              className="btn btn-link text-white"
              type="button"
              data-bs-toggle="dropdown"
            >
              <i className="bi bi-person-circle fs-5"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm">
              <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
              <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Logout</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <div className={`sidebar bg-dark ${collapsed ? 'collapsed' : ''}`}>
        <div className="d-flex flex-column h-100">
          {/* Logo */}
          <div className="sidebar-header p-3 d-none d-md-flex align-items-center">
            <Link to="/" className="d-flex align-items-center text-white text-decoration-none">
              <i className="bi bi-house-gear-fill fs-4 me-2"></i>
              {!collapsed && <span className="fs-4 fw-bold">Smart Home LK</span>}
            </Link>
            <button 
              className="btn btn-link ms-auto d-none d-md-block text-white p-0"
              onClick={() => setCollapsed(!collapsed)}
            >
              <i className={`bi ${collapsed ? 'bi-chevron-right' : 'bi-chevron-left'}`}></i>
            </button>
          </div>

          {/* Search box */}
          {!collapsed && (
            <div className="p-3">
              <div className="input-group">
                <input 
                  type="search" 
                  className="form-control form-control-sm" 
                  placeholder="Search..." 
                />
                <button className="btn btn-sm btn-secondary" type="button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          )}

          {/* Navigation */}
          <ul className="nav nav-pills flex-column mb-auto p-2">
            <li className="nav-item">
              <Link to="/" className={`nav-link text-white ${isActiveRoute('/')}`}>
                <i className="bi bi-speedometer2 me-2"></i>
                {!collapsed && <span>Dashboard</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className={`nav-link text-white ${isActiveRoute('/products')}`}>
                <i className="bi bi-box-seam me-2"></i>
                {!collapsed && <span>Products</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/inventory" className={`nav-link text-white ${isActiveRoute('/inventory')}`}>
                <i className="bi bi-stack me-2"></i>
                {!collapsed && <span>Inventory</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/suppliers" className={`nav-link text-white ${isActiveRoute('/suppliers')}`}>
                <i className="bi bi-truck me-2"></i>
                {!collapsed && <span>Suppliers</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/customers" className={`nav-link text-white ${isActiveRoute('/customers')}`}>
                <i className="bi bi-people me-2"></i>
                {!collapsed && <span>Customers</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className={`nav-link text-white ${isActiveRoute('/orders')}`}>
                <i className="bi bi-bag me-2"></i>
                {!collapsed && <span>Orders</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/delivery" className={`nav-link text-white ${isActiveRoute('/delivery')}`}>
                <i className="bi bi-geo-alt me-2"></i>
                {!collapsed && <span>Delivery</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/support" className={`nav-link text-white ${isActiveRoute('/support')}`}>
                <i className="bi bi-headset me-2"></i>
                {!collapsed && <span>Support</span>}
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/reports" className={`nav-link text-white ${isActiveRoute('/reports')}`}>
                <i className="bi bi-bar-chart me-2"></i>
                {!collapsed && <span>Reports</span>}
              </Link>
            </li>
          </ul>

          {/* User profile section */}
          <div className="dropdown p-3 mt-auto border-top">
            <a
              href="#"
              className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=007bff&color=fff"
                alt="Admin User"
                width="32"
                height="32"
                className="rounded-circle me-2"
              />
              {!collapsed && (
                <div>
                  <strong>Admin User</strong>
                  <small className="d-block text-muted">Administrator</small>
                </div>
              )}
            </a>
            <ul className="dropdown-menu dropdown-menu-dark shadow">
              <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
              <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="#">Sign out</a></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand d-flex align-items-center">
          <i className="bi bi-house-gear-fill me-2 fs-4"></i>
          <span className="fw-bold">Smart Home LK</span>
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className={`collapse navbar-collapse ${isExpanded ? 'show' : ''}`} id="navbarNav">
          {/* Search bar */}
          <div className="d-flex mx-auto mt-2 mt-lg-0 mb-2 mb-lg-0" style={{maxWidth: "350px"}}>
            <div className="input-group">
              <input 
                type="search" 
                className="form-control" 
                placeholder="Search..." 
                aria-label="Search"
              />
              <button className="btn btn-light" type="button">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
          
          {/* Main navigation */}
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link d-flex align-items-center">
                <i className="bi bi-speedometer2 me-1"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/products" className="nav-link d-flex align-items-center">
                <i className="bi bi-box-seam me-1"></i> Products
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/inventory" className="nav-link d-flex align-items-center">
                <i className="bi bi-stack me-1"></i> Inventory
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/suppliers" className="nav-link d-flex align-items-center">
                <i className="bi bi-truck me-1"></i> Suppliers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/customers" className="nav-link d-flex align-items-center">
                <i className="bi bi-people me-1"></i> Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/orders" className="nav-link d-flex align-items-center">
                <i className="bi bi-bag me-1"></i> Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/delivery" className="nav-link d-flex align-items-center">
                <i className="bi bi-geo-alt me-1"></i> Delivery
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/support" className="nav-link d-flex align-items-center">
                <i className="bi bi-headset me-1"></i> Support
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/reports" className="nav-link d-flex align-items-center">
                <i className="bi bi-bar-chart me-1"></i> Reports
              </Link>
            </li>
            {/* User profile icon/dropdown */}
            <li className="nav-item dropdown">
              <a 
                className="nav-link dropdown-toggle d-flex align-items-center" 
                href="#" 
                role="button" 
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-circle fs-5"></i>
              </a>
              <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                <li><Link className="dropdown-item" to="/profile">Profile</Link></li>
                <li><Link className="dropdown-item" to="/settings">Settings</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Logout</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
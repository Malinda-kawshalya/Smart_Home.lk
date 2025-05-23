import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUsers, FaPercentage, FaBox, FaChartLine, FaCog, FaSignOutAlt } from 'react-icons/fa';
import '../styles/sidebar.css';

const Sidebar = ({ collapsed, toggleSidebar }) => {
  const location = useLocation();
  
  return (
    <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          {collapsed ? 'SH' : 'SmartHome.lk'}
        </div>
        <button 
          className="sidebar-toggle"
          onClick={toggleSidebar}
        >
          <span></span>
        </button>
      </div>
      
      <Nav className="flex-column sidebar-nav">
        <Nav.Link 
          as={Link} 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
          style={{'--animation-order': 1}}
        >
          <FaHome />
          <span>Dashboard</span>
        </Nav.Link>
        
        <Nav.Link 
          as={Link} 
          to="/customers" 
          className={location.pathname === '/customers' ? 'active' : ''} 
          style={{'--animation-order': 2}}
        >
          <FaUsers />
          <span>Customers</span>
        </Nav.Link>
        
        <Nav.Link 
          as={Link} 
          to="/discount-rates" 
          className={location.pathname === '/discount-rates' ? 'active' : ''} 
          style={{'--animation-order': 3}}
        >
          <FaPercentage />
          <span>Discount Rates</span>
        </Nav.Link>

        <Nav.Link 
          as={Link} 
          to="/products" 
          className={location.pathname === '/products' ? 'active' : ''} 
          style={{'--animation-order': 4}}
        >
          <FaBox />
          <span>Products</span>
        </Nav.Link>
        
        <Nav.Link 
          as={Link} 
          to="/analytics" 
          className={location.pathname === '/analytics' ? 'active' : ''} 
          style={{'--animation-order': 5}}
        >
          <FaChartLine />
          <span>Analytics</span>
        </Nav.Link>
      </Nav>
      
      <div className="sidebar-footer">
        <Nav.Link as={Link} to="/settings" className={location.pathname === '/settings' ? 'active' : ''}>
          <FaCog />
          <span>Settings</span>
        </Nav.Link>
        
        <Nav.Link as={Link} to="/logout">
          <FaSignOutAlt />
          <span>Logout</span>
        </Nav.Link>
      </div>
    </div>
  );
};

export default Sidebar;
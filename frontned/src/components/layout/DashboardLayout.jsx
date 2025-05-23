import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';
import '../../styles/layout.css';

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar collapsed={collapsed} toggleSidebar={toggleSidebar} />
      <div className={`main-content ${collapsed ? 'expanded' : ''}`}>
        <div className="page-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
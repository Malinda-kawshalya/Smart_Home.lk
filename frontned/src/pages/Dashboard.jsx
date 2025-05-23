import React, { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { FaUsers, FaBox, FaShoppingCart, FaMoneyBillWave } from 'react-icons/fa';
import axios from 'axios';
import '../styles/dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    customers: 0,
    products: 0,
    orders: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch this data from your API
        const [customersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/customers'),
          axios.get('http://localhost:5000/api/products')
        ]);
        
        setStats({
          customers: customersRes.data.length,
          products: productsRes.data.length,
          orders: Math.floor(Math.random() * 100), // Placeholder
          revenue: Math.floor(Math.random() * 10000) // Placeholder
        });
        setLoading(false);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({ title, value, icon, color, isLoading }) => (
    <Card className="stat-card">
      <Card.Body>
        <div className="stat-icon" style={{ backgroundColor: `${color}20` }}>
          {icon}
        </div>
        <div className="stat-info">
          <h3 className={`stat-value ${isLoading ? 'placeholder' : ''}`}>
            {isLoading ? '' : value}
          </h3>
          <p className="stat-title">{title}</p>
        </div>
      </Card.Body>
    </Card>
  );

  return (
    <div className="dashboard-page">
      <h2 className="page-title">Dashboard</h2>
      
      <Row className="stat-cards-row">
        <Col lg={3} md={6} sm={12} className="mb-4">
          <StatCard 
            title="Total Customers"
            value={stats.customers}
            icon={<FaUsers size={24} color="#0b5ed7" />}
            color="#0b5ed7"
            isLoading={loading}
          />
        </Col>
        <Col lg={3} md={6} sm={12} className="mb-4">
          <StatCard 
            title="Total Products"
            value={stats.products}
            icon={<FaBox size={24} color="#198754" />}
            color="#198754"
            isLoading={loading}
          />
        </Col>
        <Col lg={3} md={6} sm={12} className="mb-4">
          <StatCard 
            title="Total Orders"
            value={stats.orders}
            icon={<FaShoppingCart size={24} color="#dc3545" />}
            color="#dc3545"
            isLoading={loading}
          />
        </Col>
        <Col lg={3} md={6} sm={12} className="mb-4">
          <StatCard 
            title="Total Revenue"
            value={`Rs.${stats.revenue.toLocaleString()}`}
            icon={<FaMoneyBillWave size={24} color="#ffc107" />}
            color="#ffc107"
            isLoading={loading}
          />
        </Col>
      </Row>

      {/* Additional dashboard content can be added here */}
      <Row>
        <Col lg={8} className="mb-4">
          <Card className="chart-card">
            <Card.Header>Recent Activity</Card.Header>
            <Card.Body>
              {/* You can add charts or graphs here */}
              <div className="placeholder-chart">
                <p>Sales chart will appear here</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4} className="mb-4">
          <Card className="top-customers-card">
            <Card.Header>Top Customers</Card.Header>
            <Card.Body>
              {/* You can add a list of top customers here */}
              <ul className="customer-list">
                {loading ? (
                  Array(5).fill().map((_, i) => (
                    <li key={i} className="placeholder-list-item"></li>
                  ))
                ) : (
                  <p>Customer list will appear here</p>
                )}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
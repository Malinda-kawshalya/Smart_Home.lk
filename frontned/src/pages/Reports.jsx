import React, { useState } from 'react';

const Reports = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('month');
  
  // Sample data for demonstration
  const sampleData = {
    sales: [4200, 5800, 6200, 7500, 8200, 9100, 7800, 8500, 9200, 10500, 11200, 12000],
    inventory: [120, 110, 95, 85, 70, 110, 130, 115, 100, 95, 80, 70],
    customers: [45, 52, 60, 65, 72, 80, 85, 90, 95, 100, 110, 120]
  };
  
  // Sample labels for charts
  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Analytics & Reports</h2>
      
      {/* Controls */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col-md-4">
              <label className="form-label">Report Type</label>
              <select 
                className="form-select" 
                value={reportType} 
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="sales">Sales Report</option>
                <option value="inventory">Inventory Report</option>
                <option value="customers">Customer Growth</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">Date Range</label>
              <select 
                className="form-select" 
                value={dateRange} 
                onChange={(e) => setDateRange(e.target.value)}
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label">&nbsp;</label>
              <div>
                <button className="btn btn-primary me-2">
                  <i className="bi bi-filter me-1"></i>Apply Filters
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-download me-1"></i>Export
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title text-white-50">Total Sales</h6>
                  <h3 className="mb-0">$84,500</h3>
                  <p className="card-text mt-2">
                    <span className="badge bg-light text-primary me-1">+15%</span>
                    <small className="text-white-50">vs last period</small>
                  </p>
                </div>
                <div className="display-4">
                  <i className="bi bi-bar-chart-fill"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title text-white-50">Inventory Items</h6>
                  <h3 className="mb-0">1,240</h3>
                  <p className="card-text mt-2">
                    <span className="badge bg-light text-success me-1">+5%</span>
                    <small className="text-white-50">vs last period</small>
                  </p>
                </div>
                <div className="display-4">
                  <i className="bi bi-box-fill"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title text-white-50">Total Customers</h6>
                  <h3 className="mb-0">542</h3>
                  <p className="card-text mt-2">
                    <span className="badge bg-light text-warning me-1">+8%</span>
                    <small className="text-white-50">vs last period</small>
                  </p>
                </div>
                <div className="display-4">
                  <i className="bi bi-people-fill"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger h-100">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="card-title text-white-50">Avg Order Value</h6>
                  <h3 className="mb-0">$155.80</h3>
                  <p className="card-text mt-2">
                    <span className="badge bg-light text-danger me-1">+12%</span>
                    <small className="text-white-50">vs last period</small>
                  </p>
                </div>
                <div className="display-4">
                  <i className="bi bi-currency-dollar"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Chart Card */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            {reportType === 'sales' && 'Sales Performance'}
            {reportType === 'inventory' && 'Inventory Levels'}
            {reportType === 'customers' && 'Customer Growth'}
          </h5>
        </div>
        <div className="card-body">
          <div className="chart-container" style={{position: 'relative', height: '300px'}}>
            {/* This is where you would integrate Chart.js, Recharts, or another charting library */}
            <div className="placeholder-chart bg-light rounded d-flex align-items-center justify-content-center" style={{height: '100%'}}>
              <div className="text-center">
                <i className="bi bi-bar-chart fs-1 text-primary mb-3 d-block"></i>
                <h6>
                  {reportType === 'sales' && 'Sales Chart - Install a chart library like Chart.js'}
                  {reportType === 'inventory' && 'Inventory Chart - Install a chart library like Chart.js'}
                  {reportType === 'customers' && 'Customer Chart - Install a chart library like Chart.js'}
                </h6>
                <div className="small text-muted">
                  To implement real charts, install: <code>npm install chart.js react-chartjs-2</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Secondary Charts - 2 Column Layout */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">Top Products</h5>
            </div>
            <div className="card-body">
              <div className="chart-container" style={{position: 'relative', height: '200px'}}>
                <div className="placeholder-chart bg-light rounded d-flex align-items-center justify-content-center" style={{height: '100%'}}>
                  <div className="text-center">
                    <i className="bi bi-pie-chart fs-1 text-primary mb-2 d-block"></i>
                    <div className="small text-muted">Pie Chart Placeholder</div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Smart LED Bulbs</span>
                  <span className="badge bg-primary">32%</span>
                </div>
                <div className="progress mb-3" style={{height: '6px'}}>
                  <div className="progress-bar bg-primary" role="progressbar" style={{width: '32%'}}></div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Smart Cameras</span>
                  <span className="badge bg-success">24%</span>
                </div>
                <div className="progress mb-3" style={{height: '6px'}}>
                  <div className="progress-bar bg-success" role="progressbar" style={{width: '24%'}}></div>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span>Smart Locks</span>
                  <span className="badge bg-info">18%</span>
                </div>
                <div className="progress mb-3" style={{height: '6px'}}>
                  <div className="progress-bar bg-info" role="progressbar" style={{width: '18%'}}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card h-100">
            <div className="card-header">
              <h5 className="mb-0">Sales by Region</h5>
            </div>
            <div className="card-body">
              <div className="chart-container" style={{position: 'relative', height: '200px'}}>
                <div className="placeholder-chart bg-light rounded d-flex align-items-center justify-content-center" style={{height: '100%'}}>
                  <div className="text-center">
                    <i className="bi bi-map fs-1 text-success mb-2 d-block"></i>
                    <div className="small text-muted">Map Chart Placeholder</div>
                  </div>
                </div>
              </div>
              <div className="table-responsive mt-3">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Region</th>
                      <th>Orders</th>
                      <th>Sales</th>
                      <th>%</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Western</td>
                      <td>458</td>
                      <td>$32,145</td>
                      <td>38%</td>
                    </tr>
                    <tr>
                      <td>Central</td>
                      <td>320</td>
                      <td>$24,820</td>
                      <td>29%</td>
                    </tr>
                    <tr>
                      <td>Southern</td>
                      <td>275</td>
                      <td>$19,725</td>
                      <td>23%</td>
                    </tr>
                    <tr>
                      <td>Eastern</td>
                      <td>125</td>
                      <td>$7,810</td>
                      <td>10%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Recent Analytics Table */}
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Detailed Report Data</h5>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-outline-light btn-sm">
              <i className="bi bi-download me-1"></i>Export CSV
            </button>
            <button type="button" className="btn btn-outline-light btn-sm">
              <i className="bi bi-printer me-1"></i>Print
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-light">
                <tr>
                  <th>Date</th>
                  <th>Sales</th>
                  <th>Orders</th>
                  <th>Customers</th>
                  <th>Avg Order</th>
                  <th>Trend</th>
                </tr>
              </thead>
              <tbody>
                {monthLabels.slice(0, 6).reverse().map((month, index) => (
                  <tr key={index}>
                    <td>{month} 2025</td>
                    <td>${(sampleData.sales[11 - index]).toLocaleString()}</td>
                    <td>{Math.floor(sampleData.sales[11 - index] / 155)}</td>
                    <td>{sampleData.customers[11 - index]}</td>
                    <td>${(sampleData.sales[11 - index] / Math.floor(sampleData.sales[11 - index] / 155)).toFixed(2)}</td>
                    <td>
                      {index < 5 && sampleData.sales[11 - index] > sampleData.sales[11 - index - 1] ? (
                        <span className="text-success"><i className="bi bi-arrow-up"></i> {((sampleData.sales[11 - index] / sampleData.sales[11 - index - 1] - 1) * 100).toFixed(1)}%</span>
                      ) : index < 5 ? (
                        <span className="text-danger"><i className="bi bi-arrow-down"></i> {((1 - sampleData.sales[11 - index] / sampleData.sales[11 - index - 1]) * 100).toFixed(1)}%</span>
                      ) : (
                        <span>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <small className="text-muted">
            Reports are generated based on the most recent data available. Last updated: May 21, 2025
          </small>
        </div>
      </div>
    </div>
  );
};

export default Reports;
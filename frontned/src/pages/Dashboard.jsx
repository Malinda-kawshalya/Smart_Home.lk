import React from 'react';

const Dashboard = () => {
  return (
    <div className="container mt-4">
      <h2 className="mb-4">Dashboard</h2>
      
      {/* Summary Statistics */}
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="card text-white bg-primary">
            <div className="card-body">
              <h5 className="card-title">Total Customers</h5>
              <h2 className="display-4">124</h2>
              <p className="card-text"><small>+12% from last month</small></p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-success">
            <div className="card-body">
              <h5 className="card-title">Revenue</h5>
              <h2 className="display-4">$8,540</h2>
              <p className="card-text"><small>+5% from last month</small></p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-warning">
            <div className="card-body">
              <h5 className="card-title">Orders</h5>
              <h2 className="display-4">64</h2>
              <p className="card-text"><small>+8% from last month</small></p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-white bg-danger">
            <div className="card-body">
              <h5 className="card-title">Products</h5>
              <h2 className="display-4">124</h2>
              <p className="card-text"><small>12 low in stock</small></p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row">
        {/* Recent Orders */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Recent Orders</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Date</th>
                      <th>Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#ORD-0123</td>
                      <td>John Smith</td>
                      <td>May 15, 2025</td>
                      <td>$230.00</td>
                      <td><span className="badge bg-success">Delivered</span></td>
                    </tr>
                    <tr>
                      <td>#ORD-0122</td>
                      <td>Anna Kumar</td>
                      <td>May 14, 2025</td>
                      <td>$125.99</td>
                      <td><span className="badge bg-warning">Pending</span></td>
                    </tr>
                    <tr>
                      <td>#ORD-0121</td>
                      <td>Robert Fox</td>
                      <td>May 14, 2025</td>
                      <td>$450.50</td>
                      <td><span className="badge bg-info">Shipped</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        {/* Inventory Status */}
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Inventory Status</h5>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>SKU</th>
                      <th>In Stock</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Smart LED Bulb</td>
                      <td>SLB-1001</td>
                      <td>142 units</td>
                      <td><span className="badge bg-success">Good</span></td>
                    </tr>
                    <tr>
                      <td>WiFi Camera</td>
                      <td>WFC-2204</td>
                      <td>8 units</td>
                      <td><span className="badge bg-danger">Low</span></td>
                    </tr>
                    <tr>
                      <td>Smart Lock</td>
                      <td>SLK-3300</td>
                      <td>25 units</td>
                      <td><span className="badge bg-warning">Medium</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
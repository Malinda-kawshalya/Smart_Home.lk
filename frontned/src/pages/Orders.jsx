import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    customer_id: '', 
    employee_id: '', 
    order_date: '', 
    status_id: '', 
    payment_method_id: '', 
    payment_status_id: '', 
    order_source_id: ''
  });

  const fetchOrders = () => {
    axios.get('/api/orders')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/orders', form).then(() => {
      fetchOrders();
      setForm({ 
        customer_id: '', 
        employee_id: '', 
        order_date: '', 
        status_id: '', 
        payment_method_id: '', 
        payment_status_id: '', 
        order_source_id: '' 
      });
    });
  };

  const handleDelete = id => {
    axios.delete(`/api/orders/${id}`).then(() => fetchOrders());
  };

  // Helper function to get appropriate badge color based on status
  const getStatusBadgeClass = statusId => {
    const statusMap = {
      1: 'bg-warning', // Pending
      2: 'bg-info',    // Processing
      3: 'bg-primary', // Shipped
      4: 'bg-success', // Delivered
      5: 'bg-danger'   // Cancelled
    };
    return statusMap[statusId] || 'bg-secondary';
  };

  // Helper function to get status text based on ID
  const getStatusText = statusId => {
    const statusMap = {
      1: 'Pending',
      2: 'Processing',
      3: 'Shipped',
      4: 'Delivered',
      5: 'Cancelled'
    };
    return statusMap[statusId] || 'Unknown';
  };

  // Helper function to get payment status text
  const getPaymentStatusText = paymentStatusId => {
    const paymentStatusMap = {
      1: 'Pending',
      2: 'Paid',
      3: 'Failed',
      4: 'Refunded'
    };
    return paymentStatusMap[paymentStatusId] || 'Unknown';
  };

  // Helper function to format date
  const formatDate = dateString => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Orders</h2>
      
      {/* Order Entry Form */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Place New Order</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="customer_id" 
                    name="customer_id" 
                    value={form.customer_id} 
                    onChange={handleChange}
                    placeholder="Customer ID" 
                    required 
                  />
                  <label htmlFor="customer_id">Customer ID</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="employee_id" 
                    name="employee_id" 
                    value={form.employee_id} 
                    onChange={handleChange}
                    placeholder="Employee ID" 
                    required 
                  />
                  <label htmlFor="employee_id">Employee ID</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="date" 
                    className="form-control" 
                    id="order_date" 
                    name="order_date" 
                    value={form.order_date} 
                    onChange={handleChange}
                    placeholder="Order Date" 
                    required 
                  />
                  <label htmlFor="order_date">Order Date</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <select 
                    className="form-select" 
                    id="status_id" 
                    name="status_id" 
                    value={form.status_id} 
                    onChange={handleChange}
                    required 
                  >
                    <option value="">Select Status</option>
                    <option value="1">Pending</option>
                    <option value="2">Processing</option>
                    <option value="3">Shipped</option>
                    <option value="4">Delivered</option>
                    <option value="5">Cancelled</option>
                  </select>
                  <label htmlFor="status_id">Order Status</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select 
                    className="form-select" 
                    id="payment_method_id" 
                    name="payment_method_id" 
                    value={form.payment_method_id} 
                    onChange={handleChange}
                    required 
                  >
                    <option value="">Select Payment Method</option>
                    <option value="1">Credit Card</option>
                    <option value="2">Cash on Delivery</option>
                    <option value="3">Bank Transfer</option>
                    <option value="4">Digital Wallet</option>
                  </select>
                  <label htmlFor="payment_method_id">Payment Method</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select 
                    className="form-select" 
                    id="payment_status_id" 
                    name="payment_status_id" 
                    value={form.payment_status_id} 
                    onChange={handleChange}
                    required 
                  >
                    <option value="">Select Payment Status</option>
                    <option value="1">Pending</option>
                    <option value="2">Paid</option>
                    <option value="3">Failed</option>
                    <option value="4">Refunded</option>
                  </select>
                  <label htmlFor="payment_status_id">Payment Status</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <select 
                    className="form-select" 
                    id="order_source_id" 
                    name="order_source_id" 
                    value={form.order_source_id} 
                    onChange={handleChange}
                    required 
                  >
                    <option value="">Select Order Source</option>
                    <option value="1">Website</option>
                    <option value="2">Phone</option>
                    <option value="3">In Store</option>
                    <option value="4">Mobile App</option>
                  </select>
                  <label htmlFor="order_source_id">Order Source</label>
                </div>
              </div>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Place Order
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Orders Table */}
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Order List</h5>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-outline-light btn-sm">
              <i className="bi bi-filter me-1"></i>Filter
            </button>
            <button type="button" className="btn btn-outline-light btn-sm">
              <i className="bi bi-download me-1"></i>Export
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Employee</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map(order => (
                    <tr key={order.order_id}>
                      <td><span className="fw-bold">#{order.order_id}</span></td>
                      <td>{order.customer_id}</td>
                      <td>{order.employee_id}</td>
                      <td>{formatDate(order.order_date)}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(order.status_id)}`}>
                          {getStatusText(order.status_id)}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${order.payment_status_id === '2' ? 'bg-success' : 'bg-warning'}`}>
                          {getPaymentStatusText(order.payment_status_id)}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-sm btn-outline-primary" title="View Details">
                            <i className="bi bi-eye"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-success" title="Print Invoice">
                            <i className="bi bi-printer"></i>
                          </button>
                          <button 
                            onClick={() => handleDelete(order.order_id)} 
                            className="btn btn-sm btn-outline-danger"
                            title="Delete Order"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      <i className="bi bi-inbox fs-1 d-block mb-2 text-muted"></i>
                      No orders found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">Showing {orders.length} orders</small>
            </div>
            <nav aria-label="Page navigation">
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                </li>
                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                <li className="page-item"><a className="page-link" href="#">2</a></li>
                <li className="page-item"><a className="page-link" href="#">3</a></li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
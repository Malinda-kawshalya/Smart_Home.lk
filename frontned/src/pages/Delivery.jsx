import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Delivery = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [form, setForm] = useState({
    order_id: '', 
    delivery_personnel_id: '', 
    scheduled_date: '', 
    actual_delivery_date: '', 
    status_id: '', 
    delivery_notes: ''
  });

  const fetchDeliveries = () => {
    axios.get('/api/deliveries')
      .then(res => setDeliveries(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/deliveries', form).then(() => {
      fetchDeliveries();
      setForm({ 
        order_id: '', 
        delivery_personnel_id: '', 
        scheduled_date: '', 
        actual_delivery_date: '', 
        status_id: '', 
        delivery_notes: '' 
      });
    });
  };

  const handleDelete = id => {
    axios.delete(`/api/deliveries/${id}`).then(() => fetchDeliveries());
  };

  // Helper function to get status badge color
  const getStatusBadgeClass = statusId => {
    const statusMap = {
      1: 'bg-warning',   // Scheduled
      2: 'bg-info',      // In Transit
      3: 'bg-success',   // Delivered
      4: 'bg-danger',    // Failed
      5: 'bg-secondary'  // Cancelled
    };
    return statusMap[statusId] || 'bg-secondary';
  };

  // Helper function to get status text
  const getStatusText = statusId => {
    const statusMap = {
      1: 'Scheduled',
      2: 'In Transit',
      3: 'Delivered',
      4: 'Failed',
      5: 'Cancelled'
    };
    return statusMap[statusId] || 'Unknown';
  };

  // Helper function to format date
  const formatDate = dateString => {
    if (!dateString) return '—';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Delivery Management</h2>
      
      {/* Delivery Form Card */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Add New Delivery</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="order_id" 
                    name="order_id" 
                    value={form.order_id} 
                    onChange={handleChange}
                    placeholder="Order ID" 
                    required 
                  />
                  <label htmlFor="order_id">Order ID</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="delivery_personnel_id" 
                    name="delivery_personnel_id" 
                    value={form.delivery_personnel_id} 
                    onChange={handleChange}
                    placeholder="Personnel ID" 
                    required 
                  />
                  <label htmlFor="delivery_personnel_id">Delivery Personnel ID</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="date" 
                    className="form-control" 
                    id="scheduled_date" 
                    name="scheduled_date" 
                    value={form.scheduled_date} 
                    onChange={handleChange}
                    placeholder="Scheduled Date" 
                    required 
                  />
                  <label htmlFor="scheduled_date">Scheduled Date</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="date" 
                    className="form-control" 
                    id="actual_delivery_date" 
                    name="actual_delivery_date" 
                    value={form.actual_delivery_date} 
                    onChange={handleChange}
                    placeholder="Actual Delivery Date" 
                  />
                  <label htmlFor="actual_delivery_date">Actual Delivery Date (if delivered)</label>
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
                    <option value="1">Scheduled</option>
                    <option value="2">In Transit</option>
                    <option value="3">Delivered</option>
                    <option value="4">Failed</option>
                    <option value="5">Cancelled</option>
                  </select>
                  <label htmlFor="status_id">Delivery Status</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <textarea 
                    className="form-control" 
                    id="delivery_notes" 
                    name="delivery_notes" 
                    value={form.delivery_notes} 
                    onChange={handleChange}
                    placeholder="Delivery Notes"
                    style={{height: "100px"}}
                  />
                  <label htmlFor="delivery_notes">Delivery Notes</label>
                </div>
              </div>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Add Delivery
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Deliveries Table */}
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Delivery List</h5>
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
                  <th>Order</th>
                  <th>Personnel</th>
                  <th>Scheduled</th>
                  <th>Delivered</th>
                  <th>Status</th>
                  <th>Notes</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {deliveries.length > 0 ? (
                  deliveries.map(d => (
                    <tr key={d.delivery_id}>
                      <td><strong>#{d.order_id}</strong></td>
                      <td>{d.delivery_personnel_id}</td>
                      <td>{formatDate(d.scheduled_date)}</td>
                      <td>{formatDate(d.actual_delivery_date)}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(d.status_id)}`}>
                          {getStatusText(d.status_id)}
                        </span>
                      </td>
                      <td>
                        <span className="text-truncate d-inline-block" style={{maxWidth: "150px"}} title={d.delivery_notes}>
                          {d.delivery_notes || '—'}
                        </span>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-sm btn-outline-primary" title="Edit Delivery">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button className="btn btn-sm btn-outline-info" title="Track Delivery">
                            <i className="bi bi-geo-alt"></i>
                          </button>
                          <button 
                            onClick={() => handleDelete(d.delivery_id)} 
                            className="btn btn-sm btn-outline-danger"
                            title="Delete Delivery"
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
                      <i className="bi bi-truck fs-1 d-block mb-2 text-muted"></i>
                      No deliveries found
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
              <small className="text-muted">Showing {deliveries.length} deliveries</small>
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

export default Delivery;
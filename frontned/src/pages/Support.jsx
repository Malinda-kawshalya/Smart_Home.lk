import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    customer_id: '', product_id: '', warranty_id: '', issue_description: '', 
    submission_date: '', status_id: '', resolution: '', assigned_employee_id: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const statusMap = {
    1: { label: 'Open', badge: 'danger' },
    2: { label: 'In Progress', badge: 'warning' },
    3: { label: 'Pending Customer', badge: 'info' },
    4: { label: 'Resolved', badge: 'success' },
    5: { label: 'Closed', badge: 'secondary' }
  };

  const fetchTickets = () => {
    axios.get('/api/support')
      .then(res => setTickets(res.data))
      .catch(error => console.error('Error fetching tickets:', error));
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  
  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/support', form)
      .then(() => {
        fetchTickets();
        setForm({ 
          customer_id: '', product_id: '', warranty_id: '', issue_description: '', 
          submission_date: '', status_id: '', resolution: '', assigned_employee_id: '' 
        });
        // Show success message
        alert('Ticket created successfully!');
      })
      .catch(error => console.error('Error creating ticket:', error));
  };

  const handleDelete = id => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      axios.delete(`/api/support/${id}`)
        .then(() => fetchTickets())
        .catch(error => console.error('Error deleting ticket:', error));
    }
  };

  const openTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <i className="bi bi-headset me-2"></i>
          Support Tickets
        </h2>
        <button 
          className="btn btn-primary" 
          data-bs-toggle="collapse" 
          data-bs-target="#ticketForm"
        >
          <i className="bi bi-plus-circle me-2"></i>
          New Ticket
        </button>
      </div>

      {/* Ticket Form */}
      <div className="collapse mb-4" id="ticketForm">
        <div className="card">
          <div className="card-header bg-primary text-white">
            <h5 className="mb-0">Create Support Ticket</h5>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label">Customer ID</label>
                  <input 
                    type="text"
                    className="form-control" 
                    name="customer_id" 
                    value={form.customer_id} 
                    onChange={handleChange} 
                    placeholder="Enter customer ID" 
                    required 
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Product ID</label>
                  <input 
                    type="text"
                    className="form-control" 
                    name="product_id" 
                    value={form.product_id} 
                    onChange={handleChange} 
                    placeholder="Enter product ID" 
                    required 
                  />
                </div>
                <div className="col-md-4">
                  <label className="form-label">Warranty ID</label>
                  <input 
                    type="text"
                    className="form-control" 
                    name="warranty_id" 
                    value={form.warranty_id} 
                    onChange={handleChange} 
                    placeholder="Enter warranty ID" 
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Submission Date</label>
                  <input 
                    type="date"
                    className="form-control" 
                    name="submission_date" 
                    value={form.submission_date} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Status</label>
                  <select 
                    className="form-select" 
                    name="status_id" 
                    value={form.status_id} 
                    onChange={handleChange} 
                    required
                  >
                    <option value="">Select status</option>
                    <option value="1">Open</option>
                    <option value="2">In Progress</option>
                    <option value="3">Pending Customer</option>
                    <option value="4">Resolved</option>
                    <option value="5">Closed</option>
                  </select>
                </div>
                <div className="col-12">
                  <label className="form-label">Issue Description</label>
                  <textarea 
                    className="form-control" 
                    name="issue_description" 
                    value={form.issue_description} 
                    onChange={handleChange} 
                    placeholder="Describe the issue in detail" 
                    rows="3"
                    required 
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Resolution</label>
                  <textarea 
                    className="form-control" 
                    name="resolution" 
                    value={form.resolution} 
                    onChange={handleChange} 
                    placeholder="Resolution details (if any)" 
                    rows="2"
                  ></textarea>
                </div>
                <div className="col-md-6">
                  <label className="form-label">Assigned Employee</label>
                  <input 
                    type="text"
                    className="form-control" 
                    name="assigned_employee_id" 
                    value={form.assigned_employee_id} 
                    onChange={handleChange} 
                    placeholder="Enter employee ID" 
                    required 
                  />
                </div>
                <div className="col-12 mt-3">
                  <button type="submit" className="btn btn-success me-2">
                    <i className="bi bi-check-circle me-2"></i>
                    Submit Ticket
                  </button>
                  <button type="button" className="btn btn-outline-secondary" data-bs-toggle="collapse" data-bs-target="#ticketForm">
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-light">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">All Support Tickets</h5>
            <div className="input-group" style={{ width: "300px" }}>
              <input 
                type="text" 
                className="form-control form-control-sm" 
                placeholder="Search tickets..." 
              />
              <button className="btn btn-outline-secondary btn-sm">
                <i className="bi bi-search"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Product</th>
                  <th>Issue</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length > 0 ? (
                  tickets.map(ticket => (
                    <tr key={ticket.ticket_id}>
                      <td>#{ticket.ticket_id}</td>
                      <td>{ticket.customer_id}</td>
                      <td>{ticket.product_id}</td>
                      <td className="text-truncate" style={{ maxWidth: "250px" }}>
                        {ticket.issue_description}
                      </td>
                      <td>
                        <span className={`badge bg-${statusMap[ticket.status_id]?.badge || 'secondary'}`}>
                          {statusMap[ticket.status_id]?.label || 'Unknown'}
                        </span>
                      </td>
                      <td>{new Date(ticket.submission_date).toLocaleDateString()}</td>
                      <td>
                        <div className="btn-group btn-group-sm">
                          <button 
                            className="btn btn-outline-primary"
                            onClick={() => openTicketDetails(ticket)}
                          >
                            <i className="bi bi-eye"></i>
                          </button>
                          <button 
                            className="btn btn-outline-danger"
                            onClick={() => handleDelete(ticket.ticket_id)}
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
                      <div className="d-flex flex-column align-items-center">
                        <i className="bi bi-inbox text-muted fs-1 mb-2"></i>
                        <h6 className="text-muted">No support tickets found</h6>
                        <button 
                          className="btn btn-sm btn-primary mt-2" 
                          data-bs-toggle="collapse" 
                          data-bs-target="#ticketForm"
                        >
                          Create your first ticket
                        </button>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">Showing {tickets.length} tickets</small>
            <nav aria-label="Ticket pagination">
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled">
                  <a className="page-link" href="#" tabIndex="-1">Previous</a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">1</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">2</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">3</a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Ticket Details Modal */}
      {selectedTicket && (
        <div 
          className="modal fade" 
          id="ticketDetailsModal" 
          tabIndex="-1" 
          aria-labelledby="ticketDetailsModalLabel" 
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="ticketDetailsModalLabel">
                  Ticket #{selectedTicket.ticket_id}
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  data-bs-dismiss="modal" 
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row mb-3">
                  <div className="col-sm-6">
                    <p className="mb-1"><strong>Customer ID:</strong> {selectedTicket.customer_id}</p>
                    <p className="mb-1"><strong>Product ID:</strong> {selectedTicket.product_id}</p>
                    <p className="mb-1"><strong>Warranty ID:</strong> {selectedTicket.warranty_id}</p>
                  </div>
                  <div className="col-sm-6">
                    <p className="mb-1">
                      <strong>Status:</strong> 
                      <span className={`badge bg-${statusMap[selectedTicket.status_id]?.badge || 'secondary'} ms-2`}>
                        {statusMap[selectedTicket.status_id]?.label || 'Unknown'}
                      </span>
                    </p>
                    <p className="mb-1"><strong>Date:</strong> {new Date(selectedTicket.submission_date).toLocaleDateString()}</p>
                    <p className="mb-1"><strong>Assigned To:</strong> {selectedTicket.assigned_employee_id}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <h6>Issue Description</h6>
                  <div className="p-3 bg-light rounded">
                    {selectedTicket.issue_description || 'No description provided.'}
                  </div>
                </div>
                <div className="mb-3">
                  <h6>Resolution</h6>
                  <div className="p-3 bg-light rounded">
                    {selectedTicket.resolution || 'No resolution yet.'}
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary"
                >
                  Update Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Support;
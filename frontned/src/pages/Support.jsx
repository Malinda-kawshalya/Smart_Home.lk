import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [form, setForm] = useState({
    customer_id: '', product_id: '', warranty_id: '', issue_description: '', submission_date: '', status_id: '', resolution: '', assigned_employee_id: ''
  });

  const fetchTickets = () => {
    axios.get('/api/support').then(res => setTickets(res.data)).catch(console.error);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/support', form).then(() => {
      fetchTickets();
      setForm({ customer_id: '', product_id: '', warranty_id: '', issue_description: '', submission_date: '', status_id: '', resolution: '', assigned_employee_id: '' });
    });
  };

  const handleDelete = id => axios.delete(`/api/support/${id}`).then(() => fetchTickets());

  return (
    <div className="container">
      <h2>Support Tickets</h2>
      <form onSubmit={handleSubmit}>
        <input name="customer_id" value={form.customer_id} onChange={handleChange} placeholder="Customer ID" required />
        <input name="product_id" value={form.product_id} onChange={handleChange} placeholder="Product ID" required />
        <input name="warranty_id" value={form.warranty_id} onChange={handleChange} placeholder="Warranty ID" required />
        <input name="issue_description" value={form.issue_description} onChange={handleChange} placeholder="Issue Description" required />
        <input name="submission_date" value={form.submission_date} onChange={handleChange} placeholder="Submission Date" required />
        <input name="status_id" value={form.status_id} onChange={handleChange} placeholder="Status ID" required />
        <input name="resolution" value={form.resolution} onChange={handleChange} placeholder="Resolution" />
        <input name="assigned_employee_id" value={form.assigned_employee_id} onChange={handleChange} placeholder="Assigned Employee" required />
        <button type="submit">Submit Ticket</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Customer</th>
            <th>Product</th>
            <th>Issue</th>
            <th>Status</th>
            <th>Resolution</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map(t => (
            <tr key={t.ticket_id}>
              <td>{t.customer_id}</td>
              <td>{t.product_id}</td>
              <td>{t.issue_description}</td>
              <td>{t.status_id}</td>
              <td>{t.resolution}</td>
              <td><button onClick={() => handleDelete(t.ticket_id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Support;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Delivery = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [form, setForm] = useState({
    order_id: '', delivery_personnel_id: '', scheduled_date: '', actual_delivery_date: '', status_id: '', delivery_notes: ''
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
      setForm({ order_id: '', delivery_personnel_id: '', scheduled_date: '', actual_delivery_date: '', status_id: '', delivery_notes: '' });
    });
  };

  const handleDelete = id => {
    axios.delete(`/api/deliveries/${id}`).then(() => fetchDeliveries());
  };

  return (
    <div className="container">
      <h2>Deliveries</h2>
      <form onSubmit={handleSubmit}>
        <input name="order_id" value={form.order_id} onChange={handleChange} placeholder="Order ID" required />
        <input name="delivery_personnel_id" value={form.delivery_personnel_id} onChange={handleChange} placeholder="Personnel ID" required />
        <input name="scheduled_date" value={form.scheduled_date} onChange={handleChange} placeholder="Scheduled Date" required />
        <input name="actual_delivery_date" value={form.actual_delivery_date} onChange={handleChange} placeholder="Actual Delivery Date" />
        <input name="status_id" value={form.status_id} onChange={handleChange} placeholder="Status ID" required />
        <input name="delivery_notes" value={form.delivery_notes} onChange={handleChange} placeholder="Notes" />
        <button type="submit">Add Delivery</button>
      </form>
      <table>
        <thead>
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
          {deliveries.map(d => (
            <tr key={d.delivery_id}>
              <td>{d.order_id}</td>
              <td>{d.delivery_personnel_id}</td>
              <td>{d.scheduled_date}</td>
              <td>{d.actual_delivery_date}</td>
              <td>{d.status_id}</td>
              <td>{d.delivery_notes}</td>
              <td><button onClick={() => handleDelete(d.delivery_id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Delivery;
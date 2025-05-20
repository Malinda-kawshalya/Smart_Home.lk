import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState({
    customer_id: '', employee_id: '', order_date: '', status_id: '', payment_method_id: '', payment_status_id: '', order_source_id: ''
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
      setForm({ customer_id: '', employee_id: '', order_date: '', status_id: '', payment_method_id: '', payment_status_id: '', order_source_id: '' });
    });
  };

  const handleDelete = id => {
    axios.delete(`/api/orders/${id}`).then(() => fetchOrders());
  };

  return (
    <div className="container">
      <h2>Orders</h2>
      <form onSubmit={handleSubmit}>
        <input name="customer_id" value={form.customer_id} onChange={handleChange} placeholder="Customer ID" required />
        <input name="employee_id" value={form.employee_id} onChange={handleChange} placeholder="Employee ID" required />
        <input name="order_date" value={form.order_date} onChange={handleChange} placeholder="Order Date (YYYY-MM-DD)" required />
        <input name="status_id" value={form.status_id} onChange={handleChange} placeholder="Status ID" required />
        <input name="payment_method_id" value={form.payment_method_id} onChange={handleChange} placeholder="Payment Method ID" required />
        <input name="payment_status_id" value={form.payment_status_id} onChange={handleChange} placeholder="Payment Status ID" required />
        <input name="order_source_id" value={form.order_source_id} onChange={handleChange} placeholder="Order Source ID" required />
        <button type="submit">Place Order</button>
      </form>
      <table>
        <thead>
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
          {orders.map(order => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.customer_id}</td>
              <td>{order.employee_id}</td>
              <td>{order.order_date}</td>
              <td>{order.status_id}</td>
              <td>{order.payment_status_id}</td>
              <td><button onClick={() => handleDelete(order.order_id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
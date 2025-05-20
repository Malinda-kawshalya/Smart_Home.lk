import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customer_name: '', email: '', phone: '', location_id: '', customer_type_id: '', registration_date: '', loyalty_points: ''
  });

  const fetchCustomers = () => {
    axios.get('/api/customers')
      .then(res => setCustomers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/customers', form).then(() => {
      fetchCustomers();
      setForm({ customer_name: '', email: '', phone: '', location_id: '', customer_type_id: '', registration_date: '', loyalty_points: '' });
    });
  };

  const handleDelete = id => {
    axios.delete(`/api/customers/${id}`).then(() => fetchCustomers());
  };

  return (
    <div className="container">
      <h2>Customers</h2>
      <form onSubmit={handleSubmit}>
        <input name="customer_name" value={form.customer_name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />
        <input name="location_id" value={form.location_id} onChange={handleChange} placeholder="Location ID" required />
        <input name="customer_type_id" value={form.customer_type_id} onChange={handleChange} placeholder="Type ID" required />
        <input name="registration_date" value={form.registration_date} onChange={handleChange} placeholder="Registration Date (YYYY-MM-DD)" required />
        <input name="loyalty_points" value={form.loyalty_points} onChange={handleChange} placeholder="Loyalty Points" required />
        <button type="submit">Add Customer</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Type</th>
            <th>Registered</th>
            <th>Points</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.customer_id}>
              <td>{c.customer_name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.location_id}</td>
              <td>{c.customer_type_id}</td>
              <td>{c.registration_date}</td>
              <td>{c.loyalty_points}</td>
              <td>
                <button onClick={() => handleDelete(c.customer_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
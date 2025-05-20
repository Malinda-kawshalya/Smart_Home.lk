import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    company_name: '', contact_person: '', email: '', phone: '', location_id: '', rating: ''
  });

  const fetchSuppliers = () => {
    axios.get('/api/suppliers')
      .then(res => setSuppliers(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/suppliers', form).then(() => {
      fetchSuppliers();
      setForm({ company_name: '', contact_person: '', email: '', phone: '', location_id: '', rating: '' });
    });
  };

  const handleDelete = id => {
    axios.delete(`/api/suppliers/${id}`).then(() => fetchSuppliers());
  };

  return (
    <div className="container">
      <h2>Suppliers</h2>
      <form onSubmit={handleSubmit}>
        <input name="company_name" value={form.company_name} onChange={handleChange} placeholder="Company Name" required />
        <input name="contact_person" value={form.contact_person} onChange={handleChange} placeholder="Contact Person" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
        <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />
        <input name="location_id" value={form.location_id} onChange={handleChange} placeholder="Location ID" required />
        <input name="rating" value={form.rating} onChange={handleChange} placeholder="Rating" required />
        <button type="submit">Add Supplier</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map(s => (
            <tr key={s.supplier_id}>
              <td>{s.company_name}</td>
              <td>{s.contact_person}</td>
              <td>{s.email}</td>
              <td>{s.phone}</td>
              <td>{s.location_id}</td>
              <td>{s.rating}</td>
              <td>
                <button onClick={() => handleDelete(s.supplier_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Suppliers;
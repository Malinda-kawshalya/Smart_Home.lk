import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({
    customer_name: '', 
    email: '', 
    phone: '', 
    location_id: '', 
    customer_type_id: '', 
    registration_date: '', 
    loyalty_points: ''
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
      setForm({ 
        customer_name: '', 
        email: '', 
        phone: '', 
        location_id: '', 
        customer_type_id: '', 
        registration_date: '', 
        loyalty_points: '' 
      });
    });
  };

  const handleDelete = id => {
    axios.delete(`/api/customers/${id}`).then(() => fetchCustomers());
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Customers</h2>
      
      {/* Customer Form Card */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Add New Customer</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="customer_name" 
                    name="customer_name" 
                    value={form.customer_name} 
                    onChange={handleChange}
                    placeholder="Name" 
                    required 
                  />
                  <label htmlFor="customer_name">Customer Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name="email" 
                    value={form.email} 
                    onChange={handleChange}
                    placeholder="Email" 
                    required 
                  />
                  <label htmlFor="email">Email Address</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="tel" 
                    className="form-control" 
                    id="phone" 
                    name="phone" 
                    value={form.phone} 
                    onChange={handleChange}
                    placeholder="Phone" 
                    required 
                  />
                  <label htmlFor="phone">Phone Number</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="location_id" 
                    name="location_id" 
                    value={form.location_id} 
                    onChange={handleChange}
                    placeholder="Location ID" 
                    required 
                  />
                  <label htmlFor="location_id">Location ID</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="customer_type_id" 
                    name="customer_type_id" 
                    value={form.customer_type_id} 
                    onChange={handleChange}
                    placeholder="Type ID" 
                    required 
                  />
                  <label htmlFor="customer_type_id">Customer Type</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input 
                    type="date" 
                    className="form-control" 
                    id="registration_date" 
                    name="registration_date" 
                    value={form.registration_date} 
                    onChange={handleChange}
                    placeholder="Registration Date" 
                    required 
                  />
                  <label htmlFor="registration_date">Registration Date</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input 
                    type="number" 
                    className="form-control" 
                    id="loyalty_points" 
                    name="loyalty_points" 
                    value={form.loyalty_points} 
                    onChange={handleChange}
                    placeholder="Loyalty Points" 
                    required 
                  />
                  <label htmlFor="loyalty_points">Loyalty Points</label>
                </div>
              </div>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Customers Table */}
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Customer List</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-light">
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
                {customers.length > 0 ? (
                  customers.map(c => (
                    <tr key={c.customer_id}>
                      <td>{c.customer_name}</td>
                      <td>{c.email}</td>
                      <td>{c.phone}</td>
                      <td>{c.location_id}</td>
                      <td>{c.customer_type_id}</td>
                      <td>{new Date(c.registration_date).toLocaleDateString()}</td>
                      <td>{c.loyalty_points}</td>
                      <td>
                        <button 
                          onClick={() => handleDelete(c.customer_id)} 
                          className="btn btn-sm btn-danger"
                        >
                          <i className="bi bi-trash me-1"></i>Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">No customers found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Customers;
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    company_name: '', 
    contact_person: '', 
    email: '', 
    phone: '', 
    location_id: '', 
    rating: ''
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
      setForm({ 
        company_name: '', 
        contact_person: '', 
        email: '', 
        phone: '', 
        location_id: '', 
        rating: '' 
      });
    });
  };

  const handleDelete = id => {
    axios.delete(`/api/suppliers/${id}`).then(() => fetchSuppliers());
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Suppliers</h2>
      
      {/* Supplier Form Card */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Add New Supplier</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="text"
                    className="form-control"
                    id="company_name"
                    name="company_name"
                    value={form.company_name}
                    onChange={handleChange}
                    placeholder="Company Name"
                    required
                  />
                  <label htmlFor="company_name">Company Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="text"
                    className="form-control"
                    id="contact_person"
                    name="contact_person"
                    value={form.contact_person}
                    onChange={handleChange}
                    placeholder="Contact Person"
                    required
                  />
                  <label htmlFor="contact_person">Contact Person</label>
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
                  <label htmlFor="email">Email</label>
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
                  <label htmlFor="phone">Phone</label>
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
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <select 
                    className="form-select"
                    id="rating"
                    name="rating"
                    value={form.rating}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                  <label htmlFor="rating">Rating</label>
                </div>
              </div>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Add Supplier
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Suppliers Table */}
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Supplier List</h5>
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
            <table className="table table-striped table-hover">
              <thead className="table-light">
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
                {suppliers.length > 0 ? (
                  suppliers.map(s => (
                    <tr key={s.supplier_id}>
                      <td>{s.company_name}</td>
                      <td>{s.contact_person}</td>
                      <td>{s.email}</td>
                      <td>{s.phone}</td>
                      <td>{s.location_id}</td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="rating">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className={`bi bi-star${i < s.rating ? '-fill text-warning' : ''}`}></i>
                            ))}
                          </div>
                          <span className="ms-2">{s.rating}/5</span>
                        </div>
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            title="Edit"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            onClick={() => handleDelete(s.supplier_id)} 
                            className="btn btn-sm btn-outline-danger"
                            title="Delete"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No suppliers found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">Showing {suppliers.length} suppliers</small>
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

export default Suppliers;
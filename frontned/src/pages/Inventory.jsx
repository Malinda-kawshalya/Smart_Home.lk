import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({
    product_id: '', 
    warehouse_id: '', 
    quantity: '', 
    min_stock_level: '', 
    max_stock_level: '', 
    last_restock_date: ''
  });

  const fetchInventory = () => {
    axios.get('/api/inventory')
      .then(res => setInventory(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/inventory', form).then(() => {
      fetchInventory();
      setForm({ 
        product_id: '', 
        warehouse_id: '', 
        quantity: '', 
        min_stock_level: '', 
        max_stock_level: '', 
        last_restock_date: '' 
      });
    });
  };

  const handleDelete = id => {
    axios.delete(`/api/inventory/${id}`).then(() => fetchInventory());
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Inventory Management</h2>
      
      {/* Inventory Form Card */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Add New Inventory</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="product_id" 
                    name="product_id" 
                    value={form.product_id} 
                    onChange={handleChange}
                    placeholder="Product ID" 
                    required 
                  />
                  <label htmlFor="product_id">Product ID</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="warehouse_id" 
                    name="warehouse_id" 
                    value={form.warehouse_id} 
                    onChange={handleChange}
                    placeholder="Warehouse ID" 
                    required 
                  />
                  <label htmlFor="warehouse_id">Warehouse ID</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input 
                    type="number" 
                    className="form-control" 
                    id="quantity" 
                    name="quantity" 
                    value={form.quantity} 
                    onChange={handleChange}
                    placeholder="Quantity" 
                    required 
                  />
                  <label htmlFor="quantity">Quantity</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input 
                    type="number" 
                    className="form-control" 
                    id="min_stock_level" 
                    name="min_stock_level" 
                    value={form.min_stock_level} 
                    onChange={handleChange}
                    placeholder="Min Stock Level" 
                    required 
                  />
                  <label htmlFor="min_stock_level">Min Stock Level</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input 
                    type="number" 
                    className="form-control" 
                    id="max_stock_level" 
                    name="max_stock_level" 
                    value={form.max_stock_level} 
                    onChange={handleChange}
                    placeholder="Max Stock Level" 
                    required 
                  />
                  <label htmlFor="max_stock_level">Max Stock Level</label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating mb-3">
                  <input 
                    type="date" 
                    className="form-control" 
                    id="last_restock_date" 
                    name="last_restock_date" 
                    value={form.last_restock_date} 
                    onChange={handleChange}
                    placeholder="Last Restock Date" 
                    required 
                  />
                  <label htmlFor="last_restock_date">Last Restock Date</label>
                </div>
              </div>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Add Inventory
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Inventory Table */}
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Inventory List</h5>
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
                  <th>Product ID</th>
                  <th>Warehouse ID</th>
                  <th>Quantity</th>
                  <th>Min Stock</th>
                  <th>Max Stock</th>
                  <th>Last Restock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {inventory.length > 0 ? (
                  inventory.map(item => {
                    // Calculate stock status
                    let stockStatus = 'Good';
                    let statusClass = 'bg-success';
                    
                    if (item.quantity <= item.min_stock_level) {
                      stockStatus = 'Low';
                      statusClass = 'bg-danger';
                    } else if (item.quantity < item.min_stock_level * 2) {
                      stockStatus = 'Medium';
                      statusClass = 'bg-warning';
                    }
                    
                    // Format date for display
                    const restockDate = new Date(item.last_restock_date).toLocaleDateString();
                    
                    return (
                      <tr key={item.inventory_id}>
                        <td>{item.product_id}</td>
                        <td>{item.warehouse_id}</td>
                        <td>{item.quantity}</td>
                        <td>{item.min_stock_level}</td>
                        <td>{item.max_stock_level}</td>
                        <td>{restockDate}</td>
                        <td><span className={`badge ${statusClass}`}>{stockStatus}</span></td>
                        <td>
                          <div className="btn-group" role="group">
                            <button 
                              className="btn btn-sm btn-outline-primary"
                              title="Edit"
                            >
                              <i className="bi bi-pencil"></i>
                            </button>
                            <button 
                              onClick={() => handleDelete(item.inventory_id)} 
                              className="btn btn-sm btn-outline-danger"
                              title="Delete"
                            >
                              <i className="bi bi-trash"></i>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center">No inventory items found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <small className="text-muted">Showing {inventory.length} items</small>
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

export default Inventory;
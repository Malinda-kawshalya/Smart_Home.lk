import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product_name: '',
    description: '',
    price: '',
    category_id: '',
    supplier_id: '',
    stock_quantity: ''
  });

  const fetchProducts = () => {
    axios.get('/api/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/products', form)
      .then(() => {
        fetchProducts();
        setForm({
          product_name: '',
          description: '',
          price: '',
          category_id: '',
          supplier_id: '',
          stock_quantity: ''
        });
      })
      .catch(err => console.error(err));
  };

  const handleDelete = id => {
    axios.delete(`/api/products/${id}`)
      .then(() => fetchProducts())
      .catch(err => console.error(err));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Products</h2>
      
      {/* Product Form */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">Add New Product</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="product_name" 
                    name="product_name" 
                    value={form.product_name} 
                    onChange={handleChange}
                    placeholder="Product Name" 
                    required 
                  />
                  <label htmlFor="product_name">Product Name</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-floating mb-3">
                  <input 
                    type="number" 
                    step="0.01" 
                    className="form-control" 
                    id="price" 
                    name="price" 
                    value={form.price} 
                    onChange={handleChange}
                    placeholder="Price" 
                    required 
                  />
                  <label htmlFor="price">Price ($)</label>
                </div>
              </div>
              <div className="col-md-12">
                <div className="form-floating mb-3">
                  <textarea 
                    className="form-control" 
                    id="description" 
                    name="description" 
                    value={form.description} 
                    onChange={handleChange}
                    placeholder="Description" 
                    style={{height: "100px"}}
                    required 
                  />
                  <label htmlFor="description">Description</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="category_id" 
                    name="category_id" 
                    value={form.category_id} 
                    onChange={handleChange}
                    placeholder="Category ID" 
                    required 
                  />
                  <label htmlFor="category_id">Category ID</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="supplier_id" 
                    name="supplier_id" 
                    value={form.supplier_id} 
                    onChange={handleChange}
                    placeholder="Supplier ID" 
                    required 
                  />
                  <label htmlFor="supplier_id">Supplier ID</label>
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-floating mb-3">
                  <input 
                    type="number" 
                    className="form-control" 
                    id="stock_quantity" 
                    name="stock_quantity" 
                    value={form.stock_quantity} 
                    onChange={handleChange}
                    placeholder="Stock Quantity" 
                    required 
                  />
                  <label htmlFor="stock_quantity">Stock Quantity</label>
                </div>
              </div>
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-plus-circle me-2"></i>Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Products List/Grid */}
      <div className="card">
        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Product List</h5>
          <div className="btn-group" role="group">
            <button type="button" className="btn btn-light btn-sm">List View</button>
            <button type="button" className="btn btn-outline-light btn-sm">Grid View</button>
          </div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Product Name</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Supplier</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products.map(p => (
                    <tr key={p.product_id}>
                      <td>{p.product_name}</td>
                      <td>{p.description?.substring(0, 50)}...</td>
                      <td>${parseFloat(p.price).toFixed(2)}</td>
                      <td>{p.category_id}</td>
                      <td>{p.supplier_id}</td>
                      <td>
                        {p.stock_quantity < 10 ? (
                          <span className="text-danger">{p.stock_quantity} (Low)</span>
                        ) : (
                          p.stock_quantity
                        )}
                      </td>
                      <td>
                        <div className="btn-group" role="group">
                          <button className="btn btn-sm btn-outline-primary">
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            onClick={() => handleDelete(p.product_id)} 
                            className="btn btn-sm btn-outline-danger"
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">No products found</td>
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

export default Products;
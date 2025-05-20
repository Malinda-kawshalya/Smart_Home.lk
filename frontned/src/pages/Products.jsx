import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    product_name: '', brand_id: '', category_id: '', model: '', warranty_period: '', base_price: ''
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
        setForm({ product_name: '', brand_id: '', category_id: '', model: '', warranty_period: '', base_price: '' });
      });
  };

  const handleDelete = id => {
    axios.delete(`/api/products/${id}`).then(() => fetchProducts());
  };

  return (
    <div className="container">
      <h2>Products</h2>
      <form onSubmit={handleSubmit}>
        <input name="product_name" value={form.product_name} onChange={handleChange} placeholder="Product Name" required />
        <input name="brand_id" value={form.brand_id} onChange={handleChange} placeholder="Brand ID" required />
        <input name="category_id" value={form.category_id} onChange={handleChange} placeholder="Category ID" required />
        <input name="model" value={form.model} onChange={handleChange} placeholder="Model" required />
        <input name="warranty_period" value={form.warranty_period} onChange={handleChange} placeholder="Warranty Period" required />
        <input name="base_price" value={form.base_price} onChange={handleChange} placeholder="Base Price" required />
        <button type="submit">Add Product</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Brand</th>
            <th>Category</th>
            <th>Model</th>
            <th>Warranty</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.product_id}>
              <td>{product.product_name}</td>
              <td>{product.brand_name}</td>
              <td>{product.category_name}</td>
              <td>{product.model}</td>
              <td>{product.warranty_period}</td>
              <td>${product.base_price}</td>
              <td>
                <button onClick={() => handleDelete(product.product_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
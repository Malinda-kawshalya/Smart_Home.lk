import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({
    product_id: '', warehouse_id: '', quantity: '', min_stock_level: '', max_stock_level: '', last_restock_date: ''
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
      setForm({ product_id: '', warehouse_id: '', quantity: '', min_stock_level: '', max_stock_level: '', last_restock_date: '' });
    });
  };

  const handleDelete = id => {
    axios.delete(`/api/inventory/${id}`).then(() => fetchInventory());
  };

  return (
    <div className="container">
      <h2>Inventory</h2>
      <form onSubmit={handleSubmit}>
        <input name="product_id" value={form.product_id} onChange={handleChange} placeholder="Product ID" required />
        <input name="warehouse_id" value={form.warehouse_id} onChange={handleChange} placeholder="Warehouse ID" required />
        <input name="quantity" value={form.quantity} onChange={handleChange} placeholder="Quantity" required />
        <input name="min_stock_level" value={form.min_stock_level} onChange={handleChange} placeholder="Min Stock" required />
        <input name="max_stock_level" value={form.max_stock_level} onChange={handleChange} placeholder="Max Stock" required />
        <input name="last_restock_date" value={form.last_restock_date} onChange={handleChange} placeholder="Last Restock Date (YYYY-MM-DD)" required />
        <button type="submit">Add Inventory</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Warehouse</th>
            <th>Quantity</th>
            <th>Min</th>
            <th>Max</th>
            <th>Restock Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map(item => (
            <tr key={item.inventory_id}>
              <td>{item.product_id}</td>
              <td>{item.warehouse_id}</td>
              <td>{item.quantity}</td>
              <td>{item.min_stock_level}</td>
              <td>{item.max_stock_level}</td>
              <td>{item.last_restock_date}</td>
              <td>
                <button onClick={() => handleDelete(item.inventory_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;
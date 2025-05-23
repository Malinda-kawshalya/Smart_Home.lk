import React, { useState, useEffect } from 'react';
import { Card, Form, InputGroup, Table, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { FaSearch, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import axios from 'axios';
import '../styles/customers.css';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch customers on component mount
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/customers');
        setCustomers(response.data);
        setFilteredCustomers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching customers:', err);
        setError('Failed to load customers');
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCustomers(customers);
    } else {
      const results = customers.filter(
        (customer) =>
          customer.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          customer.phone?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(results);
    }
  }, [searchTerm, customers]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Get discount range based on loyalty points
  const getDiscountRange = (loyaltyPoints) => {
    if (loyaltyPoints >= 400) return { min: 15, max: 25 };
    if (loyaltyPoints >= 300) return { min: 10, max: 20 };
    if (loyaltyPoints >= 200) return { min: 8, max: 15 };
    if (loyaltyPoints >= 100) return { min: 5, max: 10 };
    return { min: 0, max: 5 };
  };

  return (
    <div className="customers-page">
      <div className="page-header">
        <h2 className="page-title">Customer Management</h2>
        <Button variant="primary" className="add-button">
          <FaPlus /> Add Customer
        </Button>
      </div>

      <Card className="customers-card">
        <Card.Header className="bg-white">
          <InputGroup className="search-bar">
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <Form.Control
              placeholder="Search customers by name, email or phone..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>
        </Card.Header>
        <Card.Body className="p-0">
          {error && (
            <Alert variant="danger" className="m-3">
              {error}
            </Alert>
          )}

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="customer-table mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Loyalty Points</th>
                    <th>Discount Range</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => {
                      const discountRange = getDiscountRange(customer.loyalty_points);
                      return (
                        <tr key={customer._id} className="customer-row">
                          <td>{customer.customer_name}</td>
                          <td>{customer.email}</td>
                          <td>{customer.phone}</td>
                          <td>{customer.address}</td>
                          <td>
                            <Badge bg="primary" className="loyalty-badge">
                              {customer.loyalty_points} points
                            </Badge>
                          </td>
                          <td>
                            <Badge bg="success" className="discount-badge">
                              {discountRange.min}% - {discountRange.max}%
                            </Badge>
                          </td>
                          <td>
                            <div className="actions">
                              <Button variant="light" size="sm" className="action-btn edit-btn">
                                <FaEdit />
                              </Button>
                              <Button variant="light" size="sm" className="action-btn delete-btn">
                                <FaTrash />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        {searchTerm ? "No customers match your search" : "No customers found"}
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Customers;
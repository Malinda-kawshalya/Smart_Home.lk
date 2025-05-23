import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Button, Alert, Spinner, Table } from 'react-bootstrap';
import { FaPercentage } from 'react-icons/fa';
import axios from 'axios';
import '../styles/discountRates.css';

function DiscountRates() {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState('');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [discount, setDiscount] = useState('');
  const [finalPrice, setFinalPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch customers and products on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [customersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/customers'),
          axios.get('http://localhost:5000/api/products')
        ]);
        setCustomers(customersRes.data);
        setProducts(productsRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error loading data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Get discount range based on loyalty points
  const getDiscountRange = (loyaltyPoints) => {
    if (loyaltyPoints >= 400) return { min: 15, max: 25 };
    if (loyaltyPoints >= 300) return { min: 10, max: 20 };
    if (loyaltyPoints >= 200) return { min: 8, max: 15 };
    if (loyaltyPoints >= 100) return { min: 5, max: 10 };
    return { min: 0, max: 5 };
  };

  // Handle calculation
  const handleCalculate = (e) => {
    e.preventDefault();
    
    const customer = customers.find(c => c._id === selectedCustomer);
    const product = products.find(p => p._id === selectedProduct);

    if (!customer || !product) {
      setError('Please select both customer and product');
      return;
    }

    const discountAmount = (product.base_price * (parseFloat(discount) / 100));
    const calculatedPrice = product.base_price - discountAmount;
    
    setFinalPrice({
      originalPrice: product.base_price,
      discountAmount,
      finalPrice: calculatedPrice,
      discountPercentage: discount
    });
  };

  return (
    <div className="discount-rates-page">
      <h2 className="page-title">Discount Calculator</h2>
      
      <Row>
        <Col lg={6} className="mb-4">
          <Card className="calculator-card">
            <Card.Header className="bg-white">
              <div className="header-icon">
                <FaPercentage />
              </div>
              <h5>Calculate Product Discount</h5>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleCalculate}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Customer</Form.Label>
                      <Form.Select 
                        value={selectedCustomer}
                        onChange={(e) => {
                          setSelectedCustomer(e.target.value);
                          setFinalPrice(null);
                        }}
                        required
                        disabled={loading}
                      >
                        <option value="">Choose customer...</option>
                        {customers.map(customer => (
                          <option key={customer._id} value={customer._id}>
                            {customer.customer_name} (Points: {customer.loyalty_points})
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Product</Form.Label>
                      <Form.Select
                        value={selectedProduct}
                        onChange={(e) => {
                          setSelectedProduct(e.target.value);
                          setFinalPrice(null);
                        }}
                        required
                        disabled={loading}
                      >
                        <option value="">Choose product...</option>
                        {products.map(product => (
                          <option key={product._id} value={product._id}>
                            {product.product_name} (Rs.{product.base_price})
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>

                {selectedCustomer && selectedProduct && (
                  <Form.Group className="mb-4">
                    <Form.Label>
                      Discount (%) - 
                      {(() => {
                        const customer = customers.find(c => c._id === selectedCustomer);
                        const range = getDiscountRange(customer.loyalty_points);
                        return (
                          <span className="discount-range-text">
                            Range: {range.min}% - {range.max}%
                          </span>
                        );
                      })()}
                    </Form.Label>
                    <Form.Control
                      type="number"
                      step="0.1"
                      value={discount}
                      onChange={(e) => setDiscount(e.target.value)}
                      required
                      min={getDiscountRange(customers.find(c => c._id === selectedCustomer)?.loyalty_points).min}
                      max={getDiscountRange(customers.find(c => c._id === selectedCustomer)?.loyalty_points).max}
                    />
                  </Form.Group>
                )}

                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={loading || !selectedCustomer || !selectedProduct || !discount}
                  className="calculate-btn"
                >
                  {loading ? <Spinner size="sm" animation="border" /> : 'Calculate Final Price'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6} className="mb-4">
          <Card className={`result-card ${finalPrice ? 'has-result' : ''}`}>
            <Card.Header className="bg-white">
              <h5>Price Calculation Result</h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : finalPrice ? (
                <div className="price-result">
                  <div className="result-item">
                    <span className="result-label">Original Price:</span>
                    <span className="result-value">Rs.{finalPrice.originalPrice.toFixed(2)}</span>
                  </div>
                  <div className="result-item discount-amount">
                    <span className="result-label">Discount Amount:</span>
                    <span className="result-value">Rs.{finalPrice.discountAmount.toFixed(2)}</span>
                  </div>
                  <div className="divider"></div>
                  <div className="result-item final-price">
                    <span className="result-label">Final Price:</span>
                    <span className="result-value">Rs.{finalPrice.finalPrice.toFixed(2)}</span>
                  </div>
                  <div className="discount-badge">
                    -{finalPrice.discountPercentage}%
                  </div>
                </div>
              ) : (
                <div className="placeholder-result">
                  <p>Select customer, product and enter discount value to see the calculation result</p>
                </div>
              )}
            </Card.Body>
          </Card>
          
          <Card className="discount-tiers-card mt-4">
            <Card.Header className="bg-white">
              <h5>Discount Tiers</h5>
            </Card.Header>
            <Card.Body className="p-0">
              <Table className="tier-table mb-0">
                <thead>
                  <tr>
                    <th>Loyalty Points</th>
                    <th>Discount Range</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>0-99</td>
                    <td>0% - 5%</td>
                  </tr>
                  <tr>
                    <td>100-199</td>
                    <td>5% - 10%</td>
                  </tr>
                  <tr>
                    <td>200-299</td>
                    <td>8% - 15%</td>
                  </tr>
                  <tr>
                    <td>300-399</td>
                    <td>10% - 20%</td>
                  </tr>
                  <tr>
                    <td>400+</td>
                    <td>15% - 25%</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default DiscountRates;
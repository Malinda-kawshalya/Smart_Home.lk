import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

function DashboardPage() {
  // States for customers and products
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
        const [customersRes, productsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/customers'),
          axios.get('http://localhost:5000/api/products')
        ]);
        setCustomers(customersRes.data);
        setProducts(productsRes.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Error loading data');
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
    <Container fluid className="py-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-light">
          <h5 className="mb-0">Calculate Product Discount</h5>
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
              <Form.Group className="mb-3">
                <Form.Label>
                  Discount (%) - 
                  {(() => {
                    const customer = customers.find(c => c._id === selectedCustomer);
                    const range = getDiscountRange(customer.loyalty_points);
                    return ` Range: ${range.min}% - ${range.max}%`;
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
            >
              Calculate Final Price
            </Button>
          </Form>

          {finalPrice && (
            <Alert variant="success" className="mt-4">
              <h6>Price Breakdown</h6>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div>Original Price: <strong>Rs.{finalPrice.originalPrice.toFixed(2)}</strong></div>
                  <div>Discount Amount: <strong>Rs.{finalPrice.discountAmount.toFixed(2)}</strong></div>
                  <div>Final Price: <strong>Rs.{finalPrice.finalPrice.toFixed(2)}</strong></div>
                </div>
                <div className="fs-3 text-success">
                  -{finalPrice.discountPercentage}%
                </div>
              </div>
            </Alert>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default DashboardPage;
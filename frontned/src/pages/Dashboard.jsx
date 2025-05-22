import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

function DashboardPage() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(null);

  const [customerId, setCustomerId] = useState('');
  const [tierName, setTierName] = useState(null);
  
  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // For dashboard overview metrics
  const [dashboardStats, setDashboardStats] = useState({
    totalCustomers: 0,
    totalProducts: 0,
    totalOrders: 0,
    recentSales: 0
  });

  // Fetch dashboard statistics on component mount
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get('/api/dashboard/stats');
        setDashboardStats(response.data);
      } catch (err) {
        console.error('Error fetching dashboard statistics:', err);
      }
    };
    
    fetchDashboardStats();
  }, []);

  const handleDiscountCalc = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      // Real API call to calculate discount
      const response = await axios.post('/api/products/calculate-discount', {
        price: parseFloat(price),
        discountPercentage: parseFloat(discount)
      });
      
      setDiscountedPrice(response.data.discountedPrice.toFixed(2));
    } catch (err) {
      setError('Error calculating discount. Please try again.');
      console.error('Discount calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTierFetch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setTierName(null);
    
    try {
      // Real API call to fetch customer tier
      const response = await axios.get(`/api/customers/${customerId}/tier`);
      setTierName(response.data.tierName);
    } catch (err) {
      setError('Error fetching customer tier. Please check the customer ID and try again.');
      console.error('Customer tier fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="py-4">
      {/* Dashboard overview stats */}
      <h2 className="mb-4">Dashboard</h2>
      <Row className="mb-4">
        <Col md={3}>
          <Card className="shadow-sm bg-primary text-white h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-uppercase opacity-75">Total Customers</h6>
                  <h2>{dashboardStats.totalCustomers}</h2>
                </div>
                <div className="icon-box">
                  <i className="bi bi-people-fill fs-1 opacity-50"></i>
                </div>
              </div>
              <small className="opacity-75">+3.8% since last month</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm bg-success text-white h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-uppercase opacity-75">Total Products</h6>
                  <h2>{dashboardStats.totalProducts}</h2>
                </div>
                <div className="icon-box">
                  <i className="bi bi-box-seam fs-1 opacity-50"></i>
                </div>
              </div>
              <small className="opacity-75">+2.1% since last month</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm bg-info text-white h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-uppercase opacity-75">Total Orders</h6>
                  <h2>{dashboardStats.totalOrders}</h2>
                </div>
                <div className="icon-box">
                  <i className="bi bi-cart-check fs-1 opacity-50"></i>
                </div>
              </div>
              <small className="opacity-75">+12.5% since last month</small>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="shadow-sm bg-warning text-white h-100">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h6 className="text-uppercase opacity-75">Recent Sales</h6>
                  <h2>${dashboardStats.recentSales.toLocaleString()}</h2>
                </div>
                <div className="icon-box">
                  <i className="bi bi-currency-dollar fs-1 opacity-50"></i>
                </div>
              </div>
              <small className="opacity-75">+5.3% since last week</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h4 className="mb-3">Customer Tools</h4>
      <Row>
        {/* Calculate Discount */}
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Calculate Discounted Price</h5>
            </Card.Header>
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleDiscountCalc}>
                <Form.Group className="mb-3">
                  <Form.Label>Original Price</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    placeholder="Enter original price"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Discount (%)</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    required
                    placeholder="Enter discount percentage"
                  />
                </Form.Group>
                <Button 
                  variant="primary" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Calculating...
                    </>
                  ) : (
                    'Calculate'
                  )}
                </Button>
              </Form>
              {discountedPrice && !loading && (
                <Alert variant="success" className="mt-3">
                  <div className="d-flex justify-content-between">
                    <div>
                      <div>Original Price: <strong>${price}</strong></div>
                      <div>Discount Amount: <strong>${(price * (discount / 100)).toFixed(2)}</strong></div>
                      <div>Final Price: <strong>${discountedPrice}</strong></div>
                    </div>
                    <div className="fs-3 text-success">
                      -{discount}%
                    </div>
                  </div>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Get Customer Tier */}
        <Col md={6}>
          <Card className="mb-4 shadow-sm">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Get Customer Tier Name</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleTierFetch}>
                <Form.Group className="mb-3">
                  <Form.Label>Customer ID</Form.Label>
                  <Form.Control
                    type="number"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    required
                    placeholder="Enter customer ID"
                  />
                </Form.Group>
                <Button 
                  variant="info" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Fetching...
                    </>
                  ) : (
                    'Get Tier'
                  )}
                </Button>
              </Form>
              {tierName && !loading && (
                <Alert variant="secondary" className="mt-3">
                  <div className="d-flex align-items-center">
                    <div className={`me-3 p-2 rounded-circle bg-${getTierColor(tierName)}`}>
                      <i className="bi bi-award text-white fs-4"></i>
                    </div>
                    <div>
                      <div>Customer ID: <strong>{customerId}</strong></div>
                      <div>Tier Name: <strong>{tierName}</strong></div>
                    </div>
                  </div>
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

// Helper function to get color based on tier
function getTierColor(tierName) {
  switch (tierName.toLowerCase()) {
    case 'platinum':
      return 'dark';
    case 'gold':
      return 'warning';
    case 'silver':
      return 'secondary';
    case 'bronze':
      return 'danger';
    default:
      return 'info';
  }
}

export default DashboardPage;
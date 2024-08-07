import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './login.css';

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
        <div className="background">
          <Container className="mt-5">
            <Row className="justify-content-md-center">
              <Col md={6}>
                <Card className="p-4 shadow-lg">
                  <h2 className="text-center mb-4">
                    Set Up Your <i className="bi bi-mic mic-icon"></i>
                  </h2>
                  <Form>
                    <Form.Group className="mb-3" controlId="formFullName">
                      <Form.Label className="form-label">
                        <i className="bi bi-person-fill"></i> Enter Your FullName
                      </Form.Label>
                      <Form.Control type="text" placeholder="First Last Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                      <Form.Label className="form-label">
                        <i className="bi bi-person-badge-fill"></i> Enter Your Email
                      </Form.Label>
                      <Form.Control type="text" placeholder="Create your username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formLocation">
                      <Form.Label className="form-label">
                        <i className="bi bi-geo-alt-fill"></i> Enter Your Password
                      </Form.Label>
                      <Form.Control type="text" placeholder="Select your location" />
                    </Form.Group>
                    <div className="d-flex justify-content-between">
                      <Button variant="secondary">Go back</Button>
                      <Button variant="primary">Continue</Button>
                    </div>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
  );
};

export default LoginSignup;
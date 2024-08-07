import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useHistory, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import micImg from '../assets/images/image.png';
import './login.css';

const LoginSignup = () => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  const handleSkip = (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    navigate('/home'); // Navigate to the home page
  };


  return (
    <div className="background">
      <Container className="d-flex align-items-center justify-content-center h-100">
        <Row className="justify-content-md-center w-100">
          <Col md={6}>
            <Card className="p-5 shadow-lg custom-card" style={{borderRadius:15}}>
              <h2 className="text-center mb-4">
                {isSignup ? 'Sign Up' : 'Log In'} to VERA
              </h2>
              <div className="text-center mb-4">
                <img
                  src={micImg}
                  alt="Mic Icon"
                  className="mic-icon"
                />
              </div>
              <Form>
                {isSignup ? (
                  <>
                    <Form.Group className="mb-3" controlId="formFullName">
                      <Form.Label className="form-label">
                        <i className="bi bi-person-fill"></i> Enter Your Full Name
                      </Form.Label>
                      <Form.Control type="text" placeholder="First Last Name" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formUsername">
                      <Form.Label className="form-label">
                        <i className="bi bi-person-badge-fill"></i> Enter Your Email
                      </Form.Label>
                      <Form.Control type="email" placeholder="Create your username" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label className="form-label">
                        <i className="bi bi-lock-fill"></i> Enter Your Password
                      </Form.Label>
                      <Form.Control type="password" placeholder="Create your password" />
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <Form.Group className="mb-3" controlId="formEmail">
                      <Form.Label className="form-label">
                        <i className="bi bi-envelope-fill"></i> Email
                      </Form.Label>
                      <Form.Control type="email" placeholder="Enter your email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formPassword">
                      <Form.Label className="form-label">
                        <i className="bi bi-lock-fill"></i> Password
                      </Form.Label>
                      <Form.Control type="password" placeholder="Enter your password" />
                      <div className="text-end mt-2">
                        <a href="#" className="text-secondary" style={{fontWeight:600}} onClick={handleSkip} >Skip for Now</a>
                      </div>
                    </Form.Group>
                  </>
                )}
                <div className="d-flex justify-content-center mt-4">
                  <Button variant={"primary"} onClick={toggleForm}>
                    {isSignup ? 'Sign Up' : 'Login'}
                  </Button>
                </div>
              </Form>
              <div className="text-center mt-3">
                {isSignup ? (
                  <p>
                    Already have an account?{' '}
                    <span className="text-primary" onClick={toggleForm} style={{cursor: 'pointer'}}>
                      Login
                    </span>
                  </p>
                ) : (
                  <p>
                    Don't have an account?{' '}
                    <span className="text-primary" onClick={toggleForm} style={{cursor: 'pointer'}}>
                      Sign Up
                    </span>
                  </p>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginSignup;
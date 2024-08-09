import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import micImg from './assets/images/image.png';
import { Outlet } from 'react-router-dom';
import './style.css';
import animationData from './assets/Animation/Animation.json';
import Lottie from 'react-lottie';

const Layout = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };
  return (
    <div className="layout-container">
      <Navbar bg="light" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home">
            <div className="d-flex align-items-center">
              <div className="animation-circle" style={{ marginRight: '10px' }}>
                <Lottie
                  options={defaultOptions}
                  style={{ height: '185%', width: '100%' }}
                />
              </div>
              <span style={{ fontWeight: '600', fontSize: '1.25rem' }}>VERA</span>
            </div>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/history">Chat History</Nav.Link>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="full-width-wrapper">
        <Outlet />
      </div>

      <footer className="footer mt-auto py-3 bg-light">
        <div className="full-width-wrapper">
          <span className="text-muted">© 2024 CosmotechAi</span>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
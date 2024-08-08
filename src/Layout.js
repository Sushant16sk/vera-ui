import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import micImg from './assets/images/image.png';
import { Outlet } from 'react-router-dom';
import './style.css';

const Layout = () => {
  return (
    <div className="layout-container">
      <Navbar bg="light" expand="lg" className="custom-navbar">
        <Container>
          <Navbar.Brand href="#home">
            <img src={micImg} alt="Mic Icon" className="navbar-icon" />
            VERA
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
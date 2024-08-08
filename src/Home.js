import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Lottie from 'react-lottie';
import animationData from './assets/Animation/Animation.json'; // Adjust the path as needed
import './style.css';

const Home = () => {
  const navigate = useNavigate();

  const handleActivate = () => {
    navigate('/voice-chat'); 
  };

  // Default options for Lottie animation
  const defaultOptions = {
    loop: true,
    autoplay: true, 
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="home-content">
      <div className="animation-wrapper">
        <Lottie options={defaultOptions} height={300} width={120} />
      </div>
      <Container className="text-center">
        <h1>Welcome to VERA</h1>
        <p className="intro-text mt-3">
          VERA is your intelligent companion designed to simplify and enhance your daily life. 
          With its advanced features and user-friendly interface, VERA makes managing tasks and staying organized effortless.
        </p>
        <Button variant="primary" className="mt-4" onClick={handleActivate}>Activate Your VERA</Button>
      </Container>
    </div>
  );
};

export default Home;
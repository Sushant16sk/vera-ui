// Home.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './style.css';
import { useNavigate } from 'react-router-dom';
import animationImg from './assets/Animation/Animation.webm';


const Home = () => {

  const navigate = useNavigate();

  const handleActivate = () => {
    navigate('/voice-chat'); // Navigate to VoiceChat component
  };

  return (
    <div className="home-content">
      {/* <div className="animation-wrapper">
        <img src={animationImg} alt="Loading Animation" />
      </div> */}
      <Container className="text-center">
        <h1>Welcome to VERA</h1>
        <p className="intro-text mt-3">
          VERA is your intelligent companion designed to simplify and enhance your daily life. 
          With its advanced features and user-friendly interface, VERA makes managing tasks and staying organized effortless.
        </p>
        <Button variant="primary" className="mt-4" onClick={handleActivate} >Activate Your VERA</Button>
      </Container>
    </div>
  );
};

export default Home;
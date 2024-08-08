// VoiceChat.js
import React from 'react';
import { Container, Button } from 'react-bootstrap';
import micImg from './assets/images/image.png'; // Adjust the path as needed
import './style.css'; // Ensure you have the CSS styles

const VoiceChat = () => {
  return (
    <div className="voice-chat-container">
      <div className="left-panel">
        <Button variant="none" className="mic-button">
          <img src={micImg} alt="Mic Icon" className="mic-icon" />
        </Button>
      </div>
      <div className="right-panel">
        <h2>Chatting with VERA</h2>

      </div>
    </div>
  );
};

export default VoiceChat;

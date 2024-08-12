import React, { useState } from 'react';
import './style.css';

const History = () => {
  const [chats, setChats] = useState([
    { id: 1, title: 'Chat 1', createdAt: '2024-08-01T10:00:00', lastExecuted: null },
    { id: 2, title: 'Chat 2', createdAt: '2024-08-02T11:00:00', lastExecuted: null }
  ]);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleRechatClick = (chat) => {
    const updatedChats = chats.map(c => 
      c.id === chat.id ? { ...c, lastExecuted: new Date().toISOString() } : c
    );
    setChats(updatedChats);
    setSelectedChat(chat.id);
  };

  const handleDeleteClick = (id) => {
    console.log(`Delete chat with ID: ${id}`);
  };

  const handleClearHistory = () => {
    console.log('Clear history');
  };

  return (
    <div className="history-page">
      <div className="header">
        <h1>History Page</h1>
        <button className="clear-history-button" onClick={handleClearHistory}>
          Clear History
        </button>
      </div>
      <div className="history-list">
        {chats.map(chat => (
          <div key={chat.id} className="history-item">
            <div className="chat-details">
              <h2 className="chat-title">{chat.title}</h2>
              <p className={chat.lastExecuted ? 'hidden' : 'chat-created'}>
                Created on: {new Date(chat.createdAt).toLocaleString()}
              </p>
              {chat.lastExecuted && (
                <p className="chat-last-executed">
                  Last executed on: {new Date(chat.lastExecuted).toLocaleString()}
                </p>
              )}
            </div>
            <div className="history-actions">
              <button
                className="rechat-button"
                onClick={() => handleRechatClick(chat)}
              >
                Rechat
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteClick(chat.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
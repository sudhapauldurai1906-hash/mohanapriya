import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './Chat.css';

const socket = io('http://localhost:5000');

function Chat() {
  const [username, setUsername] = useState('');
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setChat((prev) => [...prev, data]);
    });

    socket.on('user_list', (list) => {
      setUsers(list);
    });

    return () => {
      socket.off('receive_message');
      socket.off('user_list');
    };
  }, []);

  const joinChat = () => {
    if (username.trim() === '') return;
    setJoined(true);
    socket.emit('join', username);
  };

  const sendMessage = () => {
    if (message.trim() === '') return;
    socket.emit('send_message', message);
    setMessage('');
  };

  if (!joined) {
    return (
      <div className="chat-login">
        <h2>Enter Username</h2>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <button onClick={joinChat}>Join Chat</button>
      </div>
    );
  }

  return (
    <div className="chat-container">
      <div className="user-list">
        <h3>Online Users</h3>
        {users.map((user, i) => (
          <div key={i}>{user}</div>
        ))}
      </div>
      <div className="chat-box">
        <div className="messages">
          {chat.map((c, i) => (
            <div key={i} className={`message ${c.user === username ? 'own' : ''}`}>
              <strong>{c.user}:</strong> {c.message}
            </div>
          ))}
        </div>
        <div className="input-box">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type message..."
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
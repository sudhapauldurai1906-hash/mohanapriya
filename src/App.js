import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import "./App.css";

const socket = io("http://localhost:5000", { autoConnect: false });

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Handle login/register
  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isRegister ? "register" : "login";
    try {
      const res = await axios.post(`http://localhost:5000/${endpoint}`, {
        username,
        password,
      });
      if (res.data.success) {
        if (isRegister) {
          alert("Registration successful! Please login now.");
          setIsRegister(false);
        } else {
          setLoggedIn(true);
          socket.connect();
          socket.emit("join", username);
        }
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  useEffect(() => {
    socket.on("chat message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("chat message");
      socket.off("onlineUsers");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim() === "") return;
    const msgData = {
      text: message,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      user: username,
    };
    socket.emit("chat message", msgData);
    setMessage("");
  };

  return (
    <div className="chat-container">
      {!loggedIn ? (
        <div className="join-container">
          <h2>{isRegister ? "📝 Register" : "🔐 Login"}</h2>
          <form onSubmit={handleAuth}>
            <div className="input-box">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="input-box password-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit">{isRegister ? "Register" : "Login"}</button>
          </form>

          <p className="toggle-text">
            {isRegister ? "Already have an account?" : "Don’t have an account?"}{" "}
            <span className="toggle-link" onClick={() => setIsRegister(!isRegister)}>
              {isRegister ? "Login" : "Register"}
            </span>
          </p>
        </div>
      ) : (
        <div className="chat-box">
          <div className="header">
            Welcome, {username} 👋
            <div className="online-users">Online: {onlineUsers.join(", ")}</div>
          </div>

          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.user === username ? "my-message" : "other-message"
                }`}
              >
                <div className="msg-user">{msg.user}</div>
                <div className="msg-text">{msg.text}</div>
                <div className="msg-time">{msg.time}</div>
              </div>
            ))}
          </div>

          <div className="input-area">
            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


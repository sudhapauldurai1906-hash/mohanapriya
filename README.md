import React, { useState } from 'react';
const Message = ({ text, sender }) => {
  const isUser = sender === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div className={`p-2 rounded-lg max-w-xs ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
        {text}
      </div>
    </div>
  );
};
const ChatWindow = ({ messages }) => {
  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {messages.map((msg, index) => (
        <Message key={index} text={msg.text} sender={msg.sender} />
      ))}
    </div>
  );
};
const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSend();
  };
  return (
    <div className="flex p-4 border-t border-gray-300">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
        className="flex-1 p-2 border rounded-l-lg outline-none"
      />
      <button
        onClick={handleSend}
        className="bg-blue-500 text-white px-4 rounded-r-lg"
      >
        Send
      </button>
    </div>
  );
};
const App = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I help you?', sender: 'bot' },
  ]);
  const handleSend = (text) => {
    setMessages([...messages, { text, sender: 'user' }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "I'm a bot!", sender: 'bot' }]);
    }, 1000);
  };
  return (
    <div className="flex flex-col h-screen w-full max-w-md mx-auto border rounded-lg shadow-lg">
      <ChatWindow messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default App;

<<<<<<< HEAD
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
=======
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
>>>>>>> 366e4d1d7aae395d37ab91082220bcf0b4530f39

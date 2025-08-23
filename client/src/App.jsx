import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./components/Chat";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    if (username.trim() !== "") {
      setIsLoggedIn(true);
    }
  };

  return (
    <div>
      {!isLoggedIn ? (
        <div className="login-container">
          <div className="login-box">
            <h2>🚀 Welcome to Chat App</h2>
            <input
              type="text"
              placeholder="Enter your username..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button onClick={handleLogin}>Join Chat</button>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} />
      )}
    </div>
  );
}

export default App;

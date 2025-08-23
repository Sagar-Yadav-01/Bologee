import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";

function Chat({ socket, username }) {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);

  useEffect(() => {
    // Listen for messages once
    const handleMessage = (payload) => {
      setChat((prev) => [...prev, payload]);
    };

    socket.on("chat message", handleMessage);

    // ✅ cleanup to avoid duplicates
    return () => {
      socket.off("chat message", handleMessage);
    };
  }, []); // ❌ remove [socket], use [] instead

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const sendMessage = () => {
    if (message.trim() === "") return;

    const payload = { username, message };

    socket.emit("chat message", payload);

    // Don't push message twice (backend will emit it back)
    // setChat((prev) => [...prev, payload]); ❌ remove this line

    setMessage("");
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <h3>💬 Chat Room</h3>
        <span>
          Logged in as <b>{username}</b>
        </span>
      </header>

      <div className="chat-box">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.username === username ? "own" : "other"
            }`}
          >
            <span className="sender">{msg.username}</span>
            <p>{msg.message}</p>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      <div className="chat-input">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;

import React from "react";

function Message({ msg, username }) {
  const isMyMessage = msg.user === username;

  return (
    <div className={`message ${isMyMessage ? "my-message" : "other-message"}`}>
      <div><strong>{msg.user}</strong></div>
      <div>{msg.text}</div>
      <div className="message-info">{msg.time}</div>
    </div>
  );
}

export default Message;

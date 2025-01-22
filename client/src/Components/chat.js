// Chat.jsx

import { useState, useEffect } from "react";
import io from "socket.io-client";
import "bootstrap-icons/font/bootstrap-icons.css";


const socket = io("http://localhost:5000"); // Replace with your server address

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    // Socket.IO event listeners

    // Listen for incoming messages
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });

    return () => {
      // Cleanup on component unmount
      socket.off("message");
    };
  }, [messages]);

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      const message = { text: messageInput, timestamp: new Date() };
      socket.emit("message", message);
      setMessageInput("");
    }
  };

  console.log("lkjlkjlkjlkjlk",messages)


  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-whatsapp">
      <div className="chat-container">
        <div className="chat-header bg-success text-white py-3 px-4 d-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center">
            <img
              src="https://www.w3schools.com/w3images/avatar2.png"
              alt="Profile"
              className="rounded-circle me-2"
              style={{ width: '40px', height: '40px' }}
            />
            <div>
              <h6 className="mb-0">Chat Room</h6>
              <small className="text-light">Online</small>
            </div>
          </div>
          <div className="icons">
            <i className="bi bi-search me-3 text-white"></i>
            <i className="bi bi-three-dots text-white"></i>
          </div>
        </div>
        <div
          className="chat-body p-3 overflow-auto"
          style={{ maxHeight: "400px" }}
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`d-flex mb-3 ${index % 2 == 0 ? "justify-content-start" : "justify-content-end"
                }`}
            >
              <div
                className={`message-bubble ${index % 2 == 0 ? "bg-light" : "bg-success text-white"
                  } px-3 py-2 rounded shadow-sm`}
              >
                {msg.text}
                <div className="text-end small mt-1 text-muted">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="chat-footer d-flex align-items-center p-3 bg-light">
          <input
            type="text"
            className="form-control me-2 rounded-pill"
            placeholder="Type a message"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            className="btn btn-success rounded-circle"
            onClick={sendMessage}
            disabled={!messageInput.trim()}
          >
            <i className="bi bi-send"></i>
          </button>
        </div>
      </div>
    </div>
  


  );
}

export default Chat;

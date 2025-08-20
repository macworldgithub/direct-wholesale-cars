"use client";

import React, { useState, useRef, useEffect } from "react";
import "./chatPage.scss";
import LocalizedInput from "@/components/UIComponents/LocalizedInput/LocalizedInput";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import axios from "axios";
import { SERVER_URL } from "@/config/server";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    if (!input.trim()) return;

    // push user message
    const userMessage = { text: input, sender: "user" };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    setInput("");
    setLoading(true);

    try {
      const response = await axios.post(`${SERVER_URL}/query`, {
        query: input,
      });

      setMessages([
        ...newMessages,
        {
          text: response.data.message,
          sender: "bot",
        },
      ]);
    } catch (error) {
      console.error("Query failed", error);
      setMessages([
        ...newMessages,
        {
          text: "Sorry, something went wrong. Please try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-wrapper">
      <div className="chat-container">
        <div className="chat-box">
          {/* {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>{msg.text}</p>
            </div>
          ))} */}
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`}>
              <p>
                {msg.text.split(/(https?:\/\/[^\s]+)/g).map((part, i) =>
                  part.match(/https?:\/\/[^\s]+/g) ? (
                    <a
                      key={i}
                      href={part}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chat-link"
                    >
                      {part}
                    </a>
                  ) : (
                    part
                  )
                )}
              </p>
            </div>
          ))}

          {loading && (
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <div className="input-box">
          <LocalizedInput
            name="chatMessage"
            value={input}
            onChange={setInput}
            placeholderKey="Type a message..."
            size="xl"
            className="chat-input"
            onKeyDown={handleKeyPress as any}
          />

          <LocalizedButton
            label="Send"
            onClick={handleSend}
            variant="filled"
            size="md"
            className="chat-button"
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

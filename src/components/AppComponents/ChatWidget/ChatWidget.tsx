"use client";

import React, { useState } from "react";
import "./ChatWidget.scss";

// Import MUI Icons
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import LocalizedInput from "@/components/UIComponents/LocalizedInput/LocalizedInput";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import LocalizedHeading from "@/components/UIComponents/LocalizedHeading/LocalizedHeading";

interface User {
  id: number;
  name: string;
  avatar: string;
  lastMsg: string;
}

const usersMock: User[] = [
  {
    id: 1,
    name: "Alice",
    avatar: "/images/default-avatar.png",
    lastMsg: "See you soon!",
  },
  {
    id: 2,
    name: "Bob",
    avatar: "/images/default-avatar.png",
    lastMsg: "Let’s catch up later.",
  },
  {
    id: 3,
    name: "Charlie",
    avatar: "/images/default-avatar.png",
    lastMsg: "Got the docs!",
  },
];

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [activeUser, setActiveUser] = useState<User>(usersMock[0]);
  const [input, setInput] = useState("");

  return (
    <div className="chat-widget">
      {/* Floating toggle */}
      {!open && (
        <button className="chat-toggle" onClick={() => setOpen(true)}>
          <ChatIcon />
        </button>
      )}

      {open && (
        <div className="chat-app">
          {/* Sidebar */}
          <aside className="sidebar">
            <header className="sidebar-header">
              <LocalizedHeading heading="Chats" level={6}/>
              <button className="close-btn" onClick={() => setOpen(false)}>
                <CloseIcon />
              </button>
            </header>
            <ul className="user-list">
              {usersMock.map((user) => (
                <li
                  key={user.id}
                  className={`user-item ${
                    activeUser.id === user.id ? "active" : ""
                  }`}
                  onClick={() => setActiveUser(user)}
                >
                  <img src={user.avatar} alt={user.name} />
                  <div>
                    <p className="name">{user.name}</p>
                    <p className="last-msg">{user.lastMsg}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>

          {/* Chat Window */}
          <section className="chat-window">
            <header className="chat-header">
              <img src={activeUser.avatar} alt={activeUser.name} />
              <LocalizedHeading heading={activeUser.name} level={5} />
            </header>

            <div className="chat-messages">
              {/* Sample messages */}
              <div className="message bot">
                Hey {activeUser.name}, how are you?
              </div>
              <div className="message user">Doing good! Check this out.</div>

              {/* Example file */}
              <div className="message user file">
                <a
                  href="/docs/sample.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  📄 sample.pdf
                </a>
              </div>

              {/* Example image */}
              <div className="message bot image">
                <img src="/images/sample.jpg" alt="shared" />
              </div>
            </div>

            {/* Input */}
            <footer className="chat-input-box">
              <LocalizedInput
                name="chatMessage"
                value={input}
                onChange={setInput}
                placeholderKey="Type a message..."
                size="lg"
              />
              <div className="chat-actions">
                <LocalizedButton
                  label={<AttachFileIcon />}
                  variant="outlined"
                  outlineColor="black"
                  size="sm"
                />
                <LocalizedButton
                  label={<MicIcon />}
                  variant="outlined"
                  outlineColor="black"
                  size="sm"
                />
                <LocalizedButton
                  className="send"
                  label={<SendIcon />}
                  variant="filled"
                  size="sm"
                  onClick={() => {
                    if (input.trim()) {
                      console.log("Sending:", input);
                      setInput("");
                    }
                  }}
                />
              </div>
            </footer>
          </section>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

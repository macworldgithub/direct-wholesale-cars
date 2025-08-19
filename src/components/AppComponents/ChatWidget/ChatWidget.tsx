"use client";

import React, { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import axios from "axios";
import "./ChatWidget.scss";

import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import LocalizedInput from "@/components/UIComponents/LocalizedInput/LocalizedInput";
import LocalizedButton from "@/components/UIComponents/LocalizedButton/LocalizedButton";
import LocalizedHeading from "@/components/UIComponents/LocalizedHeading/LocalizedHeading";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { BACKEND_URL } from "@/config/server";

interface ChatRoom {
  roomId: string;
  otherUser: { id: string; name: string } | null;
  lastMessage: any;
  lastMessageAt: string;
  unreadCount: number;
  isUnseen: boolean;
}

interface Message {
  _id: string;
  senderId: string;
  text?: string;
  images?: string[];
  createdAt: string;
  roomId: string;
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);
  const wholesaler = useSelector(
    (state: RootState) => state.SigninWholesaler.wholesaler
  );
  const user = dealer || wholesaler;
  const userId = user?._id;

  useEffect(() => {
    axios
      .get<ChatRoom[]>(`${BACKEND_URL}/rooms/chat-list?userId=${userId}`)
      .then((res) => {
        setRooms(res.data);
        if (res.data.length > 0) {
          setActiveRoom(res.data[0]);
        }
      });
  }, []);

  useEffect(() => {
    const s = io(`${BACKEND_URL}`, { query: { userId } });

    s.on("connect", () => console.log("Socket connected"));

    s.on("newMessage", (msg: Message) => {
      setMessages((prev) =>
        msg.roomId === activeRoom?.roomId ? [...prev, msg] : prev
      );

      setRooms((prev) =>
        prev.map((r) =>
          r.roomId === msg.roomId
            ? {
              ...r,
              lastMessage: msg,
              lastMessageAt: msg.createdAt,
              unreadCount:
                msg.senderId !== userId && r.roomId !== activeRoom?.roomId
                  ? r.unreadCount + 1
                  : r.unreadCount,
            }
            : r
        )
      );
    });

    s.on("roomInvite", (invite) => {
      console.log("New room invite:", invite);
    });

    s.on("seen", ({ roomId, userId: seenBy }) => {
      console.log(`👀 Messages in room ${roomId} seen by ${seenBy}`);
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [activeRoom?.roomId]);

  useEffect(() => {
    if (!activeRoom) return;
    axios
      .get<Message[]>(
        `${BACKEND_URL}/messages/room/${activeRoom.roomId}?limit=50`
      )
      .then((res) => setMessages(res.data));

    setRooms((prev) =>
      prev.map((r) =>
        r.roomId === activeRoom.roomId ? { ...r, unreadCount: 0 } : r
      )
    );

    socket?.emit("seenMessages", {
      roomId: activeRoom.roomId,
      userId,
    });
  }, [activeRoom, socket, userId]);

  const sendMessage = () => {
    if (!input.trim() || !socket || !activeRoom) return;

    console.log("Emitting sendMessage:", {
      senderId: userId,
      receiverId: activeRoom.otherUser?.id,
      text: input,
    });

    socket.emit("sendMessage", {
      senderId: userId,
      receiverId: activeRoom.otherUser?.id,
      text: input,
    });

    setInput("");
  };

  return (
    <div className="chat-widget">
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
              <LocalizedHeading heading="Chats" level={6} />
              <button className="close-btn" onClick={() => setOpen(false)}>
                <CloseIcon />
              </button>
            </header>
            <ul className="user-list">
              {rooms.map((room) => (
                <li
                  key={room.roomId}
                  className={`user-item ${activeRoom?.roomId === room.roomId ? "active" : ""
                    }`}
                  onClick={() => setActiveRoom(room)}
                >
                  <img
                    src="/images/default-avatar.png"
                    alt={room.otherUser?.name}
                  />
                  <div>
                    <p className="name">{room.otherUser?.name ?? "Unknown"}</p>
                    <p className="last-msg">
                      {room.lastMessage?.text ?? "No messages"}
                    </p>
                  </div>
                  {room.unreadCount > 0 && (
                    <span className="unread">{room.unreadCount}</span>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          {activeRoom && (
            <section className="chat-window">
              <header className="chat-header">
                <img
                  src="/images/default-avatar.png"
                  alt={activeRoom.otherUser?.name}
                />
                <LocalizedHeading
                  heading={activeRoom.otherUser?.name ?? "Unknown"}
                  level={5}
                />
              </header>

              <div className="chat-messages">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    className={`message ${msg.senderId === userId ? "user" : "bot"
                      }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

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
                    onClick={sendMessage}
                  />
                </div>
              </footer>
            </section>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

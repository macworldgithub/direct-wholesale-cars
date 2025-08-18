"use client";

import React, { useEffect, useState, useRef } from "react";
import io, { Socket } from "socket.io-client";
import "./ChatWidget.scss";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import SendIcon from "@mui/icons-material/Send";
import { BACKEND_URL } from "@/config/server";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

interface Message {
  _id: string;
  chatRoomId: string;
  senderId: string;
  receiverId: string;
  text?: string;
  images?: string[];
  audios?: string[];
  videos?: string[];
  documents?: string[];
  seen?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ChatRoom {
  _id: string;
  participants: string[]; // ["userA", "userB"]
  lastMessageId?: string;
  lastMessageSenderId?: string;
  lastMessageAt?: string;
  unreadCount?: Record<string, number>; // { userId: number }
}

interface RoomParticipantInfo {
  id: string;
  name: string;
  avatar?: string;
}

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [participantInfo, setParticipantInfo] = useState<
    Record<string, RoomParticipantInfo>
  >({});
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const socketRef = useRef<Socket | null>(null);

  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);
  const wholesaler = useSelector(
    (state: RootState) => state.SigninWholesaler.wholesaler
  );
  const user = dealer || wholesaler;
  const userId = user?._id;

  // Fetch chat list from API
  const fetchChatList = async () => {
    if (!userId) return;
    try {
      const res = await fetch(
        `${BACKEND_URL}/rooms/chat-list?userId=${userId}`
      );
      console.log(res);
      const data: ChatRoom[] = await res.json();
      const chatRooms: ChatRoom[] = data.map((room) => ({
        _id: room._id,
        participants: room.participants,
        lastMessageId: room.lastMessageId,
        lastMessageSenderId: room.lastMessageSenderId,
        lastMessageAt: room.lastMessageAt,
        unreadCount: room.unreadCount || {},
      }));
      setRooms(chatRooms);
      console.log(chatRooms);
      // Extract participant IDs and store them (you might need to fetch their details elsewhere)
      const participants: Record<string, RoomParticipantInfo> = {};
      chatRooms.forEach((room) => {
        room.participants.forEach((participantId) => {
          if (participantId !== userId && !participants[participantId]) {
            participants[participantId] = {
              id: participantId,
              name: `User ${participantId.slice(0, 5)}`, // Default name
              avatar: undefined,
            };
          }
        });
      });
      setParticipantInfo(participants);
    } catch (err) {
      console.error("Failed to fetch chat list", err);
    }
  };

  // Initialize socket
  useEffect(() => {
    if (!userId) return;

    const socket = io(BACKEND_URL, { query: { userId } });
    console.log(socket, "socket initialized");
    socketRef.current = socket;
    socket.emit("joinUser", userId);

    socket.on("roomInvite", ({ chatRoomId, senderId, receiverId }) => {
      // Update rooms list
      setRooms((prev) => {
        if (!prev.some((room) => room._id === chatRoomId)) {
          return [
            ...prev,
            {
              _id: chatRoomId,
              participants: [senderId, receiverId],
              unreadCount: { [userId]: 1 },
            },
          ];
        }
        return prev;
      });
    });

    socket.on("newMessage", (msg: Message) => {
      // Update messages if active room matches
      if (activeRoom?._id === msg.chatRoomId) {
        setMessages((prev) => [...prev, msg]);
      }

      // Update rooms with new message info
      setRooms((prev) =>
        prev.map((room) =>
          room._id === msg.chatRoomId
            ? {
                ...room,
                lastMessageId: msg._id,
                lastMessageSenderId: msg.senderId,
                lastMessageAt: msg.createdAt,
                unreadCount: {
                  ...room.unreadCount,
                  [userId]:
                    msg.senderId !== userId
                      ? (room.unreadCount?.[userId] || 0) + 1
                      : 0,
                },
              }
            : room
        )
      );
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, activeRoom]);

  // Fetch chat list on mount
  useEffect(() => {
    fetchChatList();
  }, [userId]);

  useEffect(() => {
  const handler = (e: CustomEvent<{ receiverId: string; name: string }>) => {
    if (!userId) return;
    
    const { receiverId, name } = e.detail;

    // Update participant info
    setParticipantInfo(prev => ({
      ...prev,
      [receiverId]: {
        id: receiverId,
        name,
        avatar: undefined
      }
    }));

    // Check if room with this participant already exists
    const existingRoom = rooms.find(room => 
      room.participants.includes(receiverId) && room.participants.includes(userId)
    );

    if (existingRoom) {
      setActiveRoom(existingRoom);
    } else {
      // Create a new temporary room (will be replaced when socket creates actual room)
      const tempRoom: ChatRoom = {
        _id: `temp-${Date.now()}`,
        participants: [userId, receiverId],
        unreadCount: { [userId]: 0 }
      };
      
      setRooms(prev => [...prev, tempRoom]);
      setActiveRoom(tempRoom);
      
      // Emit socket event to create actual room
      socketRef.current?.emit("createRoom", {
        participantIds: [userId, receiverId]
      });
    }
  };

  window.addEventListener("openChat", handler as EventListener);
  return () => window.removeEventListener("openChat", handler as EventListener);
}, [rooms, userId]);

  const handleRoomClick = async (room: ChatRoom) => {
    setActiveRoom(room);
    setMessages([]);

    // Fetch chat history from backend
    try {
      const res = await fetch(
        `${BACKEND_URL}/messages/room/${room._id}`
      );
      const msgs: Message[] = await res.json();
      setMessages(msgs);

      // Mark messages as seen
      //   if (room.unreadCount?.[userId!] > 0) {
      //     setRooms(prev => prev.map(r =>
      //       r._id === room._id ? {
      //         ...r,
      //         unreadCount: {
      //           ...r.unreadCount,
      //           [userId!]: 0
      //         }
      //       } : r
      //     ));
      //   }
    } catch (err) {
      console.error("Failed to fetch messages", err);
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !activeRoom || !userId) return;

    const receiverId = activeRoom.participants.find((id) => id !== userId);
    if (!receiverId) return;

    socketRef.current?.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: input.trim(),
      chatRoomId: activeRoom._id,
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
          <aside className="sidebar">
            <header className="sidebar-header">
              <h6>Chats</h6>
              <button className="close-btn" onClick={() => setOpen(false)}>
                <CloseIcon />
              </button>
            </header>
            <ul className="room-list">
              {rooms.map((room) => {
                const otherParticipantId = room.participants.find(
                  (id) => id !== userId
                );
                const participant = otherParticipantId
                  ? participantInfo[otherParticipantId]
                  : null;

                return (
                  <li
                    key={room._id}
                    className={`room-item ${
                      activeRoom?._id === room._id ? "active" : ""
                    }`}
                    onClick={() => handleRoomClick(room)}
                  >
                    {participant && (
                      <>
                        {/* <img
                          src={
                            participant.avatar || "/images/default-avatar.png"
                          }
                          alt={participant.name}
                        /> */}
                        <div>
                          <p className="name">{participant.name}</p>
                          <p className="last-msg">
                            {room.lastMessageSenderId === userId ? "You: " : ""}
                            {messages.find((m) => m._id === room.lastMessageId)
                              ?.text || ""}
                          </p>
                          {/* {room.unreadCount?.[userId!] > 0 && (
                            <span className="unseen-badge">{room.unreadCount[userId!]}</span>
                          )} */}
                        </div>
                      </>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>

          <section className="chat-window">
            {activeRoom && (
              <>
                <header className="chat-header">
                  {(() => {
                    const otherParticipantId = activeRoom.participants.find(
                      (id) => id !== userId
                    );
                    const participant = otherParticipantId
                      ? participantInfo[otherParticipantId]
                      : null;

                    return participant ? (
                      <>
                        <img
                          src={
                            participant.avatar || "/images/default-avatar.png"
                          }
                          alt={participant.name}
                        />
                        <h5>{participant.name}</h5>
                      </>
                    ) : null;
                  })()}
                </header>

                <div className="chat-messages">
                  {messages.map((msg) => (
                    <div
                      key={msg._id}
                      className={`message ${
                        msg.senderId === userId ? "user" : "other"
                      }`}
                    >
                      {msg.text}
                    </div>
                  ))}
                </div>

                <footer className="chat-input-box">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <div className="chat-actions">
                    <button>
                      <AttachFileIcon />
                    </button>
                    <button>
                      <MicIcon />
                    </button>
                    <button onClick={handleSendMessage}>
                      <SendIcon />
                    </button>
                  </div>
                </footer>
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;

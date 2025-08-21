"use client";

import React, { useEffect, useRef, useState } from "react";
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

  const activeRoomRef = useRef<ChatRoom | null>(null);
  useEffect(() => {
    activeRoomRef.current = activeRoom;
  }, [activeRoom]);

  useEffect(() => {
    if (!userId) return;
    axios
      .get<ChatRoom[]>(`${BACKEND_URL}/rooms/chat-list?userId=${userId}`)
      .then((res) => {
        setRooms(res.data);
        if (res.data.length > 0) {
          setActiveRoom(res.data[0]);
        }
      });
  }, [userId]);

  useEffect(() => {
    if (!userId) return;

    const s = io(`${BACKEND_URL}`, { query: { userId } });

    s.on("connect", () => console.log("✅ Socket connected"));

    s.on("newMessage", (msg: Message) => {
      setMessages((prev) => {
        const currentRoom = activeRoomRef.current;

        const exists = prev.find(
          (m) =>
            m._id.startsWith("temp-") &&
            m.text === msg.text &&
            m.senderId === msg.senderId
        );
        if (exists) {
          return prev.map((m) => (m._id === exists._id ? msg : m));
        }
        // if the message belongs to the currently open room → append
        if (msg.roomId === currentRoom?.roomId) {
          return [...prev, msg];
        }

        return prev;
      });

      setRooms((prev) =>
        prev.map((r) =>
          r.roomId === msg.roomId
            ? {
                ...r,
                lastMessage: msg,
                lastMessageAt: msg.createdAt,
                unreadCount:
                  msg.senderId !== userId &&
                  r.roomId !== activeRoomRef.current?.roomId
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
  }, [userId]);

  useEffect(() => {
    if (!activeRoom) return;

    axios
      .get<Message[]>(`${BACKEND_URL}/messages/room/${activeRoom.roomId}?limit=50`)
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

    const tempId = `temp-${Date.now()}`;

    // Create optimistic message
    const optimisticMsg: Message = {
      _id: tempId,
      senderId: userId!,
      text: input,
      createdAt: new Date().toISOString(),
      roomId: activeRoom.roomId,
    };

    // Immediately add to UI
    setMessages((prev) => [...prev, optimisticMsg]);

    // Emit to server
    socket.emit("sendMessage", {
      senderId: userId,
      receiverId: activeRoom.otherUser?.id,
      text: input,
    });

    setInput("");
  };

  useEffect(() => {
    const handleOpenChat = (e: CustomEvent<{ receiverId: string; name: string }>) => {
      const { receiverId, name } = e.detail;
      setOpen(true);

      // Check if room already exists
      const existingRoom = rooms.find((r) => r.otherUser?.id === receiverId);

      if (existingRoom) {
        setActiveRoom(existingRoom);
      } else {
        // Create a placeholder room until backend confirms / roomInvite arrives
        const tempRoom: ChatRoom = {
          roomId: `temp-${receiverId}`,
          otherUser: { id: receiverId, name },
          lastMessage: null,
          lastMessageAt: new Date().toISOString(),
          unreadCount: 0,
          isUnseen: false,
        };
        setRooms((prev) => [...prev, tempRoom]);
        setActiveRoom(tempRoom);
      }
    };

    window.addEventListener("openChat", handleOpenChat as EventListener);

    return () => {
      window.removeEventListener("openChat", handleOpenChat as EventListener);
    };
  }, [rooms]);

  return (
    <div className="chat-widget">
      {!open && (
        <button onClick={() => setOpen(true)}>
          <ChatIcon />
        </button>
      )}

      {open && (
        <div>
          {/* Sidebar */}
          <aside>
            <header>
              <LocalizedHeading heading="Chats" level={6} />
              <button onClick={() => setOpen(false)}>
                <CloseIcon />
              </button>
            </header>
            <ul>
              {rooms.map((room) => (
                <li
                  key={room.roomId}
                  
                  onClick={() => setActiveRoom(room)}
                >
                  <img
                    src="/images/default-avatar.png"
                    alt={room.otherUser?.name}
                  />
                  <div>
                    <p>{room.otherUser?.name ?? "Unknown"}</p>
                    <p >
                      {room.lastMessage?.text ?? "No messages"}
                    </p>
                  </div>
                  {room.unreadCount > 0 && (
                    <span>{room.unreadCount}</span>
                  )}
                </li>
              ))}
            </ul>
          </aside>

          {activeRoom && (
            <section>
              <header>
                <img
                  src="/images/default-avatar.png"
                  alt={activeRoom.otherUser?.name}
                />
                <LocalizedHeading
                  heading={activeRoom.otherUser?.name ?? "Unknown"}
                  level={5}
                />
              </header>

              <div>
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                   
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              <footer>
                <LocalizedInput
                  name="chatMessage"
                  value={input}
                  onChange={setInput}
                  placeholderKey="Type a message..."
                  size="lg"
                />
                <div >
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

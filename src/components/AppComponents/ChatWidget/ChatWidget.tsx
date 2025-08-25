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
import { FileTypeEnum } from "@/utils/file-type";

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
  audios?: string[];
  videos?: string[];
  documents?: string[];
  createdAt: string;
  roomId: string;
}

type PendingFile = {
  key: string;
  preview: string; // Local preview for images/videos
  type: string;
  name: string;
  progress: number; // 0-100
  uploaded: boolean; // flag
};

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [activeRoom, setActiveRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  console.log("messages", messages);
  const [pendingUploads, setPendingUploads] = useState<PendingFile[]>([]);
  const [input, setInput] = useState("");
  const [socket, setSocket] = useState<Socket | null>(null);

  const dealer = useSelector((state: RootState) => state.SignuinDealer.dealer);
  const wholesaler = useSelector(
    (state: RootState) => state.SigninWholesaler.wholesaler
  );
  const user = dealer || wholesaler;
  const userId = user?._id;

  const activeRoomRef = useRef<ChatRoom | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !activeRoom) return;

    const selectedFiles = Array.from(e.target.files);

    try {
      // 1️⃣ Request presigned URLs
      const filesDto = selectedFiles.map((file) => ({
        count: 1,
        type: file.name.split(".").pop()?.toLowerCase() as FileTypeEnum,
        folder: "chat_uploads",
      }));

      const { data } = await axios.post(
        `${BACKEND_URL}/messages/presigned-urls`,
        {
          files: filesDto,
        }
      );

      // 2️⃣ Add files to pendingUploads with progress=0
      const initialUploads: PendingFile[] = selectedFiles.map((file, i) => ({
        key: data.urls[i].key,
        preview:
          file.type.startsWith("image/") || file.type.startsWith("video/")
            ? URL.createObjectURL(file)
            : "",
        type: file.type,
        name: file.name,
        progress: 0,
        uploaded: false,
      }));
      setPendingUploads((prev) => [...prev, ...initialUploads]);

      // 3️⃣ Upload with progress
      await Promise.all(
        data.urls.map(
          async (urlObj: { key: string; url: string }, i: number) => {
            const file = selectedFiles[i];

            await axios.put(urlObj.url, file, {
              headers: { "Content-Type": file.type },
              onUploadProgress: (progressEvent) => {
                const percent = Math.round(
                  (progressEvent.loaded * 100) / (progressEvent.total || 1)
                );
                setPendingUploads((prev) =>
                  prev.map((p) =>
                    p.key === urlObj.key ? { ...p, progress: percent } : p
                  )
                );
              },
            });

            // Mark as uploaded
            setPendingUploads((prev) =>
              prev.map((p) =>
                p.key === urlObj.key
                  ? { ...p, uploaded: true, progress: 100 }
                  : p
              )
            );
          }
        )
      );
    } catch (err) {
      console.error("Upload failed", err);
    } finally {
      e.target.value = "";
    }
  };

  const removePendingUpload = (index: number) => {
    setPendingUploads((prev) => prev.filter((_, i) => i !== index));
  };

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

    s.on("connect", () => console.log("Socket connected"));

    s.on("newMessage", (msg: Message) => {
      setMessages((prev) => {
        const currentRoom = activeRoomRef.current;

        const optimistic = prev.find(
          (m) =>
            m._id.startsWith("temp-") &&
            (m.text === msg.text || (!!m.images && !!msg.images)) &&
            m.senderId === msg.senderId &&
            m.roomId === msg.roomId
        );
        if (optimistic) {
          return prev.map((m) => (m._id === optimistic._id ? msg : m));
        }

        // 2. Prevent duplicates (server re-broadcast of same message)
        if (prev.some((m) => m._id === msg._id)) {
          return prev;
        }

        // 3. Only add if it's for the active room
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
      console.log(`Messages in room ${roomId} seen by ${seenBy}`);
    });

    setSocket(s);

    return () => {
      s.disconnect();
    };
  }, [userId]);

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
    if (
      (!input.trim() && pendingUploads.length === 0) ||
      !socket ||
      !activeRoom
    )
      return;

    const tempId = `temp-${Date.now()}`;

    // Create optimistic message
    const optimisticMsg: Message = {
      _id: tempId,
      senderId: userId!,
      text: input,
      createdAt: new Date().toISOString(),
      roomId: activeRoom.roomId,
      images: pendingUploads
        .filter((f) => f.type.startsWith("image/"))
        .map((f) => f.key),
      videos: pendingUploads
        .filter((f) => f.type.startsWith("video/"))
        .map((f) => f.key),
      audios: pendingUploads
        .filter((f) => f.type.startsWith("audio/"))
        .map((f) => f.key),
      documents: pendingUploads
        .filter(
          (f) => f.type.startsWith("application/") || f.type.startsWith("text/")
        )
        .map((f) => f.key),
    };

    // Immediately add to UI
    setMessages((prev) => [...prev, optimisticMsg]);

    // Emit to server
    socket.emit("sendMessage", {
      senderId: userId,
      receiverId: activeRoom.otherUser?.id,
      text: input,
      images: optimisticMsg.images,
      videos: optimisticMsg.videos,
      audios: optimisticMsg.audios,
      documents: optimisticMsg.documents,
    });

    setInput("");
    setPendingUploads([]);
  };

  useEffect(() => {
    const handleOpenChat = (
      e: CustomEvent<{ receiverId: string; name: string }>
    ) => {
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
                <li key={room.roomId} onClick={() => setActiveRoom(room)}>
                  <img
                    src="/images/default-avatar.png"
                    alt={room.otherUser?.name}
                  />
                  <div>
                    <p>{room.otherUser?.name ?? "Unknown"}</p>
                    <p>{room.lastMessage?.text ?? "No messages"}</p>
                  </div>
                  {room.unreadCount > 0 && <span>{room.unreadCount}</span>}
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
                {messages.map((msg) => {
                  const fromMe = msg.senderId === userId; 
                  return (
                    <div
                      key={msg._id}
                      className={`message-bubble ${
                        msg.text ? "text-msg" : "media-msg"
                      } ${fromMe ? "from-me" : "from-them"}`}
                    >
                      {msg.text && <p>{msg.text}</p>}

                      <div className="attachments">
                        {(msg.images || []).map((img, i) => (
                          <img
                            key={`${msg._id}-img-${i}`}
                            src={img}
                            alt="chat image"
                            className="chat-media"
                          />
                        ))}

                        {(msg.videos || []).map((vid, i) => (
                          <video
                            key={`${msg._id}-vid-${i}`}
                            src={vid}
                            controls
                            className="chat-media"
                          />
                        ))}

                        {(msg.audios || []).map((aud, i) => (
                          <audio
                            key={`${msg._id}-aud-${i}`}
                            controls
                            src={aud}
                            className="chat-audio"
                          />
                        ))}

                        {(msg.documents || []).map((doc, i) => {
                          const fileName = doc.split("/").pop();
                          return (
                            <a
                              key={`${msg._id}-doc-${i}`}
                              href={doc}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="chat-doc"
                            >
                              📄 {fileName}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {pendingUploads.map((file, idx) => (
                <div
                  key={idx}
                  style={{
                    marginBottom: "8px",
                    position: "relative",
                    display: "inline-block",
                    width: "160px",
                  }}
                >
                  {/* Cancel / remove button */}
                  <button
                    onClick={() => removePendingUpload(idx)}
                    style={{
                      position: "absolute",
                      top: "2px",
                      right: "2px",
                      background: "rgba(0,0,0,0.6)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                    }}
                  >
                    ✕
                  </button>

                  {/* File preview */}
                  {file.type.startsWith("image/") && (
                    <img
                      src={file.preview}
                      alt="preview"
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  )}

                  {file.type.startsWith("video/") && (
                    <video
                      src={file.preview}
                      controls
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  )}

                  {file.type.startsWith("audio/") && (
                    <audio
                      src={file.preview}
                      controls
                      style={{ width: "100%" }}
                    />
                  )}

                  {file.type.startsWith("application/") && (
                    <div
                      style={{
                        padding: "6px 10px",
                        border: "1px solid #ccc",
                        borderRadius: "6px",
                        background: "#f5f5f5",
                        color: "black",
                        textAlign: "center",
                        fontSize: "14px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      📄 {file.name}
                    </div>
                  )}

                  {/* Progress Bar */}
                  {!file.uploaded && (
                    <div style={{ marginTop: "4px", width: "100%" }}>
                      <div
                        style={{
                          height: "6px",
                          background: "#ddd",
                          borderRadius: "3px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${file.progress}%`,
                            height: "100%",
                            background: "#007bff",
                            transition: "width 0.3s",
                          }}
                        />
                      </div>
                      <span style={{ fontSize: "12px" }}>{file.progress}%</span>
                    </div>
                  )}
                </div>
              ))}
              <footer>
                <LocalizedInput
                  name="chatMessage"
                  value={input}
                  onChange={setInput}
                  placeholderKey="Type a message..."
                  size="lg"
                />
                <div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    multiple
                    accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv,.json,.xml,.html,.md,.zip,.rar,.7z,.tar,.gz"
                    onChange={handleFileChange}
                  />

                  <LocalizedButton
                    label={<AttachFileIcon />}
                    variant="outlined"
                    outlineColor="black"
                    size="sm"
                    onClick={handleAttachClick}
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

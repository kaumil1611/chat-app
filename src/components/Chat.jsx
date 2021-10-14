import React, { useState, useEffect } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import "./Chat.css";
import { AttachFile, SearchOutlined } from "@material-ui/icons";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "@firebase/app-compat";
import db from "../firebase-config";
const Chat = () => {
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [chatMessages, setMessages] = useState("");
  const { roomId } = useParams();
  const { user } = useSelector((state) => state.userData);

  useEffect(() => {
    if (roomId) {
      db.collection("message-room")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("message-room")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();

    db.collection("message-room").doc(roomId).collection("messages").add({
      message: input,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setInput("");
  };
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar
          src={`https://avatars.dicebear.com/api/human/${Math.floor(
            Math.random() * 5000
          )}.svg`}
        />
        <div className="header__info">
          <h3>{roomName}</h3>
          <p>
            Last Seen
            {new Date(
              chatMessages[chatMessages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {Object.keys(chatMessages).map((message) => (
          <p
            className={`chat__message ${
              chatMessages[message].name === user.displayName && "chat__reciver"
            }`}
            id={message}
            key={message}
          >
            <span className="chat__name">{chatMessages[message].name}</span>
            {chatMessages[message].message}
            <span className="chat__timestamp">
              {new Date(
                chatMessages[message].timestamp?.toDate()
              ).toUTCString()}{" "}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="type Message...."
          />
          <button type="submit" onClick={sendMessage}>
            Send A Message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;

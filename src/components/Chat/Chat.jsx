import React, { useState, useEffect, useCallback } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { MoreVert, AttachFile, SearchOutlined } from "@material-ui/icons";
// import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import firebase from "@firebase/app-compat";
import db from "../../firebase-config";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import OutsideClickHandler from "react-outside-click-handler";
import { useDropzone } from "react-dropzone";
import { storage } from "../../firebase-config";
import { uploadBytes, getDownloadURL } from "firebase/storage";
import { ref } from "firebase/storage";
import { toast } from "react-toastify";
const Chat = () => {
  const [input, setInput] = useState("");
  const [roomName, setRoomName] = useState("");
  const [chatMessages, setMessages] = useState("");
  const [openEmoji, setOpenEmoji] = useState(false);
  const { roomId } = useParams();
  const { user } = useSelector((state) => state.userData);
  const { displayName } = user;
  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log(acceptedFiles);
      if (acceptedFiles[0].type === "image/png") {
        const storageRef = ref(storage, `images/${acceptedFiles[0].name}`);
        uploadBytes(storageRef, acceptedFiles[0])
          .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
              db.collection("message-room")
                .doc(roomId)
                .collection("messages")
                .add({
                  name: displayName,
                  image: url,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                });
            });
          })
          .catch((err) => console.log("error", err));
      } else {
        toast.warning("please select image file");
      }
    },
    [displayName, roomId]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/jpeg, image/png , audio/mpeg ",
  });

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
          src={`https://i.pravatar.cc/500/${Math.floor(Math.random() * 5000)}`}
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
          <IconButton {...getRootProps()}>
            <input {...getInputProps()} />
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
            {console.log(chatMessages[message].image)}
            {chatMessages[message].image ? (
              <img
                src={chatMessages[message].image}
                alt=""
                width={100}
                height={100}
              />
            ) : (
              ""
            )}
            {chatMessages[message].message}
            <span className="chat__timestamp">
              {new Date(
                chatMessages[message].timestamp?.toDate()
              ).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon
          onClick={() => setOpenEmoji(true)}
          style={{ cursor: "pointer" }}
        />
        {openEmoji && (
          <OutsideClickHandler
            onOutsideClick={() => {
              setOpenEmoji(false);
            }}
          >
            <Picker
              onSelect={(e) => setInput(`${input}${e.native}`)}
              style={{
                position: "absolute",
                bottom: "130px",

                objectFit: "contain",
              }}
            />
          </OutsideClickHandler>
        )}
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

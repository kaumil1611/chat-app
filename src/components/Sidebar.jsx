import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarChat from "./SidebarChat";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import db from "../firebase-config";

const Sidebar = () => {
  const [messageRoom, setMessageRoom] = useState([]);
  const { user } = useSelector((state) => state.userData);

  useEffect(() => {
    const unsubscribe = db.collection("message-room").onSnapshot((snapshot) =>
      setMessageRoom(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__SearchContainer">
          <SearchOutlined />
          <input placeholder="Search or Start new chat" type="text " />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat />
        {messageRoom.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

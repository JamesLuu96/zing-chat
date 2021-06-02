import React, { useState, useEffect } from "react";
import { useSocket, useMyInfo } from "../Socket";
import { useLocation } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { Badge, Menu, Dropdown, Button } from "antd";
import { MessageOutlined, EllipsisOutlined } from "@ant-design/icons";
import PrivateChat from "../PrivateChat";
import "../PrivateChat/chat.css";
import { ADD_CHAT, DELETE_CHAT } from "../../utils/mutations";
import { QUERY_ROOMS } from "../../utils/queries";
function Chat() {
  const location = useLocation();
  const { roomName, roomId } = location.state;
  const socket = useSocket();
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const message = ["hello", "bye", "hello", "bye", "nine"];

  const [visible, setVisibility] = useState(false);
  const { data, loading } = useQuery(QUERY_ROOMS);
  const user = useMyInfo();

  const [addChat] = useMutation(ADD_CHAT);

  useEffect(() => {
    if (socket) {
      socket.emit("join room", roomId, roomName);
      socket.on("receive message", ({ name, message, time }) => {
        setChat((old) => [...old, `${name}: ${message} at ${time}`]);
      });
      if (data) {
        console.log(data, "rooms query");
      }
      return () => {
        socket.off("receive message");
      };
    }
  }, [socket]);
  async function submitForm(e) {
    e.preventDefault();

    socket.emit("send message", msg);
    try {
      const response = await addChat({
        variables: {
          roomId: roomId,
          message: msg,
          avatar: user.avatar,
        },
      });
    } catch (e) {
      console.log(e);
    }

    setMsg("");
  }
  console.log(chat, "chat");
  console.log(user);
  const showPrivateMessage = (e) => {
    e.preventDefault();
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  return (
    <div>
      <ul>
        {chat.map((message, i) => (
          <li key={i}>{message}</li>
        ))}
      </ul>
      <form onSubmit={submitForm}>
        <input value={msg} onChange={(e) => setMsg(e.target.value)}></input>
      </form>
      <Badge count={message.length} overflowCount={4} className="message-badge">
        <MessageOutlined
          onClick={showPrivateMessage}
          className="message-icon"
        />
      </Badge>
      <PrivateChat visible={visible} onClose={onClose} />
    </div>
  );
}

export default Chat;

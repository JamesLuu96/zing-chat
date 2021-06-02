import React, { useState, useEffect } from "react";
import { useSocket } from "../Socket";
import { useLocation } from "react-router-dom";
import { Badge } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import PrivateChat from "../PrivateChat";
function Chat() {
  const location = useLocation();
  const { roomName, roomId } = location.state;
  const socket = useSocket();
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const message = ["hello", "bye"];
  const [visible, setVisibility] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.emit("join room", roomId, roomName);
      socket.on("receive message", ({ name, message, time }) => {
        setChat((old) => [...old, `${name}: ${message} at ${time}`]);
      });

      return () => {
        socket.off("receive message");
      };
    }
  }, [socket]);
  function submitForm(e) {
    e.preventDefault();
    socket.emit("send message", msg);
    setMsg("");
  }

  const showPrivateMessage = (e) => {
    console.log("clicked");
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
      <Badge count={message.length} style={{ margin: "auto 0" }}>
        <MessageOutlined
          style={{ fontSize: "2rem" }}
          onClick={showPrivateMessage}
        />
      </Badge>
      <PrivateChat visible={visible} onClose={onClose} />
    </div>
  );
}

export default Chat;

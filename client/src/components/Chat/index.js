import React, { useState, useEffect } from "react";
import {useSocket} from '../Socket'

const name = "James"

function Chat() {
  const socket = useSocket()
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  useEffect(() => {
    
    socket.on("receive message", (message) => {
      setChat((old) => [...old, message]);
    });
  }, []);
  function submitForm(e) {
    e.preventDefault();
    socket.emit("send message", `${name}: ${msg}`);
    setMsg("");
  }

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
    </div>
  );
}

export default Chat;

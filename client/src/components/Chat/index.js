import React, { useState, useEffect } from "react";
import {useSocket} from '../Socket'
import {useLocation} from 'react-router-dom'


function Chat() {
  const location = useLocation()
  const {roomName, roomId} = location.state
  console.log(roomName, roomId)
  const socket = useSocket()
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  useEffect(() => {
    if(socket){
      socket.emit('join room', roomId, roomName)
      socket.on("receive message", (message) => {
        setChat((old) => [...old, message]);
      });
    }
  }, [socket]);
  function submitForm(e) {
    e.preventDefault();
    socket.emit("send message", msg);
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

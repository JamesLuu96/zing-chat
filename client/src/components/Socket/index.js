import React, { useContext, useState, useEffect } from "react";
import io from "socket.io-client";
import decode from "jwt-decode";
import { useHistory } from "react-router";

const SocketContext = React.createContext();
const UsersContext = React.createContext();
const MeContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function useUsers() {
  return useContext(UsersContext);
}

export function useMyInfo() {
  return useContext(MeContext);
}

export default function Socket({ children, idToken }) {
  const [users, setUsers] = useState([]);
  const [socket, setSocket] = useState();
  const [myInfo, setInfo] = useState();

  const routerHistory = useHistory();
  useEffect(() => {
    const data = decode(idToken).data;
    setInfo(data);
    const newSocket = io("/", {
      query: { idToken: JSON.stringify(data) },
    });
    setSocket(newSocket);
    newSocket.on("already logged in", () => {
      routerHistory.push("/error");
    });
    return () => newSocket.close();
  }, [idToken]);

  return (
    <SocketContext.Provider value={socket}>
      <UsersContext.Provider value={{ users, setUsers }}>
        <MeContext.Provider value={myInfo}>{children}</MeContext.Provider>
      </UsersContext.Provider>
    </SocketContext.Provider>
  );
}

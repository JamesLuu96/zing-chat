import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { Layout } from "antd";
import { useSocket, useUsers } from "../Socket";
// import Auth from "../../utils/auth";
import { QUERY_USER } from "../../utils/queries";

import { useQuery } from "@apollo/react-hooks";

const { Content } = Layout;

export default function UserList() {
  const [friends, setFriends] = useState([]);
  const socket = useSocket();
  const { users, setUsers } = useUsers();

  const { data, loading } = useQuery(QUERY_USER);

  useEffect(() => {
    if (data) {
      setFriends(data.user.friends);
    }
  }, [data]);
  
  useEffect(() => {
    if (socket) {
      if (!users.length) {
        socket.emit("populate users");
      }

      socket.emit("join room", "Lobby", "Lobby");

      socket.on("receive users", (socketUsers) => {
        setUsers([...socketUsers]);
      });
      socket.on("user joining", (user) => {
        setUsers((oldUsers) => [...oldUsers, user]);
      });
      socket.on("user disconnecting", (id) => {
        setUsers((oldUsers) => [...oldUsers.filter((user) => user.id !== id)]);
      });

      return () => socket.off("receive users");
    }
  }, [socket]);

  return (
    <>
      <Content style={{ padding: "20px" }}>
        {users &&
          users.map((user, i) => {
            return <UserCard key={i} user={user} friends={friends} setFriends={setFriends}/>;
          })}
      </Content>
    </>
  );
}

import React, { useEffect, useState } from "react";
import UserCard from "./UserCard";
import { Layout } from "antd";
import { QUERY_USERS } from "../../utils/queries";
import { useQuery } from "@apollo/react-hooks";
import { UPDATE_USERS } from "../../utils/actions";
import {useSocket, UseInfo} from '../Socket'
import Auth from '../../utils/auth'

const { Content } = Layout;

export default function UserList() {
  
  const socket = useSocket()
  const [users, setUsers] = useState([Auth.getProfile().data])

  useEffect(() => {
    socket.emit('get online users')
    socket.on('get online users', onlineUsers=>{
      setUsers(old=>[...old, ...onlineUsers])
    })
    socket.on('user join', user=>{
      setUsers(old=>[...old, user])
    })
    socket.on('user disconnect', (user)=>{
      setUsers(old=>old.filter(oldUser=>oldUser.id !== user.id))
    })
  }, []);
  // console.log(users)
  return (
    <>
      <Content style={{ padding: "20px" }}>
        {users &&
          users.map((user, i) => {
            return <UserCard key={i} user={user} />;
          })}
      </Content>
    </>
  );
}

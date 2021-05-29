import React, {useState, useEffect} from "react";

import ChatList from "../../components/RoomList";
import UserList from "../../components/UserList";
import NewRoomModal from "../../components/NewRoomModal";
import { Row, Col, Layout } from "antd";
import Auth from "../../utils/auth";
import { Link, Redirect } from "react-router-dom";
import {useSocket, UseInfo} from '../../components/Socket'
const { Content } = Layout;


export default function Main() {
  const {me, setMe} = UseInfo()
  const socket = useSocket()
  useEffect(()=>{
    if(Auth.loggedIn()){
      socket.emit('user is connecting', {username: Auth.getProfile().data.username, room: "Lobby"})
    }
    socket.on("user is connecting", user => {
      setMe(user)
    })
  },
  [])
  
  return (
    <div>
      {Auth.loggedIn() ? (
        <>
          <Row>
            <Col flex="4">
              <div className="site-layout-content">
                <ChatList />
              </div>
            </Col>
            <Col flex="2">
              <UserList />
            </Col>
          </Row>
        </>
      ) : (
        <Redirect to="/login" />
      )}
    </div>
  );
}

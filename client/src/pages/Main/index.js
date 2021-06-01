import React, { useState } from "react";
import RoomList from "../../components/RoomList";
// import ChatList from "../../components/ChatList";

import UserList from "../../components/UserList";

import { Row, Col } from "antd";

export default function Index() {
  return (
    <div>
      <>
        <Row>
          <Col id="room-list" flex="4">
            {/* <ChatList /> */}
            <RoomList />
          </Col>
          <Col id="user-list" flex="2">
            <UserList />
          </Col>
        </Row>
      </>
    </div>
  );
}

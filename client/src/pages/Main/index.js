import React, { useState } from "react";
import RoomList from "../../components/RoomList";

import UserList from "../../components/UserList";

import { Row, Col, Layout } from "antd";
import Private from "../../components/PrivateChat/Private";
const { Content } = Layout;

export default function Index() {
  return (
    <>
      <Content>
        <Row>
          <Col id="room-list" flex="4">
            {/* <ChatList /> */}
            <RoomList />
          </Col>
          <Col id="user-list" flex="2">
            <UserList />
          </Col>
        </Row>
        <Private />
      </Content>
    </>
  );
}

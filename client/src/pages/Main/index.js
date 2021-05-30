import React from "react";

import ChatList from "../../components/RoomList";
import UserList from "../../components/UserList";
import NewRoomModal from "../../components/NewRoomModal";
import { Row, Col, Layout } from "antd";


export default function Main() {
  
  return (
    <div>
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
    </div>
  );
}

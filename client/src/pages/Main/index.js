import React, { useState } from "react";
import RoomList from "../../components/RoomList";
// import ChatList from "../../components/ChatList";

import UserList from "../../components/UserList";
import RoomForm from "../../components/RoomForm";
import { Row, Col, Button, Form } from "antd";
import { ADD_ROOM } from "../../utils/mutations";
import { useMutation } from "@apollo/react-hooks";
export default function Index() {
  const [visible, setVisible] = useState(false);
  const [addRoom, { error }] = useMutation(ADD_ROOM);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    const { title, tags, access, primaryColor, secondaryColor, tertaryColor } =
      values;
    try {
      const response = addRoom({
        variables: {
          title: "",
          colors: "",
          tags: [],
          access: "",
        },
      });
    } catch (e) {
      console.log(e);
    }
    setVisible(false);
  };

  return (
    <div>
      <>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          Create room
        </Button>
        <RoomForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
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

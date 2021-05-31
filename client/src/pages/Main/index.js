import React, { useState } from "react";
import RoomList from "../../components/RoomList";
import ChatList from "../../components/ChatList";

import UserList from "../../components/UserList";
import RoomForm from "../../components/RoomForm";
import { Row, Col, Button, Form } from "antd";
import { Link, Redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { ADD_ROOM } from "../../utils/mutations";

export default function Index() {
  const [visible, setVisible] = useState(false);
  const [addRoom, { error }] = useMutation(ADD_ROOM);

  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    const { access, primary, secondary, tags, tertiary, title } = values;
    console.log(access, primary, secondary, tags, tertiary, title);

    // try {
    //   const response = await addRoom({
    //     variables: {
    //       title: "",
    //       access: "",
    //       colors: {},
    //       tags: "",
    //     },
    //   });
    // } catch (e) {}
    // setVisible(false);
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
            <ChatList />
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

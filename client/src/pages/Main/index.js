<<<<<<< HEAD
import React, { useState } from "react";
import ChatList from "../../components/ChatList";
import UserList from "../../components/UserList";
import RoomForm from "../../components/RoomForm";
import { Row, Col, Button, Form } from "antd";
import Auth from "../../utils/auth";
import { Link, Redirect } from "react-router-dom";

export default function Index() {
	const [visible, setVisible] = useState(false);

	const onCreate = (values) => {
		console.log("Received values of form: ", values);
		setVisible(false);
	};

	return (
		<div>
			{Auth.loggedIn() ? (
				<>
					<Button
						type="primary"
						onClick={() => {
							setVisible(true);
						}}>
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
						</Col>
						<Col id="user-list" flex="2">
							<UserList />
						</Col>
					</Row>
				</>
			) : (
				<Redirect to="/login" />
			)}
		</div>
	);
=======
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
>>>>>>> af65d2dd6e05b1ba7b710ae1cc79a002bf5730a7
}

import React, { useState } from "react";
import RoomList from "../../components/RoomList";
import ChatList from "../../components/ChatList";

import UserList from "../../components/UserList";
import RoomForm from "../../components/RoomForm";
import { Row, Col, Button, Form } from "antd";
import { Link, Redirect } from "react-router-dom";

export default function Index() {
	const [visible, setVisible] = useState(false);

	const onCreate = (values) => {
		console.log("Received values of form: ", values);
		setVisible(false);
	};

	return (
		<div>
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

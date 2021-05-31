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
}

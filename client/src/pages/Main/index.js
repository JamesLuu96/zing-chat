import React, { useState } from "react";
import ChatList from "../../components/ChatList";
import UserList from "../../components/UserList";
import RoomForm from "../../components/RoomForm";
import { Row, Col, Button, Form } from "antd";
import Auth from "../../utils/auth";
import { Link, Redirect } from "react-router-dom";

export default function Index() {
	const [roomInfo, setRoomInfo] = useState({
		roomName: "",
		username: "",
		createdAt: "",
	});

	const onFormFinish = ({ values }) => {
		setRoomInfo({
			...roomInfo,
			values,
		});
		setVisible(false);
		console.log(roomInfo);
	};

	const [visible, setVisible] = useState(false);

	const showRoomModal = () => {
		setVisible(true);
	};

	const hideRoomModal = () => {
		setVisible(false);
	};

	return (
		<div>
			{Auth.loggedIn() ? (
				<>
					<Form.Provider onFormFinish={onFormFinish}>
						<Button
							htmlType="button"
							style={{
								margin: "0 8px",
							}}
							onClick={showRoomModal}>
							Create room
						</Button>
						<RoomForm visible={visible} onCancel={hideRoomModal} />
					</Form.Provider>
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

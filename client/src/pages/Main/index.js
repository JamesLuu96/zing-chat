import React, { useState } from "react";
import ChatList from "../../components/ChatList";
import UserList from "../../components/UserList";
import RoomForm from "../../components/RoomForm";
import { Row, Col, Button, Form } from "antd";

export default function Index() {
	const [visible, setVisible] = useState(false);

	const showRoomModal = () => {
		setVisible(true);
	};

	const hideRoomModal = () => {
		setVisible(false);
	};

	const onFinish = (values) => {
		console.log("Finish:", values);
	};
	return (
		<>
			<Form.Provider
				onFormFinish={(name, { values }) => {
					if (name === "roomForm") {
						console.log(values);
						setVisible(false);
					}
				}}>
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
	);
}

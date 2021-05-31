import React, { useState } from "react";
import ChatList from "../../components/ChatList";
import UserList from "../../components/UserList";
import RoomForm from "../../components/RoomForm";
import { Row, Col, Button, Modal } from "antd";

export default function Index() {
	const [isModalVisible, setIsModalVisible] = useState(false);

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Open Modal
			</Button>
			<Modal
				title="Basic Modal"
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}>
				<RoomForm />
			</Modal>
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

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

	const hideModal = () => {
		setIsModalVisible(false);
	};

	return (
		<>
			<Button type="primary" onClick={showModal}>
				Open Modal
			</Button>
			<Modal
				footer={null}
				onClose={hideModal}
				title="Create a new room"
				visible={isModalVisible}>
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

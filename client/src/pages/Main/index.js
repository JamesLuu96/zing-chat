import React from "react";
import ChatList from "../../components/ChatList";
import UserList from "../../components/UserList";
// import NewRoomModal from "../../components/NewRoomModal";
import { Row, Col } from "antd";

export default function index() {
	return (
		<>
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

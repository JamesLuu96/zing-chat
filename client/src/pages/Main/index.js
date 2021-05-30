import React from "react";
import ChatList from "../../components/ChatList";
import UserList from "../../components/UserList";
import RoomForm from "../../components/RoomForm";
import { Row, Col } from "antd";
import Auth from "../../utils/auth";
import { Link, Redirect } from "react-router-dom";

export default function Index() {
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
			<Form.Provider
				onFormFinish={(name, { values }) => {
					if (name === "roomForm") {
						let roomList = [];
						roomList.title = values.roomName.toString();
						roomList.category = values.tags;
						roomList.users = "Test";
						setVisible(false);
						console.log(roomList);
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
    ) : (
      <Redirect to="/login" />
    )}
		</div>
	);
}
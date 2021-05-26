import React from "react";

import ChatList from "../../components/ChatList";
import UserList from "../../components/UserList";
import NewRoomModal from "../../components/NewRoomModal";
import { Row, Col, Layout } from "antd";

const { Content } = Layout;

export default function index() {
	return (
		<div>
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
		</div>
	);
}

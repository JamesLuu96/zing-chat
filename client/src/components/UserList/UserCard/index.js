import React from "react";
import Avatar from "react-avatar";
import { List, Button, Badge } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function UserCard({ user }) {
	return (
		<List.Item>
			<List.Item.Meta
				avatar={
					<Badge dot status="success" size="default">
						<Avatar size="24" round={true} name={user.username} />{" "}
					</Badge>
				}
				title={user.username}
				description={`${user.username} - ${user.roomName}`}
			/>

			<Button icon={<PlusOutlined />} />
			{/* <Link to={{pathname: `/room/${id}`, state: {roomName: room.roomName, roomId: id} }}><Button icon={<PlusOutlined />} /><Button>Join &rarr;</Button></Link> */}
		</List.Item>
	);
}

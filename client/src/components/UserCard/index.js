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
						<Avatar size="32" round={true} name={user.title} />{" "}
					</Badge>
				}
				title={user.title}
				description={user.bio}
			/>

			<Button icon={<PlusOutlined />} />
		</List.Item>
	);
}

import React from "react";
import Avatar from "react-avatar";
import { List, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function UserCard({ user }) {
	return (
		<List.Item>
			<List.Item.Meta
				avatar={<Avatar name={user.title} size="24" round={true} />}
				title={user.title}
			/>
			<Button icon={<PlusOutlined />} />
		</List.Item>
	);
}

import { List, Card, Avatar, Button } from "antd";
import React from "react";
import { PlusOutlined } from "@ant-design/icons";

export default function ChatCard({ room }) {
	return (
		<Card>
			<List.Item key={room.title}>
				<List.Item.Meta
					title={<a href={room.href}>{room.title}</a>}
					description="hello world"
				/>
				{room.content}
				<Avatar.Group
					maxCount={2}
					maxStyle={{
						color: "#f56a00",
						backgroundColor: "#fde3cf",
					}}>
					<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
					<Avatar
						style={{
							backgroundColor: "#f56a00",
						}}>
						K
					</Avatar>
					<Avatar
						style={{
							backgroundColor: "#87d068",
						}}
					/>
					<Avatar
						style={{
							backgroundColor: "#1890ff",
						}}
					/>
				</Avatar.Group>
				<Button type="link" size="large">
					Join
				</Button>
			</List.Item>
		</Card>
	);
}

import React from "react";
import { List } from "antd";
import ChatCard from "../ChatCard";

export default function ChatList() {
	const data = [
		{
			title: "Ant Design Title 1",
		},
		{
			title: "Ant Design Title 2",
		},
		{
			title: "Ant Design Title 3",
		},
		{
			title: "Ant Design Title 4",
		},
		{
			title: "Ant Design Title 1",
		},
		{
			title: "Ant Design Title 2",
		},
		{
			title: "Ant Design Title 3",
		},
		{
			title: "Ant Design Title 4",
		},
	];

	return (
		<>
			<List
				pagination={{
					pageSize: 3,
				}}>
				{data.map((room, i) => {
					return <ChatCard key={i} room={room} />;
				})}
			</List>
		</>
	);
}

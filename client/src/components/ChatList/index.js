import React from "react";
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
	];

	return (
		<>
			{data.map((card, i) => {
				return <ChatCard key={i} card={card} />;
			})}
		</>
	);
}

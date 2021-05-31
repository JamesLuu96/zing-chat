import React, { useEffect, useState } from "react";
import { List } from "antd";
import ChatCard from "../ChatCard";

import { ADD_ROOM } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_ROOMS } from "../../utils/queries";
import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_ROOMS, UPDATE_ROOM } from "../../utils/actions";

export default function ChatList() {
	const data = [
		{
			title: "The biggest baddest room",
			category: ["dogs", "turtles", "cats", "fish"],
			users: [
				"Florence Kamp",
				"Tom Hanks",
				"Theia Wagner",
				"John Wallace",
				"Jennifer Ross",
				"James Ramirez",
			],
		},
		{
			title: "Let's talk about vehicles",
			category: ["cars", "trucks", "transportation", "wheels", "highways"],
			users: ["Dorothy Graham", "Michael Taylor", "Tilly-Mae Bowen"],
		},
		{
			title: "My personal room",
			category: ["personal"],
			users: ["Bogdan Bryan", "Tom Hanks", "Marni Waller"],
		},
	];

	return (
		<>
			<List
				id="room-list"
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

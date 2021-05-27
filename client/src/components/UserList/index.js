import React from "react";
import UserCard from "../UserCard";

export default function UserList() {
	const data = [
		{
			title: "James Luu",
			bio: "I love crypto",
		},
		{
			title: "Fasika Demelash",
			bio: "I also love crypto",
		},
		{
			title: "Florence Kamp",
			bio: "I don't love crypto",
		},
	];

	return (
		<>
			{data.map((user, i) => {
				return <UserCard key={i} user={user} />;
			})}
		</>
	);
}

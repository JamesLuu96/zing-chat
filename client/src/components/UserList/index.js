import React from "react";
import UserCard from "../UserCard";
import { Layout, Divider } from "antd";

const { Content } = Layout;

export default function UserList() {
	const data = [
		{
			title: "James Luu",
		},
		{
			title: "Fasika Demelash",
		},
		{
			title: "Florence Kamp",
		},
		{
			title: "Shannon Parsons",
		},
		{
			title: "Rodolfo Simmons",
		},
		{
			title: "Irene Marsh",
		},
		{
			title: "James Luu",
		},
		{
			title: "Fasika Demelash",
		},
		{
			title: "Florence Kamp",
		},
		{
			title: "Shannon Parsons",
		},
		{
			title: "Rodolfo Simmons",
		},
		{
			title: "Irene Marsh",
		},
	];

	return (
		<>
			<Content style={{ padding: "20px" }}>
				{data.map((user, i) => {
					return <UserCard key={i} user={user} />;
				})}
			</Content>
		</>
	);
}

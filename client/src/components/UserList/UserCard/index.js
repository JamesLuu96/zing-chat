import React from "react";
import Avatar from "react-avatar";
import { List, Button, Badge } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {useHistory} from 'react-router'
import { Link } from "react-router-dom";


export default function UserCard({ user }) {
	const routerHistory = useHistory();
	function handleLink(){
		console.log(user)
		routerHistory.push(`/room/${user.room}`);
	}

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

			{/* <link to={{pathname: `/room/${user.roomName._id}`}}><Button icon={<PlusOutlined />}/></link> */}
			{user.room !== "Lobby" ? 
			<Link to={{pathname: `/room/${user.room}`, state: {roomName: user.roomName, roomId: user.room} }}>
			<Button icon={<PlusOutlined />}/> 
			</Link>: null}
		</List.Item>
	);
}

import { Card, Col, Row, Tag, Button, Avatar } from "antd";
import { EditOutlined, ArrowRightOutlined } from "@ant-design/icons";
import Animal from "react-animals";

import React from "react";
import { Link } from "react-router-dom";
const { Meta } = Card;

export default function RoomCard({ room }) {
	function stringToColor() {
		let hex = Math.floor(Math.random() * 0xffffff);
		let color = "#" + hex.toString(16);

		return color;
	}
	const user = room.users;
	const tag = room.tags;
	return (
		<Link
			to={{
				pathname: `/room/${room._id}`,
				state: { roomName: room.roomName, roomId: room._id },
			}}>
			<Card
				hoverable="true"
				bordered="true"
				className="room-card"
				title={<a>{room.roomName}</a>}
				key={room._id}
				extra={[<Button type="text" size="large" icon={<EditOutlined />} />]}>
				<Meta description={`created by ${room.username}`} />
				<Row justify="space-between">
					<Col>
						{tag.map((tag, i) => {
							return (
								<Tag color="#f50" key={i}>
									{tag}
								</Tag>
							);
						})}
					</Col>
					<Col>
						<Avatar.Group gap={0} maxCount={5}>
							{user.map((user, i) => {
								return (
									<Avatar style={{ backgroundColor: "#fff" }}>
										<Animal size="42px" />
									</Avatar>
								);
							})}
						</Avatar.Group>
					</Col>
				</Row>
			</Card>
		</Link>
	);
}

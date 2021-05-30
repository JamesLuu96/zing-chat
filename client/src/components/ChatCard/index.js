import React from "react";
import Avatar from "react-avatar";
import { Card, Col, Row, Tag, Button } from "antd";

export default function ChatCard({ room }) {
	const user = room.users;
	const tag = room.category;

	return (
		<Card title={room.title} extra={<Button href="#">Join &rarr;</Button>}>
			<Row justify="space-between">
				<Col>
					{tag.map((tag, i) => {
						return (
							<Tag color="magenta" key={i}>
								{tag}
							</Tag>
						);
					})}
				</Col>
				<Col>
					{user.map((user, i) => {
						return (
							<Avatar
								className="avatar-round"
								size="32"
								round={true}
								name={user}
							/>
						);
					})}
				</Col>
			</Row>
		</Card>
	);
}

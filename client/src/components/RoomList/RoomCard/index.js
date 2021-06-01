import React from "react";
import { Card, Avatar, Button, Col, Row, Tag } from "antd";
import AvatarContact from "react-avatar";
import { Link } from "react-router-dom";

export default function RoomCard({ room }) {
  const { users, tags, roomName } = room;
  const id = room._id;

  return (
    <Card
      title={roomName}
      extra={
        <Link
          to={{
            pathname: `/room/${id}`,
            state: { roomName: room.roomName, roomId: id },
          }}
        >
          <Button>Join &rarr;</Button>
        </Link>
      }
    >
      <Row justify="space-between">
        <Col>
          {tags.map((tag, i) => {
            return (
              <Tag color="magenta" key={i}>
                {tag}
              </Tag>
            );
          })}
        </Col>
        <Col>
          <Avatar.Group maxCount={5}>
            {users.map((user, i) => {
              return (
                <AvatarContact
                  key={i}
                  className="avatar-round"
                  size="32"
                  round={true}
                  name={user}
                />
              );
            })}
          </Avatar.Group>
        </Col>
      </Row>
    </Card>
  );
}

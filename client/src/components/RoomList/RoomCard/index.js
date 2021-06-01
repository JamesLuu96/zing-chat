import React from "react";
import { Card, Avatar, Button, Col, Row, Tag } from "antd";
import AvatarContact from "react-avatar";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
export default function RoomCard({ room, setFilterString }) {
  const { users, category, roomName, username } = room;
  const id = room._id;
  console.log(room);
  function filterListByTag(tagName) {
    setFilterString(tagName);
  }
  const deleteHandler = () => {};
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
          {room.username ? (
            <Button style={{ marginRight: "1rem" }} onClick={deleteHandler}>
              Delete <DeleteOutlined />
            </Button>
          ) : null}

          <Button>Join &rarr;</Button>
        </Link>
      }
    >
      <Row justify="space-between">
        <Col>
          {category.map((tag, i) => {
            return (
              <Tag
                color="magenta"
                className="filterTags"
                onClick={(e) => filterListByTag(tag)}
                key={i}
              >
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

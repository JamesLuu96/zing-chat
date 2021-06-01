import React from "react";
import { Card, Avatar, Button, Col, Row, Tag } from "antd";
import AvatarContact from "react-avatar";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_ROOM } from "../../../utils/mutations";

export default function RoomCard({ room, setFilterString }) {
  const { users, category, roomName, username } = room;
  const [deleteRoom, { error }] = useMutation(DELETE_ROOM);
  const id = room._id;

  function filterListByTag(tagName) {
    setFilterString(tagName);
  }
  const deleteHandler = async (e) => {
    try {
      const response = await deleteRoom({
        variables: {
          _id: id,
        },
      });

      console.log(response);
    } catch (e) {
      console.log(e, "error");
    }
  };
  return (
    <Card title={roomName}>
      <Row justify="flex-end">
        <Link
          to={{
            pathname: `/room/${id}`,
            state: { roomName: room.roomName, roomId: id },
          }}
        >
          <Button>Join &rarr;</Button>
        </Link>
        {room.username ? (
          <Button style={{ marginRight: "1rem" }} onClick={deleteHandler}>
            Delete <DeleteOutlined />
          </Button>
        ) : null}
      </Row>
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

import React, { useEffect, useState } from "react";
import { Card, Avatar, Button, Col, Row, Tag } from "antd";
import AvatarContact from "react-avatar";
import { Link } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_ROOM } from "../../../utils/mutations";
import { useSocket, useMyInfo } from "../../Socket";
export default function RoomCard({ room, setFilterString }) {
  const { users, tags, roomName } = room;
  const [deleteRoom, { error }] = useMutation(DELETE_ROOM);
  const socket = useSocket();
  const id = room._id;
  const {username} = useMyInfo()
  const deleteHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await deleteRoom({
        variables: {
          _id: room._id,
        },
      });

      socket.emit("delete room", room);
    } catch (e) {
      console.log(error);
    }
  };

  const editHandler = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  function filterListByTag(tagName){
    setFilterString(tagName)
  }

  return (
    <Card
      title={roomName}
      // headStyle={{ color: room.colors[0]}}
      // style={{ background: room.colors[2] }}
      extra={
        <Link
          to={{
            pathname: `/room/${id}`,
            state: { roomName: room.roomName, roomId: id },
          }}
        >
          <Button>Join &rarr;</Button>
          {room.username === username || username.toLowerCase() === "admin" ? (
            <>
              <Button style={{ marginRight: "1rem" }} onClick={deleteHandler}>
                Delete <DeleteOutlined />
              </Button>
              <Button onClick={editHandler}>Edit</Button>
            </>
          ) : null}
        </Link>
      }
    >
      <Row justify="space-between">
        <Col>
          {tags.map((tag, i) => {
            return (
              <Tag color="magenta" key={i} className="filterTags" onClick={e=>filterListByTag(tag)}>
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
                  name={user.username}
                />
              );
            })}
          </Avatar.Group>
        </Col>
      </Row>
    </Card>
  );
}

import React, { useState, useEffect } from "react";
import { List, Button, Badge, Avatar, Tooltip } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { ADD_FRIEND } from "../../../utils/mutations";
import { useMyInfo, useSocket } from "../../Socket";
import { Link } from "react-router-dom";
import { RightSquareOutlined } from "@ant-design/icons";

export default function UserCard({ user, friends, setFriends }) {
  const [addFriend, { error }] = useMutation(ADD_FRIEND);
  const socket = useSocket();
  const userData = useMyInfo();

  const addFriendHandler = async (event) => {
    event.preventDefault();
    try {
      if (user.id === userData._id) {
        return;
      }
      const response = await addFriend({
        variables: { friendId: user.id },
      });
      socket.emit("add friend", user);
      setFriends((old) => [...old, { _id: user.id, username: user.username }]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <List.Item>
        <List.Item.Meta
          avatar={
            <Badge dot status="success" size="default">
              <Avatar src={user.avatar} />
            </Badge>
          }
          style={{ color: "red" }}
          title={user.username}
          description={`${user.username} - ${user.roomName}`}
        />

        {friends.length &&
        friends.filter((friend) => friend._id === user.id) < 1 &&
        user.id !== userData._id ? (
          <Tooltip title={`Add ${user.username}?`}>
            <Button onClick={addFriendHandler} icon={<UserAddOutlined />} />
          </Tooltip>
        ) : null}
        {user.room !== "Lobby" ? (
          <Tooltip title={`Join ${user.username}'s room?`}>
            <Link
              to={{
                pathname: `/room/${user.room}`,
                state: { roomName: user.roomName, roomId: user.room },
              }}
            >
              <Button icon={<RightSquareOutlined />} />
            </Link>
          </Tooltip>
        ) : null}
      </List.Item>
    </>
  );
}

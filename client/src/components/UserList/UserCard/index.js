import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { List, Button, Badge } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { ADD_FRIEND } from "../../../utils/mutations";
import { useMyInfo, useSocket } from "../../Socket";
import { PlusOutlined } from "@ant-design/icons";

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
      socket.emit("add friend", user.id);
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
              <Avatar size="24" round={true} name={user.username} />{" "}
            </Badge>
          }
          title={user.username}
          description={`${user.username} - ${user.roomName}`}
        />

        {friends.filter((friend) => friend._id === user.id) < 1 &&
          user.id !== userData._id ? (
          <Button onClick={addFriendHandler} icon={<UserAddOutlined />} />
        ) : null}
      </List.Item>
    </>
    
  );
}

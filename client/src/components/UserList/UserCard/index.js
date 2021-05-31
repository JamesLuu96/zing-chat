import React from "react";
import Avatar from "react-avatar";
import { List, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { ADD_FRIEND } from "../../../utils/mutations";
import { useMyInfo } from "../../Socket";

export default function UserCard({ user }) {
  const [addFriend, { error }] = useMutation(ADD_FRIEND);
  const userData = useMyInfo();

  const addFriendHandler = async (e) => {
    e.preventDefault();
    try {
      if (user.id === userData._id) {
        return;
      }
      const response = await addFriend({
        variables: { friendId: user.id },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {user.roomName}
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar name={user.username} size="24" round={true} />}
          title={user.username}
        />
        <Button onClick={addFriendHandler} icon={<UserAddOutlined />} />
      </List.Item>
    </>
  );
}

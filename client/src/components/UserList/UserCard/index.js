import React from "react";
import Avatar from "react-avatar";
import { List, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export default function UserCard({ user }) {
  
  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar name={user.username} size="24" round={true} />}
        title={user.username}
      />
      <Button icon={<PlusOutlined />} />
    </List.Item>
  );
}

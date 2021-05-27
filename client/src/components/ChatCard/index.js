import { List, Card, Avatar, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
export default function ChatCard({ room }) {
  return (
    <Link to={`/room/${room._id}`}>
      <Card>
        <List.Item key={room._id}>
          <List.Item.Meta
            title={<a>{room.roomName}</a>}
            description={`created by ${room.username}`}
          />
         
          <Avatar.Group
            maxCount={2}
            maxStyle={{
              color: "#f56a00",
              backgroundColor: "#fde3cf",
            }}
          >
            <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            <Avatar
              style={{
                backgroundColor: "#f56a00",
              }}
            >
              K
            </Avatar>
            <Avatar
              style={{
                backgroundColor: "#87d068",
              }}
            />
            <Avatar
              style={{
                backgroundColor: "#1890ff",
              }}
            />
          </Avatar.Group>
          <Button type="link" size="large">
            Join
          </Button>
        </List.Item>
      </Card>
    </Link>
  );
}

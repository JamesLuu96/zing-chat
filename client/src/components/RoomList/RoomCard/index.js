import { List, Card, Avatar, Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
export default function RoomCard({ room }) {
  return (
    <Link to={{pathname: `/room/${room._id}`, state: {roomName: room.roomName, roomId: room._id} }}>
      <Card>
        <List.Item key={room._id}>
          <List.Item.Meta
            title={room.roomName}
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

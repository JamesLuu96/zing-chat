import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Drawer, Button, Radio, Space, List, Avatar } from "antd";

function PrivateChat({ visible, onClose }) {
  console.log(visible, "visible");

  const data = [
    {
      username: "fasika",
      bio: "Ant Design Title 1",
    },
    {
      username: "James",
      bio: "Ant Design Title 1",
    },
    {
      username: "Florence",
      bio: "Ant Design Title 1",
    },
    {
      username: "Jacob",
      bio: "Ant Design Title 1",
    },
    {
      username: "Nick",
      bio: "Ant Design Title 1",
    },
  ];

  return (
    <>
      <Drawer
        title="Messages"
        onClose={onClose}
        placement="left"
        visible={visible}
        closable={false}
      >
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar size="24" round={true} name={item.username} />}
                title={<a>{item.username}</a>}
                description={item.bio}
              />
            </List.Item>
          )}
        />
        ,
      </Drawer>
    </>
  );
}

export default PrivateChat;

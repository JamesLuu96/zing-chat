import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Drawer, Button, Radio, Space, List, Avatar } from "antd";

function PrivateChat({ visible, onClose }) {
  console.log(visible, "visible");

  const data = [
    {
      bio: "Ant Design",
      title: "fasika",
    },
    {
      bio: "Ant Design",
      title: "fasika",
    },
    {
      bio: "Ant Design",
      title: "fasika",
    },
    {
      bio: "Ant Design",
      title: "fasika",
    },
  ];

  return (
    <>
      <Drawer
        title="Messages"
        onClose={onClose}
        placement="right"
        visible={visible}
        closable={false}
      >
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title={<a href="https://ant.design">{item.username}</a>}
                description={item.username}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </>
  );
}

export default PrivateChat;

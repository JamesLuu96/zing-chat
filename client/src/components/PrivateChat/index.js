import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Space, Tabs, Input, Avatar, List } from "antd";
import "./chat.css";
import { SendOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

function PrivateChat({ visible, onClose }) {
  console.log(visible, "visible");
  const [openChat, setOpenChat] = useState("1");

  const data = [
    {
      bio: "Ant Design",
      title: "fasika",
      status: "online",
    },
    {
      bio: "Ant Design",
      title: "James",
      status: "offline",
    },
    {
      bio: "Ant Design",
      title: "Florence",
      status: "online",
    },
    {
      bio: "Ant Design",
      title: "Jacob",
      status: "offline",
    },
  ];
  const newChatHandler = (currentTab) => {
    setOpenChat(currentTab);
  };
  return (
    <>
      {visible && (
        <div className="chatBox">
          <Tabs activeKey={openChat} onChange={newChatHandler}>
            <TabPane tab="friends" key="1">
              <List
                onClick={() => newChatHandler("2")}
                dataSource={data}
                renderItem={(item) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta
                      avatar={
                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                      }
                      description={item.title}
                    />
                    <div>{item.status}</div>
                  </List.Item>
                )}
              ></List>
            </TabPane>
            <TabPane tab="Conversation" key="2">
              <div className="chatInput">
                <Input placeholder="write a message..." className="chat" />
              </div>
            </TabPane>
          </Tabs>
        </div>
      )}
    </>
  );
}

export default PrivateChat;

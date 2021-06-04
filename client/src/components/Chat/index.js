import React, { useState, useEffect } from "react";
import Parser from "html-react-parser";
import { Avatar, Form, Button, Layout, Col, Row, PageHeader } from "antd";

import { SendOutlined } from "@ant-design/icons";
import "../././../App.css";
import TextEditor from "../TextEditor";
import { useSocket, useMyInfo, useUsers } from "../Socket";
import { useLocation } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_CHAT } from "../../utils/mutations";
import { QUERY_ROOM } from "../../utils/queries";
const { Content } = Layout;

export default function Chat() {
  const location = useLocation();
  const { roomId, roomName } = location.state;
  const user = useMyInfo();
  const allUsers = useUsers().users;
  const [users, setUsers] = useState(
    allUsers.filter((user) => user.room === roomId)
  );
  const [addChat] = useMutation(ADD_CHAT);
  const { data, loading } = useQuery(QUERY_ROOM, {
    variables: {
      _id: roomId,
    },
  });

  const socket = useSocket();
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);
  const chatBox = document.querySelector(".chat-area");

  useEffect(() => {
    if (data) {
      const chatData = data.room[0].roomChat;
      setChat((old) => [...chatData, ...old]);
    }
    if (socket) {
      if (!users.length) {
        socket.emit("populate users");
      }
      socket.emit("join room", roomId, roomName);

      socket.on("receive message", (message) => {
        setChat((old) => [...old, message]);
      });
      socket.on("receive users", (socketUsers) => {
        setUsers(socketUsers);
      });
      socket.on("user disconnecting", (id) => {
        console.log(id);
        setUsers((oldUsers) => [...oldUsers.filter((user) => user.id !== id)]);
      });
      return () => {
        socket.off("receive message");
        socket.off("receive users");
        socket.off("user disconnecting");
      };
    }
  }, [data, socket]);

  async function submitForm(e) {
    e.preventDefault();
    socket.emit("send message", msg);
    setMsg("");

    try {
      await addChat({
        variables: {
          roomId: roomId,
          message: msg,
          avatar: user.avatar,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
  if (chatBox) {
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  return (
    <>
      <Layout className="private-chat">
        <Row>
          <Col span={2}></Col>
          <Col span={5} offset={3} className="user-list">
            <PageHeader
              title="Online users"
              style={{
                backgroundColor: "#FFFAFA",
                borderBottom: "0.5px solid #7836992f",
              }}
            />
            {users.map((user) => (
              <div
                key={user.username}
                style={{
                  backgroundColor: "#FFF",
                  marginBottom: "1rem",
                }}
              >
                <Avatar src={user.avatar} />
                <span>{user.username}</span>
              </div>
            ))}
          </Col>
          <Col span={13}>
            <Content className="chat-area">
              <div className="chat-header">
                <span>Group Chat</span>
              </div>
              {chat.map((message, i) => (
                // Renders the message component
                <div key={i}>
                  {message.username !== "zingBot" ? (
                    <Row
                      className="msg-container friend-msg-container"
                      justify="start"
                    >
                      <Col>{/* <Avatar src={message.avatar}></Avatar> */}</Col>

                      <Col
                        className={
                          user.username === message.username
                            ? "my-chat"
                            : "their-chat"
                        }
                        flex="auto"
                      >
                        <span className="chat-metadata" flex="end">
                          {message.username}
                        </span>
                        <div
                          className="friend-msg-content"
                          style={{ padding: "10px", display: "inline-block" }}
                        >
                          {Parser(message.message)}
                        </div>
                        {
                          <span className="chat-metadata">
                            {message.createdAt}
                          </span>
                        }
                      </Col>
                    </Row>
                  ) : (
                    <>
                      <p style={{ margin: 0, textAlign: "center" }}>
                        {message.message}
                      </p>
                      <p
                        style={{
                          textAlign: "center",
                          fontSize: "12px",
                          margin: "0 0 13px 0",
                          color: "grey",
                        }}
                      >
                        {message.createdAt}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </Content>
          </Col>
        </Row>
        <Row className="chat-box">
          <Col span={7}></Col>
          <Col span={13}>
            <Form.Item className="text-editor">
              <TextEditor value={msg} setValue={setMsg} />
            </Form.Item>
            <Form.Item>
              <Button
                className="send-chat"
                icon={<SendOutlined />}
                htmlType="submit"
                onClick={submitForm}
                type="primary"
              />
            </Form.Item>
          </Col>
        </Row>
      </Layout>
    </>
  );
}

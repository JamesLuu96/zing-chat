import React, { useState, useEffect, useRef } from "react";
import Parser from "html-react-parser";
import { Avatar, Form, Button, Layout, Col, Row } from "antd";

import { SendOutlined } from "@ant-design/icons";
import "../././../App.css";
import TextEditor from "../TextEditor";
import { useSocket, useMyInfo } from "../Socket";
import { useLocation } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_CHAT } from "../../utils/mutations";
import { QUERY_ROOM } from "../../utils/queries";
const { Content, Sider } = Layout;

export default function Chat({ handleChange }) {
  const location = useLocation();
  const { roomName, roomId } = location.state;
  const user = useMyInfo();
  const [addChat] = useMutation(ADD_CHAT);
  const { data, loading } = useQuery(QUERY_ROOM, {
    variables: {
      _id: roomId,
    },
  });

  const socket = useSocket();
  const [msg, setMsg] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    if (data) {
      const chatData = data.room[0].roomChat;
      setChat((old) => [...chatData, ...old]);
    }
    if (socket) {
      socket.emit("join room", roomId, roomName);
      socket.on("receive message", (message) => {
        setChat((old) => [...old, message]);
      });

      return () => {
        socket.off("receive message");
      };
    }
  }, [data, socket]);

  async function submitForm(e) {
    e.preventDefault();
    socket.emit("send message", msg);
    try {
      const response = await addChat({
        variables: {
          roomId: roomId,
          message: msg,
          avatar: user.avatar,
        },
      });
    } catch (e) {
      console.log(e);
    }

    setMsg("");
  }

  return (
    <>
      <Layout className="private-chat">
        <Row>
          <Col span={2}></Col>
          <Col span={5} offSet={3} className="user-list">
            users
          </Col>
          <Col span={13} offSet={1}>
            <Content className="chat-area">
              {chat.map((message, i) => (
                // Renders the message component
                <Row
                  key={i}
                  className="msg-container friend-msg-container"
                  justify="start"
                >
                  <Col>
                    <Avatar src={message.avatar}></Avatar>
                  </Col>
                  <Col flex="auto">
                    <div className="msg-column">
                      <span className="chat-metadata" flex="end">
                        {message.username}
                      </span>

                      <p className="friend-msg-content">
                        {Parser(message.message)}
                      </p>

                      {
                        <span className="chat-metadata">
                          {message.createdAt}
                        </span>
                      }
                    </div>
                  </Col>
                </Row>
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

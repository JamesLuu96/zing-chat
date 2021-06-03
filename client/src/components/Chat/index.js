import React, { useState, useEffect, useRef } from "react";
import Parser from "html-react-parser";
import { Avatar, Form, Button, Layout, Col, Row } from "antd";
import { SendOutlined } from "@ant-design/icons";
import "../PrivateChat/chat.css";
import TextEditor from "../TextEditor";
import { useSocket, useMyInfo } from "../Socket";
import { useLocation } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_CHAT } from "../../utils/mutations";
import { QUERY_ROOM } from "../../utils/queries";
const { Content } = Layout;

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
  //const buttonEl = useRef()
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
  // function submitForm(e) {
  // 	e.preventDefault();
  // 	socket.emit("send message", msg);
  // 	setMsg("");
  // }

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

	const scrollBottom = () => {
		const content = document.getElementById("content");
		if (document.getElementById("content")) {
			content.scrollTop = content.scrollHeight;
		}
	}
	scrollBottom();

	

	return (
	<>
		<Layout className="private-chat">
		<Content
			id = "content" 
			style={{
			padding: "32px",
			backgroundColor: "#fff",
			margin: "24px 16px 0",
			overflow: "scroll",
			maxHeight: "50vh",
			width: "70vw",
			}}
		>
		{chat.map((message, i) => (
		// Renders the message component
			<>
			{message.username !== "zingBot" ?
		
			<Row
				key={i}
				className="msg-container friend-msg-container"
				justify="start"
			>
				<Col>
					<Avatar src={message.avatar}></Avatar>
				</Col>
				<Col className="msg-column" flex="auto">
				<span className="chat-metadata" flex="end">
					{message.username}
				</span>
				
				<div
					className="friend-msg-content"
					style={{ padding: "10px", display: "inline-block" }}
				>
						{Parser(message.message)}
				</div>
				{<span className="chat-metadata">{message.createdAt}</span>}
				</Col>
			</Row>
			:
				<>
					<p style={{margin: 0, textAlign: "center"}}>{message.message}</p>
					<p style={{textAlign: "center", fontSize: "12px", margin: "0 0 13px 0", color: "grey"}}>{message.createdAt}</p>
				</>
			}
			
			</>
		))}
		</Content>
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
		</Layout>
	</>
	);
}
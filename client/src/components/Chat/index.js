import React, { useState, useEffect } from "react";
import Parser from "html-react-parser";
import {
	Comment,
	Avatar,
	Form,
	Button,
	List,
	Input,
	Layout,
	Col,
	Row,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import moment from "moment";
import TextEditor from "../TextEditor";
import { useSocket } from "../Socket";
import { useLocation } from "react-router-dom";

const { Content } = Layout;

export default function Chat({ handleChange }) {
	const location = useLocation();
	const { roomName, roomId } = location.state;
	const socket = useSocket();
	const [msg, setMsg] = useState("");
	const [chat, setChat] = useState([]);

	useEffect(() => {
		if (socket) {
			socket.emit("join room", roomId, roomName);
			socket.on("receive message", (message) => {
				setChat((old) => [...old, message]);
			});

			return () => {
				socket.off("receive message");
			};
		}
	}, [socket]);
	function submitForm(e) {
		e.preventDefault();
		socket.emit("send message", msg);
		setMsg("");
	}
	console.log(chat);
	console.log(msg);

	return (
		<Layout className="chat-container">
			<Content
				style={{
					padding: "32px",
					backgroundColor: "#fff",
					margin: "24px 16px 0",
					overflow: "scroll",
					maxHeight: "60vh",
				}}>
				{chat.map((message, i) => (
					// Renders the message component
					<Row
						key={i}
						className="msg-container friend-msg-container"
						justify="start">
						<Col>
							<Avatar>TH</Avatar>
						</Col>
						<Col className="msg-column" flex="auto">
							<span className="chat-metadata" flex="end">
								{message.name}
							</span>
							<p className="friend-msg-content">{Parser(message.message)}</p>
							{<span className="chat-metadata">{message.time}</span>}
						</Col>
					</Row>
				))}
			</Content>
			<Form.Item className="text-editor">
				<TextEditor value={msg} setValue={setMsg} submitForm={submitForm} />
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
	);
}

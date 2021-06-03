import React, { useState, useEffect, useRef } from "react";
import Parser from "html-react-parser";
import {
	Avatar,
	Form,
	Button,
	Col,
	Row,
	PageHeader,
	Layout,
	message,
} from "antd";
import { SendOutlined } from "@ant-design/icons";
import "../PrivateChat/chat.css";
import TextEditor from "../TextEditor";
import { useSocket, useMyInfo } from "../Socket";
import { useLocation } from "react-router-dom";
import Background from "../../images/08.png";

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
			{/* <PageHeader
				style={{
					backgroundColor: "transparent",
					boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
				}}
				onBack={() => window.history.back()}
				title={roomName}></PageHeader> */}

			<Layout
				className="private-chat"
				style={{
					backgroundImage: `url(${Background})`,
					backgroundPosition: "center",
					backgroundSize: "cover",
					backgroundRepeat: "no-repeat",
				}}>
				<h1>{roomName}</h1>
				<Content
					style={{
						padding: "24px",
						backgroundColor: "#fff",
						margin: "2% auto",
						maxHeight: "70vh",
						boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
						overflowX: "hidden",
					}}>
					<Row
						style={{
							backgroundColor: "#fff",
							margin: "0 auto",
							overflow: "scroll",
							minHeight: "40vh",
							width: "70vw",
						}}>
						{chat.map((message, i) => (
							// Renders the message component
							<>
								{message.username !== "zingBot" ? (
									<Row key={i} className="friend-msg-container" justify="start">
										<Col>
											<Avatar src={message.avatar}></Avatar>
										</Col>
										<Col className="msg-column" flex="auto">
											<span className="chat-metadata">{message.username}</span>

											<div
												className="friend-msg-content"
												style={{ padding: "12px", textAlign: "left" }}>
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
											}}>
											{message.createdAt}
										</p>
									</>
								)}
							</>
						))}
					</Row>
					<Row
						style={{
							padding: "4px",
							margin: "0",
							border: "1px solid ",
							maxHeight: "10vh",
						}}>
						<Col flex="auto">
							<Form.Item
								className="text-editor"
								style={{
									padding: "0",
									margin: "0",
								}}>
								<TextEditor
									style={{
										height: "100%",
									}}
									value={msg}
									setValue={setMsg}
								/>
							</Form.Item>
						</Col>
						<Col flex="50px">
							<Form.Item>
								<Button
									style={{
										margin: "4px 0",
										borderRadius: "8px",
									}}
									icon={<SendOutlined />}
									htmlType="submit"
									onClick={submitForm}
									type="primary"
								/>
							</Form.Item>
						</Col>
					</Row>
				</Content>
			</Layout>
		</>
	);
}

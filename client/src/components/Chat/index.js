import React, { useState, useEffect, useRef } from "react";
import Parser from "html-react-parser";
import { Avatar, Form, Button, Col, Row, Layout, message } from "antd";
import { SendOutlined } from "@ant-design/icons";
import "../PrivateChat/chat.css";
import TextEditor from "../TextEditor";
import UserList from "../UserList";
import { useSocket, useMyInfo } from "../Socket";
import { useLocation } from "react-router-dom";

import { useMutation, useQuery } from "@apollo/react-hooks";
import { ADD_CHAT } from "../../utils/mutations";
import { QUERY_ROOM } from "../../utils/queries";
const { Content } = Layout;

export default function Chat({ handleChange }) {
	const [room, setRoom] = useState({ colors: ["#fff", "#fff", "#fff"] });

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
			setRoom(data.room[0]);
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
			<Layout>
				<Row
					style={{
						backgroundColor: room.colors[0],
					}}>
					{/* <Col
						style={{
							backgroundColor: "#fff",
							boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
						}}
						span={5}>
						<h1>
							{user.length} users in {roomName}
						</h1>
						<UserList />
					</Col> */}
					<Content
						style={{
							borderRadius: "8px",
							overflow: "hidden",
							margin: "4% 6%",
							boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)",
						}}>
						<Content
							style={{
								padding: "24px",
								backgroundColor: "#fff",
								overflowX: "hidden",
								overflowY: "scroll",
								height: "50vh",
								borderBottom: "2px solid #e6e6e6",
							}}>
							{chat.map((message, i) => (
								// Renders the message component
								<>
									{message.username !== "zingBot" ? (
										message.username === user.username ? (
											<Row justify="end" key={i} className="msg-container">
												<Col align="right" className="my-chat">
													<span
														style={{
															align: "right",
															textAlign: "right",
														}}
														className="chat-metadata">
														{message.username}, {message.createdAt}
													</span>

													<div
														className="my-chat"
														style={{
															display: "inline-block",
															textAlign: "left",

															backgroundColor: room.colors[1],
															padding: "12px",
															marginBottom: "16px",
														}}>
														{Parser(message.message)}
													</div>
												</Col>
												<Col>
													<Avatar src={message.avatar}></Avatar>
												</Col>
											</Row>
										) : (
											<Row justify="start" key={i} className="msg-container">
												<Col>
													<Avatar src={message.avatar}></Avatar>
												</Col>
												<Col align="left">
													<span
														style={{
															align: "right",
															textAlign: "right",
														}}
														className="chat-metadata">
														{message.username}, {message.createdAt}
													</span>

													<div
														style={{
															display: "inline-block",
															textAlign: "left",
															padding: "12px",
															marginBottom: "16px",
															backgroundColor: room.colors[2],
														}}
														className="their-chat">
														{Parser(message.message)}
													</div>
												</Col>
											</Row>
										)
									) : (
										<>
											<p style={{ margin: 0, textAlign: "center" }}>
												{message.message}
											</p>
											<p
												style={{
													textAlign: "center",
													fontSize: "12px",
													margin: "0 0 12px 0",
													color: "grey",
												}}>
												{message.createdAt}
											</p>
										</>
									)}
								</>
							))}
						</Content>
						<Content
							style={{
								padding: "24px",
								backgroundColor: "#fff",
								height: "20vh",
								overflow: "hidden",
							}}>
							<Row
								style={{
									padding: "4px",
									margin: "0",
									height: "100%",
								}}>
								<Col flex="auto">
									<Form.Item
										className="text-editor"
										style={{
											padding: "0",
											margin: "0",
										}}>
										<TextEditor value={msg} setValue={setMsg} />
									</Form.Item>
								</Col>
								<Col flex="50px">
									<Form.Item>
										<Button
											shape="circle"
											style={{
												backgroundColor: "#3d50d6",
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
					</Content>
				</Row>
			</Layout>
		</>
	);
}

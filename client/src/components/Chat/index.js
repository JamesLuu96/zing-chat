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
import UserList from "../UserList";
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
			<Layout>
				<Row>
					<Col
						style={{
							backgroundColor: "#fff",
							boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
						}}
						span={4}>
						<h1>
							{user.length} users in {roomName}
						</h1>
						<UserList />
					</Col>
					<Content
						style={{
							overflow: "hidden",
						}}>
						<Content
							style={{
								padding: "24px",
								backgroundColor: "#fff",
								overflowX: "hidden",
								overflowY: "scroll",
								height: "50vh",
							}}>
							{chat.map((message, i) => (
								// Renders the message component
								<>
									{message.username !== "zingBot" ? (
										<Row key={i} className="friend-msg-container">
											<Col>
												<Avatar src={message.avatar}></Avatar>
											</Col>
											<Col className="msg-column" flex="auto">
												<span className="chat-metadata">
													{message.username}
												</span>

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

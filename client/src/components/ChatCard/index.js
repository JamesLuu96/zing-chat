import { List } from "antd";
import React from "react";

export default function ChatCard({ card }) {
	return <List.Item>{card.title}</List.Item>;
}

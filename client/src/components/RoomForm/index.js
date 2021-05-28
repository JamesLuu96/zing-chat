import React from "react";

import { Form, Input, Radio, Button } from "antd";

export default function RoomForm({ onFinish }) {
	const layout = {
		labelCol: {
			span: 6,
		},
		wrapperCol: {
			span: 12,
		},
	};
	const tailLayout = {
		wrapperCol: {
			offset: 6,
			span: 12,
		},
	};
	return (
		<>
			<Form
				{...layout}
				onFinish={onFinish}
				name="create-form"
				id="create-room"
				initialValues={{
					remember: true,
				}}>
				<Form.Item
					label="Room name"
					name="room-name"
					rules={[
						{
							required: true,
							message: "Please enter a room name",
						},
					]}>
					<Input />
				</Form.Item>
				<Form.Item label="Room type">
					{" "}
					<Radio.Group defaultValue="public">
						<Radio.Button value="public">Public</Radio.Button>
						<Radio.Button value="private">Private</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item {...tailLayout}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
		</>
	);
}

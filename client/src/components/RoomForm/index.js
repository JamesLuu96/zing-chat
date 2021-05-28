import React from "react";

import { Form, Input, Select, Button } from "antd";

export default function RoomForm({ onFinish }) {
	return (
		<>
			<Form
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

				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form>
		</>
	);
}

import React from "react";

import { Form, Input, Radio, Select, Button } from "antd";

const layout = {
	labelCol: {
		span: 8,
	},
	wrapperCol: {
		span: 16,
	},
};
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16,
	},
};

export default function RoomForm({ hideModal }) {
	const onFinish = (values) => {
		console.log("Success:", values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<>
			<Form
				{...layout}
				name="create-form"
				id="create-room"
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
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

				<Form.Item
					label="Select"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}>
					<Select>
						<Select.Option value="demo">Demo</Select.Option>
					</Select>
				</Form.Item>

				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form>
		</>
	);
}

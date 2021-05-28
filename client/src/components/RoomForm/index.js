import React from "react";

import {
	Form,
	Input,
	Radio,
	Select,
	Cascader,
	DatePicker,
	InputNumber,
	TreeSelect,
	Switch,
} from "antd";

export default function RoomForm() {
	const [form] = Form.useForm();

	const onFinish = async () => {
		try {
			const values = await form.validateFields();
			console.log("Success:", values);
		} catch (errorInfo) {
			console.log("Failed:", errorInfo);
		}
	};

	return (
		<>
			<Form
				form={form}
				id="create-room"
				name="create-room"
				initialValues={{ remember: true }}
				onFinish={onFinish}>
				<Form.Item
					label="Room name"
					validateStatus="error"
					rules={[
						{
							required: true,
							message: "Please enter a room name",
						},
					]}>
					<Input />
				</Form.Item>
				<Radio.Group>
					<Radio.Button value="small">Public</Radio.Button>
					<Radio.Button value="default">Private</Radio.Button>
				</Radio.Group>

				<Form.Item label="Select">
					<Select>
						<Select.Option value="demo">Demo</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item label="TreeSelect">
					<TreeSelect
						treeData={[
							{
								title: "Light",
								value: "light",
								children: [{ title: "Bamboo", value: "bamboo" }],
							},
						]}
					/>
				</Form.Item>
				<Form.Item label="Cascader">
					<Cascader
						options={[
							{
								value: "zhejiang",
								label: "Zhejiang",
								children: [
									{
										value: "hangzhou",
										label: "Hangzhou",
									},
								],
							},
						]}
					/>
				</Form.Item>
				<Form.Item label="DatePicker">
					<DatePicker />
				</Form.Item>
				<Form.Item label="InputNumber">
					<InputNumber />
				</Form.Item>
				<Form.Item label="Switch">
					<Switch />
				</Form.Item>
			</Form>
		</>
	);
}

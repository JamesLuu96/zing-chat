import React from "react";

import {
	Form,
	Input,
	Button,
	Radio,
	Select,
	Cascader,
	DatePicker,
	InputNumber,
	TreeSelect,
	Switch,
} from "antd";

export default function RoomForm() {
	return (
		<>
			<Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }} layout="vertical">
				<Form.Item label="Room name">
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
				<Form.Item label="Button">
					<Button>Button</Button>
				</Form.Item>
			</Form>
		</>
	);
}

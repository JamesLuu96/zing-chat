import React, { useState } from "react";
import { Form, Input, Modal, Row, Col, Radio } from "antd";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import ColorPicker from "../../ColorPicker";
import { InfoCircleOutlined } from "@ant-design/icons";

const EditForm = ({ visible, onCancel, onCreate, room }) => {
	const [form] = Form.useForm();
	const [tags, setTags] = useState(room.tags);
	const [color, setColor] = useState({
		primary: room.colors[0],
		secondary: room.colors[1],
		tertiary: room.colors[2],
	});

	return (
		<Modal
			centered
			width="40%"
			visible={visible}
			title="Create a new room"
			okText="Update"
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values) => {
						form.resetFields();
						onCreate({ ...values, ...color, room });
						setColor({
							primary: room.colors[0],
							secondary: room.colors[1],
							tertiary: room.colors[2],
						});
						setTags([]);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}>
			<Form form={form} layout="vertical" name="form_in_modal">
				<Form.Item
					requiredMark={"optional"}
					name="roomName"
					label="Room name"
					initialValue={room.roomName}
					rules={[
						{
							required: true,
							message: "Please enter a room name",
						},
					]}>
					<Input />
				</Form.Item>
				<Form.Item
					requiredMark={"optional"}
					label="Room acess"
					name="privacy"
					className="collection-create-form_last-form-item"
					rules={[{ required: true, message: "Please input your privacy!" }]}>
					<Radio.Group optionType="button" buttonStyle="solid">
						<Radio.Button value="public" checked="true">
							Public
						</Radio.Button>
						<Radio.Button value="private">Private</Radio.Button>
					</Radio.Group>
				</Form.Item>
				<Form.Item
					name="tags"
					label="Room tags"
					tooltip={{
						title: "This will help people find your room",
						icon: <InfoCircleOutlined />,
					}}>
					<ReactTagInput
						tags={tags}
						placeholder="Add tags..."
						editable={true}
						removeOnBackspace={true}
						onChange={(newTags) => setTags(newTags)}
					/>
				</Form.Item>
				<p>Color scheme</p>
				<Row>
					<Col className="color-col" span={8}>
						<Form.Item name="primary" label="Background">
							<ColorPicker color={color} setColor={setColor} type={"primary"} />
						</Form.Item>
					</Col>
					<Col className="color-col" span={8}>
						<Form.Item name="secondary" label="Your chat bubble">
							<ColorPicker
								color={color}
								setColor={setColor}
								type={"secondary"}
							/>
						</Form.Item>
					</Col>
					<Col className="color-col" span={8}>
						<Form.Item name="tertiary" label="Friends chat bubble">
							<ColorPicker
								color={color}
								setColor={setColor}
								type={"tertiary"}
							/>
						</Form.Item>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default EditForm;

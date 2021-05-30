import React, { useRef, useEffect } from "react";
import { Form, Input, Modal, Row, Col } from "antd";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import ColorPicker from "../ColorPicker";

const useResetFormOnCloseModal = ({ form, visible }) => {
	const prevVisibleRef = useRef();
	useEffect(() => {
		prevVisibleRef.current = visible;
	}, [visible]);
	const prevVisible = prevVisibleRef.current;
	useEffect(() => {
		if (!visible && prevVisible) {
			form.resetFields();
		}
	}, [visible]);
};

const RoomForm = ({ visible, onCancel }) => {
	const [tags, setTags] = React.useState([]);
	const [form] = Form.useForm();
	useResetFormOnCloseModal({
		form,
		visible,
	});

	const onOk = () => {
		form.submit();
	};

	return (
		<Modal
			title="New Room"
			width={800}
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}>
			<Form form={form} layout="vertical" name="roomForm">
				<Form.Item
					name="roomName"
					label="Room Name"
					rules={[
						{
							required: true,
						},
					]}>
					<Input />
				</Form.Item>
				<Form.Item name="tags" label="Category">
					<ReactTagInput
						tags={tags}
						placeholder="Type and press enter"
						editable={true}
						removeOnBackspace={true}
						onChange={(newTags) => setTags(newTags)}
					/>
				</Form.Item>
				<Form.Item name="colors" label="Create your color scheme">
					<Row>
						<Col span={8}>
							<ColorPicker />
						</Col>
						<Col span={8}>
							<ColorPicker />
						</Col>
						<Col span={8}>
							<ColorPicker />
						</Col>
					</Row>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default RoomForm;

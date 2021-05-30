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
			title="Create a new room"
			width={800}
			visible={visible}
			onOk={onOk}
			onCancel={onCancel}>
			<Form layout="vertical" form={form} name="roomForm">
				<Form.Item
					requiredMark={"optional"}
					name="roomName"
					label="Room name"
					rules={[
						{
							required: true,
						},
					]}>
					<Input />
				</Form.Item>
				<Form.Item name="tags" label="Tags">
					<ReactTagInput
						tags={tags}
						placeholder="Add tags..."
						editable={true}
						removeOnBackspace={true}
						onChange={(newTags) => setTags(newTags)}
					/>
				</Form.Item>
				<Form.Item name="colors" label="Color scheme">
					<Row>
						<Col className="color-col" span={8}>
							<ColorPicker />
						</Col>
						<Col className="color-col" span={8}>
							<ColorPicker />
						</Col>
						<Col className="color-col" span={8}>
							<ColorPicker />
						</Col>
					</Row>
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default RoomForm;

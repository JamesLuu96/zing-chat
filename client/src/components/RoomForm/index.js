import React, { useRef, useEffect } from "react";
import { Form, Input, Modal } from "antd";
import Tags from "../Tags";

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
	const [form] = Form.useForm();
	useResetFormOnCloseModal({
		form,
		visible,
	});

	const onOk = () => {
		form.submit();
	};

	return (
		<Modal title="New Room" visible={visible} onOk={onOk} onCancel={onCancel}>
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
				<Form.Item>
					<Tags />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default RoomForm;

import React from "react";
import { Form, Input, Row, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../../../utils/auth";
import { ADD_USER } from "../../../utils/mutations";

export default function Signup({ setIdToken }) {
	const [form] = Form.useForm();

	const [addUser] = useMutation(ADD_USER);

	const normFile = (e) => {
		console.log("Upload event:", e);

		if (Array.isArray(e)) {
			return e;
		}

		return e && e.fileList;
	};

	const onFinish = async (values) => {
		const { username, password, upload } = values;
		try {
			const mutationResponse = await addUser({
				variables: {
					username,
					password,
				},
			});
			const token = mutationResponse.data.addUser.token;
			setIdToken(token);
		} catch (e) {
			console.log(e);
		}
		console.log("Received values of form: ", values);
	};

	return (
		<Row type="flex" justify="center">
			<Form
				className="signup-form"
				style={{ width: "30%" }}
				form={form}
				size="large"
				layout="vertical"
				name="signup"
				onFinish={onFinish}
				scrollToFirstError>
				<Form.Item
					name="username"
					label="Username"
					tooltip="This will be displayed to other users in chat rooms"
					rules={[
						{
							required: true,
							message: "Please add a username",
							whitespace: true,
						},
					]}>
					<Input placeholder="Username" />
				</Form.Item>
				<Form.Item
					name="password"
					label="Password"
					rules={[
						{
							required: true,
							message: "Please input your password!",
						},
					]}
					hasFeedback>
					<Input.Password type="password" placeholder="Password" />
				</Form.Item>

				<Form.Item
					name="confirm"
					label="Confirm Password"
					dependencies={["password"]}
					hasFeedback
					rules={[
						{
							required: true,
							message: "Please confirm your password!",
						},
						({ getFieldValue }) => ({
							validator(_, value) {
								if (!value || getFieldValue("password") === value) {
									return Promise.resolve();
								}

								return Promise.reject(
									new Error("The two passwords that you entered do not match!")
								);
							},
						}),
					]}>
					<Input.Password type="password" placeholder="Password" />
				</Form.Item>
				<Form.Item
					name="upload"
					valuePropName="fileList"
					getValueFromEvent={normFile}>
					<Upload
						maxCount={1}
						name="avatar"
						action="/upload.do"
						listType="picture">
						<Button icon={<UploadOutlined />}>Upload avatar</Button>
					</Upload>
				</Form.Item>

				<Form.Item>
					<Button type="primary" size="large" htmlType="submit" block>
						Start chatting
					</Button>
				</Form.Item>
			</Form>
		</Row>
	);
}

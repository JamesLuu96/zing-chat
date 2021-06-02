import { Form, Input, Button, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../../utils/mutations";

export default function Login({ setIdToken }) {
	const [login, { error }] = useMutation(LOGIN);
	const onFinish = async (values) => {
		const { username, password } = values;
		try {
			const response = await login({
				variables: {
					username,
					password,
				},
			});
			const token = response.data.login.token;
			setIdToken(token);
		} catch (error) {
			console.log(error);
		}

		console.log("Received values of form: ", values);
	};

	return (
		<Row type="flex" justify="center">
			<Form
				style={{ width: "30%" }}
				layout="vertical"
				size="large"
				name="login"
				className="login-form"
				initialValues={{
					remember: true,
				}}
				onFinish={onFinish}>
				<Form.Item
					label="Username"
					name="username"
					rules={[
						{
							required: true,
							message: "Please input your Username!",
						},
					]}>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Username"
					/>
				</Form.Item>
				<Form.Item
					label="Password"
					name="password"
					rules={[
						{
							required: true,
							message: "Please input your Password!",
						},
					]}>
					<Input.Password type="password" placeholder="Password" />
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						block>
						Log in
					</Button>
				</Form.Item>
			</Form>
		</Row>
	);
}

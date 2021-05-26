import { Form, Input, Button, Checkbox, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import "../../styles/signup.css";
const Title = Avatar;
const layout = {
  labelCol: {
    span: 3,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Signup = () => {
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <Title level={5}>Avatar</Title>
      {/* <Avatar size="large" icon={<UserOutlined />} /> */}
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Signup
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Signup;

{
  /* <Title level={5}>Avatar</Title>
      <Avatar size="large" icon={<UserOutlined />} /> */
}

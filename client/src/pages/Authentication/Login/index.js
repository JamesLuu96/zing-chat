import { Form, Input, Button, Row, Alert, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../../utils/mutations";


function handleError() {
  console.log("LAKUSDYF9PO82Q73ROILU23H4RWF")
};

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
      message.error(token.errors[0].message);
    }

    console.log("Received values of form: ", values);
  };

  return (
    <Row type="flex" justify="center">
      <Form
        style={{ width: "25%", marginTop: "5rem" }}
        layout="vertical"
        size="large"
        name="login"
        className="login-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your Username!",
            },
          ]}
        >
          <Input
            style={{ padding: "0.8rem" }}
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
          ]}
        >
          <Input.Password
            type="password"
            placeholder="Password"
            style={{ padding: "0.8rem" }}
            rules={[
              {
                required: true,

              }
            ]}
          />
          <Alert message="Error Text" type="error" />
          
        </Form.Item>
        


        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
            style={{ height: "3rem" }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Row>
  );
}

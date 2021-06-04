import React, { useState } from "react";
import { Form, Input, Row, Button, Avatar, Alert } from "antd";
import { useMutation } from "@apollo/react-hooks";
import Auth from "../../../utils/auth";
import { ADD_USER } from "../../../utils/mutations";

import { AvatarGenerator } from "random-avatar-generator";
const generator = new AvatarGenerator();

export default function Signup({ setIdToken }) {
  const [currentAvatar, setAvatar] = useState(generator.generateRandomAvatar());
  const [form] = Form.useForm();
  const [errorMessage, setErrorMessage] = useState(false);

  const [addUser] = useMutation(ADD_USER);

  const onFinish = async (values) => {
    const { username, password, displayName } = values;
    try {
      const mutationResponse = await addUser({
        variables: {
          username,
          password,
          displayName,
          avatar: currentAvatar,
        },
      });
      const token = mutationResponse.data.addUser.token;
      setIdToken(token);
    } catch (e) {
      setErrorMessage(true);
    }
    console.log("Received values of form: ", values);
  };

  return (
    <>
      <Row type="flex" justify="center">
        {errorMessage && (
          <Alert message="User name is already taken!!" type="error" showIcon />
        )}
      </Row>
      <Row type="flex" justify="center">
        <Form
          style={{ width: "20%", marginTop: "10rem" }}
          className="signup-form"
          style={{ width: "30%" }}
          form={form}
          size="large"
          layout="vertical"
          name="signup"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="username"
            label="Username"
            rules={[
              {
                required: true,
                message: "Please add a username",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Username" style={{ padding: "0.8rem" }} />
          </Form.Item>
          <Form.Item
            name="displayName"
            label="Display Name"
            tooltip="This will be displayed to other users in chat rooms"
            rules={[
              {
                required: true,
                message: "Please add a username",
                whitespace: true,
              },
            ]}
          >
            <Input placeholder="Display Name" style={{ padding: "0.8rem" }} />
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
            hasFeedback
          >
            <Input.Password
              type="password"
              placeholder="Password"
              style={{ padding: "0.8rem" }}
            />
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
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              type="password"
              placeholder="Password"
              style={{ height: "3rem" }}
            />
          </Form.Item>
          {/* <Form.Item
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
				</Form.Item> */}
          <Avatar size={64} src={currentAvatar} />
          <Button onClick={(e) => setAvatar(generator.generateRandomAvatar())}>
            Shuffle Avatar
          </Button>
          <Form.Item>
            <Button type="primary" size="large" htmlType="submit" block>
              Start chatting
            </Button>
          </Form.Item>
        </Form>
      </Row>
    </>
  );
}

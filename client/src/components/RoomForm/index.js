import React, { useState } from "react";
import { Form, Input, Modal, Row, Col, Radio } from "antd";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import ColorPicker from "../ColorPicker";

const RoomForm = ({
  visible,
  onCreate,
  onCancel,
  handleChange,
  onComplete,
  color,
}) => {
  const [form] = Form.useForm();
  const [roomInfo, setRoomInfo] = useState({
    colors: { primaryColor: "", secondaryColor: "", tertiaryColor: "" },
    tags: [],
    title: "",
    access: "public",
  });
  const changeHandler = (e) => {
    // const { name, value } = e.target;
    // setRoomInfo();
  };
  return (
    <Modal
      width="800"
      visible={visible}
      title="Create a new room"
      okText="Create room"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form form={form} layout="vertical" name="form_in_modal">
        <Form.Item
          name="title"
          value={roomInfo.title}
          label="Room name"
          rules={[
            {
              required: true,
              message: "Please enter a room name",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="tags" label="Tags">
          <ReactTagInput
            value={roomInfo.tags}
            placeholder="Add tags..."
            editable={true}
            removeOnBackspace={true}
            // onChange={(newTags) => setTags(newTags)}
          />
        </Form.Item>
        <Form.Item
          name="access"
          className="collection-create-form_last-form-item"
        >
          <Radio.Group>
            <Radio value="public" name="public" onChange={changeHandler}>
              Public
            </Radio>
            <Radio value="private" name="private" onChange={changeHandler}>
              Private
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Row>
          <Col className="color-col" span={8}>
            <Form.Item name="primary" label="Color scheme">
              <ColorPicker
                value={roomInfo.colors.primaryColor}
                onChange={handleChange}
                onChangeComplete={onComplete}
              />
            </Form.Item>
          </Col>
          <Col className="color-col" span={8}>
            <Form.Item name="secondary" label="Color scheme">
              <ColorPicker
                value={roomInfo.colors.secondaryColor}
                onChange={handleChange}
                onChangeComplete={onComplete}
              />
            </Form.Item>
          </Col>
          <Col className="color-col" span={8}>
            <Form.Item name="tertiary" label="Color scheme">
              <ColorPicker
                value={roomInfo.colors.tertiaryColor}
                onChange={handleChange}
                onChangeComplete={onComplete}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default RoomForm;

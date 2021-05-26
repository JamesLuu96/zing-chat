import React from "react";
import Nav from "../../components/Nav";
import { Row, Col, Layout, Input, Tooltip, Avatar, List, Upload } from "antd";
import { SendOutlined, CameraOutlined } from "@ant-design/icons";
import UploadImage from "../UploadImage";
import AppendImage from "../AppendImage";
const data = {
  results: [
    {
      gender: "male",
      name: {
        title: "Mr",
        first: "Albert",
        last: "Kristensen",
      },
      email: "albert.kristensen@example.com",
      nat: "DK",
    },

    {
      gender: "female",
      name: {
        title: "Mrs",
        first: "Mercedes",
        last: "Caballero",
      },
      email: "mercedes.caballero@example.com",
      nat: "ES",
    },
    {
      gender: "female",
      name: {
        title: "Mrs",
        first: "Benedicte",
        last: "Gjerde",
      },
      email: "benedicte.gjerde@example.com",
      nat: "NO",
    },
    {
      gender: "female",
      name: {
        title: "Mrs",
        first: "Benedicte",
        last: "Gjerde",
      },
      email: "benedicte.gjerde@example.com",
      nat: "NO",
    },
    {
      gender: "female",
      name: {
        title: "Mrs",
        first: "Benedicte",
        last: "Gjerde",
      },
      email: "benedicte.gjerde@example.com",
      nat: "NO",
    },

    {
      gender: "female",
      name: {
        title: "Mrs",
        first: "Benedicte",
        last: "Gjerde",
      },
      email: "benedicte.gjerde@example.com",
      nat: "NO",
    },
    {
      gender: "female",
      name: {
        title: "Mrs",
        first: "Benedicte",
        last: "Gjerde",
      },
      email: "benedicte.gjerde@example.com",
      nat: "NO",
    },
    {
      gender: "female",
      name: {
        title: "Mrs",
        first: "Benedicte",
        last: "Gjerde",
      },
      email: "benedicte.gjerde@example.com",
      nat: "NO",
    },
  ],
};

const properties = {
  fontSize: "200px",
  color: "#fff",
  backgroundColor: "#555",
};

function Chat(props) {
  return (
    <div>
      <Nav />

      <Row
        justify="space-around"
        styles={{
          fontSize: properties.fontSize,
          backgroundColor: properties.backgroundColor,
        }}
      >
        <Col
          flex="1.5"
          push={1}
          xs="4"
          style={{ background: "#fff", height: "80vh" }}
        >
          <div>
            <List
              dataSource={data.results}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.name.last}</a>}
                    description={item.email}
                  />
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col
          flex="4"
          style={{
            background: "#f4f4f4",
            height: "80vh",
          }}
          pull={1}
        >
          <div
            style={{
              width: "300px",
              marginTop: "5rem",
              height: "400px",
            }}
          >
            <AppendImage />
          </div>
        </Col>
      </Row>
      <Row justify="space-around">
        <Col flex="1.5"></Col>
        <Col flex="4" pull={1}>
          <Input placeholder="Write a message..." />
        </Col>
      </Row>
    </div>
  );
}

export default Chat;

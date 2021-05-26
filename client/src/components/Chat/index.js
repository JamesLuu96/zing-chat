import React, { useState } from "react";
import Nav from "../../components/Nav";
import { Row, Col, Layout, Input, Tooltip, Avatar, List, Upload } from "antd";
import { SendOutlined, CameraOutlined } from "@ant-design/icons";
const { Search } = Input;

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
  const onSearch = (value) => console.log(value);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  

  const sendMessage = (e) => {
    setMessage([...message, e.target.value]);
    console.log(message);
  };
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
          style={{ background: "#f7f7f7", height: "80vh" }}
        >
          <div>
            <Search
              onSearch={onSearch}
              placeholder="search"
              style={{ width: 380, marginTop: "2%" }}
            />

            <List
              dataSource={data.results}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.name.last}</a>}
                    description="online"
                  />
                </List.Item>
              )}
            />
          </div>
        </Col>
        <Col
          flex="3"
          style={{
            background: "#fff",
            height: "80vh",
            border: "1px solid #f4f4f4",
          }}
          pull={1}
        >
          <div>{message}</div>
        </Col>
      </Row>
      <Row justify="space-around">
        <Col flex="1.5"></Col>
        <Col flex="3" pull={1}>
          <Input
            placeholder="Write a message..."
            value={message}
            onPressEnter={sendMessage}
            onChange={(e) => setMessage(e.target.value)}
          />
        </Col>
      </Row>
    </div>
  );
}

export default Chat;

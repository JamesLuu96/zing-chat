import React from "react";
import { Layout, Menu } from "antd";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
const { Header } = Layout;

class Nav extends React.Component {
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    return (
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "0.5rem",
          backgroundColor: "#474787",
        }}
      >
        {/* <Menu
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ display: "flex", justifyContent: "space-between" }}
        > */}
        {/* <Menu.Item key="1"> */}
        <h3 style={{ fontSize: "2rem" }}>
          <Link style={{ color: "#fff" }} to="/">
            Zing chat
          </Link>
        </h3>
        {/* </Menu.Item> */}

        {/* <Menu.Item key="2"> */}
        <>
          {Auth.loggedIn() ? (
            <a className="nav-link" to="/" onClick={() => Auth.logout()}>
              <LogoutOutlined style={{ fontSize: "1.3rem", color: "#fff" }} />
            </a>
          ) : null}
        </>
        {/* </Menu.Item> */}
        {/* </Menu> */}
      </Header>
    );
  }
}

export default Nav;

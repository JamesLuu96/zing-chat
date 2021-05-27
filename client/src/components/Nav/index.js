import React from "react";
import { Layout, Menu } from "antd";
import Auth from "../../utils/auth";
const { Header } = Layout;

class Nav extends React.Component {
  handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  render() {
    return (
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">Zing chat</Menu.Item>
          <Menu.Item key="2">
            <>
              <a href="/" onClick={() => Auth.logout()}>
                Logout
              </a>
            </>
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default Nav;

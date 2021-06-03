import React from "react";
import { Layout, Menu, Image } from "antd";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import Logo from "../../images/zing-logo.png";
const { Header } = Layout;

class Nav extends React.Component {
	handleClick = (e) => {
		console.log("click ", e);
		this.setState({ current: e.key });
	};

	render() {
		return (
			<Header style={{ display: "flex", justifyContent: "space-between" }}>
				{/* <Menu
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ display: "flex", justifyContent: "space-between" }}
        > */}
				{/* <Menu.Item key="1"> */}
				<h3 style={{ fontSize: "2rem" }}>
					<Link style={{ color: "#fff" }} to="/">
						<img width={120} preview="false" src={Logo} />
					</Link>
				</h3>

				{Auth.loggedIn() ? (
					<a className="nav-link" to="/" onClick={() => Auth.logout()}>
						<LogoutOutlined style={{ fontSize: "1.3rem", color: "#fff" }} />
					</a>
				) : null}
			</Header>
		);
	}
}

export default Nav;

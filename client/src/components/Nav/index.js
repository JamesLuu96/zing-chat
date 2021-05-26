import React from "react";
import { Layout, Menu } from "antd";

const { Header } = Layout;

class Nav extends React.Component {
	state = {
		current: "home",
	};

	handleClick = (e) => {
		console.log("click ", e);
		this.setState({ current: e.key });
	};

	render() {
		const { current } = this.state;
		return (
			<Header>
				<div className="logo" />
				<Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
					<Menu.Item key="1">nav 1</Menu.Item>
					<Menu.Item key="2">nav 2</Menu.Item>
					<Menu.Item key="3">nav 3</Menu.Item>
				</Menu>
			</Header>
		);
	}
}

export default Nav;

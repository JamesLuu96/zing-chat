import React from "react";
import { Layout, Menu } from "antd";
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
const { Header } = Layout;

class Nav extends React.Component {
	handleClick = (e) => {
		console.log("click ", e);
		this.setState({ current: e.key });
	};

	render() {
		return (
			<Header>
				<Menu mode="horizontal" defaultSelectedKeys={["2"]}>
					<Menu.Item key="1">
						<h3>
							<Link style={{ color: "#fff" }} to="/">
								Zing chat
							</Link>
						</h3>
					</Menu.Item>

					<Menu.Item key="2">
						<>
							{Auth.loggedIn() ? (
								<a className="nav-link" to="/" onClick={() => Auth.logout()}>
									Logout
								</a>
							) : null}
						</>
					</Menu.Item>
				</Menu>
			</Header>
		);
	}
}

export default Nav;

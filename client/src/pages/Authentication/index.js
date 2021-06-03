import React from "react";

import { Tabs, Image, Card, Row, Layout } from "antd";
import Login from "./Login";
import Signup from "./Signup";
import Background from "../../images/08.png";
import Logo from "../../images/zing-logo.png";
const { TabPane } = Tabs;
const { Content } = Layout;

const Authentication = ({ setIdToken }) => (
	<Content
		align="middle"
		style={{
			backgroundImage: `url(${Background})`,
			backgroundPosition: "center",
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			height: "100vh",
		}}>
		<Row
			style={{ marginTop: "12vh", marginBottom: "4vh" }}
			type="flex"
			justify="center"
			className="tab-container"
			breakpoint="xs">
			<img width={320} src={Logo} />
		</Row>
		<Row type="flex" justify="center" className="tab-container" breakpoint="xs">
			<Card
				type="flex"
				justify="center"
				style={{
					minWidth: `30%`,
				}}>
				<Tabs defaultActiveKey="1" className="form-tab" centered size="large">
					<TabPane tab="Login" key="1">
						<Login setIdToken={setIdToken} />
					</TabPane>
					<TabPane tab="Sign up" key="2">
						<Signup setIdToken={setIdToken} />
					</TabPane>
				</Tabs>
			</Card>
		</Row>
	</Content>
);
export default Authentication;

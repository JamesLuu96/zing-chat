import React from "react";
import "antd/dist/antd.css";

import { Tabs, PageHeader, Layout } from "antd";
import Login from "../Login";
import Signup from "../Signup";
import "../../styles/authentication.css";
const { TabPane } = Tabs;
const { Content } = Layout;

const Tab = () => (
  // <Layout>
  //   <Content>
  <div className="tab-container" breakpoint="xs">
    <PageHeader className="site-page-header" title="Zing Chat" />
    <Tabs defaultActiveKey="1" className="form-tab">
      <TabPane tab="Login" key="1">
        <Login />
      </TabPane>
      <TabPane tab="Sign up" key="2">
        <Signup />
      </TabPane>
    </Tabs>
  </div>
  //   </Content>
  // </Layout>
);

export default Tab;

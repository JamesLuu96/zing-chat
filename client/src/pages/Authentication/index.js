import React from "react";

import { Tabs } from "antd";
import Login from "../Login";
import Signup from "../Signup";

const { TabPane } = Tabs;

const Authentication = () => (
  <div className="tab-container" breakpoint="xs">
    <Tabs defaultActiveKey="1" className="form-tab">
      <TabPane tab="Login" key="1">
        <Login />
      </TabPane>
      <TabPane tab="Sign up" key="2">
        <Signup />
      </TabPane>
    </Tabs>
  </div>
);
export default Authentication;

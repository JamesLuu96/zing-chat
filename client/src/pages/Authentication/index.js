import React from "react";

import { Tabs } from "antd";
import Login from "../Login";
import Signup from "../Signup";
import Auth from "../../utils/auth";
const { TabPane } = Tabs;

function Authentication() {
  const token = localStorage.getItem("id_token");
  setTimeout(function () {
    Auth.isTokenExpired(token);
    console.log("check");
  }, 100000);
  return (
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
}

// export default index

// const { TabPane } = Tabs;
// setTimeout(function(){ alert("Hello"); }, 3000)
// const Authentication = () => (

//  return ()
// );
export default Authentication;

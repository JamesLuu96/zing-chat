import React from "react";
import useLocalStorage from './hooks/useLocalStorage';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Main from "./pages/Main";
// import Login from "./pages/Login";
import Authentication from "./pages/Authentication";
import Room from "./pages/Room";
import { Layout } from "antd";
import Chat from "./components/Chat";
export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Main} />
        {/* <Route exact path="/login" component={Login} /> */}
        <Route exact path="/authentication" component={Authentication} />
        <Route exact path="/chat" component={Chat} />
        <Route exact path="/room" component={Room} />
      </Switch>
    </Router>
  );
}

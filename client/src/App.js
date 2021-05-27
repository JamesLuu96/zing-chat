import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Room from "./pages/Room";
import Chat from "./components/Chat"
import Draw from './components/Draw'


export default function App() {
	return (
		<Router>
			<Nav />
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/room" component={Room} />
				<Route exact path="/chat" component={Chat}/>
				<Route exact path="/draw" component={Draw}/>
			</Switch>
		</Router>
	);
}

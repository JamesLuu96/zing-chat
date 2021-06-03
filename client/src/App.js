import React from "react";
import { Layout } from "antd";

import useLocalStorage from "./hooks/useLocalStorage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.less";
import Nav from "./components/Nav";
import Main from "./pages/Main";
import Socket from "./components/Socket";

import { ApolloProvider } from "@apollo/react-hooks";
import Authentication from "./pages/Authentication";
import Chat from "./components/Chat";
import NoMatch from "./pages/Authentication/NoMatch";
import Error from "./components/Error";
import ApolloClient from "apollo-boost";
import Auth from "./utils/auth";
import Private from "./components/PrivateChat/Private";

const { Content } = Layout;
export default function App() {
	const [idToken, setIdToken] = useLocalStorage("id_token");
	const client = new ApolloClient({
		request: (operation) => {
			operation.setContext({
				headers: {
					authorization: idToken ? `Bearer ${idToken}` : "",
				},
			});
		},
		uri: "/graphql",
	});
	const dashboard = (
		<ApolloProvider client={client}>
			<Router>
				<Socket idToken={idToken}>
					<Nav idToken={idToken} />
					<Switch>
						<Content align="center">
							<Route exact path="/error" component={Error} />
							<Route exact path="/" component={Main} />
							<Route exact path="/room/:id" component={Chat} />
							<Route component={NoMatch} />
						</Content>
					</Switch>
					<Private />
				</Socket>
			</Router>
		</ApolloProvider>
	);
	return idToken && !Auth.isTokenExpired(idToken) ? (
		dashboard
	) : (
		<ApolloProvider client={client}>
			<Authentication setIdToken={setIdToken} />
		</ApolloProvider>
	);
}

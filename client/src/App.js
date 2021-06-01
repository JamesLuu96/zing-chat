import React from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Main from "./pages/Main";
import Socket from "./components/Socket";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Authentication from "./pages/Authentication";
import Chat from "./components/Chat";
import NoMatch from "./pages/Authentication/NoMatch";
import Error from "./components/Error";

const client = new ApolloClient({
	request: (operation) => {
		const token = localStorage.getItem("id_token");
		operation.setContext({
			headers: {
				authorization: token ? `Bearer ${token}` : "",
			},
		});
	},
	uri: "/graphql",
});

export default function App() {
	const [idToken, setIdToken] = useLocalStorage("id_token");
	console.log(idToken);
	const dashboard = (
		<ApolloProvider client={client}>
			<Router>
				<Socket idToken={idToken}>
					<Nav />
					<Switch>
						<Route exact path="/error" component={Error} />
						<Route exact path="/" component={Main} />
						<Route exact path="/room/:id" component={Chat} />
						<Route component={NoMatch} />
					</Switch>
				</Socket>
			</Router>
		</ApolloProvider>
	);
	return idToken ? (
		dashboard
	) : (
		<ApolloProvider client={client}>
			<Authentication setIdToken={setIdToken} />
		</ApolloProvider>
	);
}

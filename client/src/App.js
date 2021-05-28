import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Main from "./pages/Main";
// import Login from "./pages/Login";
// import Room from "./pages/Room";

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Authentication from "./pages/Authentication";
import { StoreProvider } from "./utils/GlobalState";
import Chat from "./components/Chat";

import Type from "./components/Type";
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
  return (
    <ApolloProvider client={client}>
      <Router>
        <StoreProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Type} />
            <Route exact path="/login" component={Authentication} />
            <Route exact path="/room/:id" component={Chat} />
          </Switch>
        </StoreProvider>
      </Router>
    </ApolloProvider>
  );
}

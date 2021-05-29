import React, {useState} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Main from "./pages/Main";
import Socket from "./components/Socket"

import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import Authentication from "./pages/Authentication";
import { StoreProvider } from "./utils/GlobalState";
import Chat from "./components/Chat";
import NoMatch from "./pages/Authentication/NoMatch"
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
        <Socket>
          <StoreProvider>
            <Nav />
            <Switch>
              <Route exact path="/" component={Main} />
              <Route exact path="/login" component={Authentication} />
              <Route exact path="/room/:id" component={Chat} />
              <Route component={NoMatch} />
            </Switch>
          </StoreProvider>
        </Socket>
      </Router>
    </ApolloProvider>
  );
}

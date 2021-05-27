const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const app = express();

const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");
const db = require("./config/connection");

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

const http = require("http").createServer(app);
const io = require("socket.io")(http, { cors: { origin: "*" } });

io.on("connection", function (socket) {
  socket.on("send message", function (message) {
    io.emit("receive message", message);
  });
});

// Serve up static assets

db.once("open", () => {
  http.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

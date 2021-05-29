const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const app = express();
const {getUsers, getUsersByRoom, userConnected, userDisconnected} = require('./utils/sockets')

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
  socket.join('Lobby')
  console.log('someone connected')
  let myUser;
  socket.on('user is connecting', function(user){
    myUser = userConnected(socket.id, user.username, user.room)
    socket.emit('user is connecting', myUser)
    socket.broadcast.to('Lobby').emit('user join', myUser)
  })
  socket.on('join room', (room)=>{
    myUser = {...myUser, room: room}
    socket.leaveAll
    socket.join(room)
  })
  socket.on('get online users', ()=>{
    socket.emit('get online users', getUsers())
  })
  socket.on('add room', room=>{
    io.to('Lobby').emit('add room')
  })
  socket.on("send message", function (message) {
    io.emit("receive message", message);
  });
  socket.on('disconnect', ()=>{
    myUser && io.emit('user disconnect', myUser) && userDisconnected(myUser.username)
    console.log('someone left...')
  })
});

// Serve up static assets

db.once("open", () => {
  http.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});

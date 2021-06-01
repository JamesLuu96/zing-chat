const { gql } = require("apollo-server-express");
const typeDefs = gql`
  type Chat {
    _id: ID
    username: String
    message: String
    createdAt: String
  }

  type User {
    _id: ID
    username: String
    rooms: [Room]
    friends: [User]
    createdAt: String
  }

  type Room {
    _id: ID
    roomName: String
    username: String
    roomChat: [Chat]
    createdAt: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    chat: [Chat]
    user: User
    room: [Room]
    users: [User]
  }

  type Mutation {
    addUser(username: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    addChat(roomId: String!, message: String!): Room
    addRoom(roomName: String!): Room
    deleteRoom(_id: String!): Room
  }
`;

module.exports = typeDefs;

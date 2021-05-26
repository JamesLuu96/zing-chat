const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Chat {
    _id: ID
    message: String
    user: [User]
    room: [Room]
  }

  type User {
    _id: ID
    name: String
    friends: [User]
  }
  type Room {
    roomName: String
    user: [User]
  }
  type Auth {
    token: ID
    user: User
  }

  type Query {
    chat: [Chat]
    user: User
    room: Room
  }

  type Mutation {
    addUser(userName: String!, password: String!): Auth
    login(userName: String!, password: String!): Auth
    addChat(user: [ID]!): User
    addRoom(user: [ID]!, roomName: String!): Room
    
  }
`;

module.exports = typeDefs;

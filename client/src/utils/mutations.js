import gql from "graphql-tag";

export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!) {
    addUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_ROOM = gql`
  mutation addRoom($roomName: String!) {
    addRoom(roomName: $roomName) {
      _id
      roomName
      username
    }
  }
`;

export const ADD_CHAT = gql`
  mutation addChat($roomId: String!, $message: String!) {
    addRoom(roomId: $roomId, message: $message) {
      _id
      roomName
    }
  }
`;

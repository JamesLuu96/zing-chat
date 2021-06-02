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
  mutation addRoom(
    $roomName: String!
    $colors: [String]!
    $tags: [String]!
    $privacy: String!
  ) {
    addRoom(
      roomName: $roomName
      colors: $colors
      tags: $tags
      privacy: $privacy
    ) {
      _id
      roomName
      username
      colors
      tags
      privacy
    }
  }
`;

export const ADD_CHAT = gql`
  mutation addChat($roomId: String!, $message: String!, $avatar: String!) {
    addChat(roomId: $roomId, message: $message, avatar: $avatar) {
      _id
      roomName
      username
      colors
      tags
      privacy
      roomChat {
        _id
        username
        message
        createdAt
      }
    }
  }
`;
export const DELETE_CHAT = gql`
  mutation deleteChat($chatId: String!) {
    deleteChat(chatId: $chatId) {
      _id
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: String!) {
    addFriend(friendId: $friendId) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
`;
export const DELETE_ROOM = gql`
  mutation deleteRoom($_id: String!) {
    deleteRoom(_id: $_id) {
      _id
    }
  }
`;
export const UPDATE_ROOM = gql`
  mutation updateRoom(
    $roomId: String!
    $roomName: String!
    $colors: [String]!
    $tags: [String]!
    $privacy: String!
  ) {
    updateRoom(
      roomId: $roomId
      roomName: $roomName
      colors: $colors
      tags: $tags
      privacy: $privacy
    ) {
      _id
      roomName
      username
      colors
      tags
      privacy
      roomChat {
        _id
        username
        message
        createdAt
      }
    }
  }
`;

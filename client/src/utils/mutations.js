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
    $title: String!
    $colors: Object!
    $tags: Array!
    $access: String!
  ) {
    addRoom(title: $title, colors: $colors, tags: $tags, access: $access) {
      _id
      title
      username
    }
  }
`;

export const ADD_CHAT = gql`
  mutation addChat($roomId: String!, $message: String!) {
    addChat(roomId: $roomId, message: $message) {
      _id
      roomName
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

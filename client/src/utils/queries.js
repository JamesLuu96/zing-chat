import gql from "graphql-tag";
// queryPost(filter: { datePublished: { ge: "2020-06-15" }}) {
//   ...
// }
export const QUERY_USERS = gql`
  {
    users {
      _id
      username
      rooms {
        _id
        roomName
        username
        roomChat {
          _id
          username
          message
          createdAt
        }
        createdAt
      }
      friends {
        _id
        username
      }
      createdAt
    }
  }
`;
export const QUERY_USER = gql`
  {
    user {
      _id
      username
      rooms {
        _id
        roomName
        username
        roomChat {
          _id
          username
          message
          createdAt
        }
        createdAt
      }
      friends {
        _id
        username
      }
    }
  }
`;

export const QUERY_ROOMS = gql`
  {
    room {
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

export const QUERY_CHAT = gql`
  {
    chat {
      _id
      username
      message
      createdAt
    }
  }
`;

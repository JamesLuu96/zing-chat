import gql from "graphql-tag";
//friends

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
        userName
      }
      createdAt
    }
  }
`;

export const QUERY_ROOM = gql`
  {
    room {
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
  }
`;
export const QUERY_CHAT = gql`
_id
username
message
createdAt
`;

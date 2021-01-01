import { gql } from "@apollo/client";

export const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      body
      createdAt
      username
      id
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        body
        createdAt
        username
        id
      }
    }
  }
`;

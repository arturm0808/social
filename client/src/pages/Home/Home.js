import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Grid } from "semantic-ui-react";

import Post from "../../components/Post/Post";

const FETCH_POSTS_QUERY = gql`
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

const Home = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <Grid columns={3}>
      <Grid.Row>
        <Grid.Column>
          <h1>Recent Posts</h1>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading post</h1>
        ) : (
          data &&
          data.getPosts &&
          data.getPosts.map((post) => (
            <Grid.Column key={post.id} style={{ marginBottom: "20px" }}>
              <Post post={post} />
            </Grid.Column>
          ))
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;

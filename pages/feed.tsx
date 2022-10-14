import type { NextPage } from "next";
import { useEffect, useState } from "react";
import {
  Paper,
  Grid,
  Card,
  Button,
  Container,
  Chip,
  Stack,
  Box,
} from "@mui/material";

type Comment = {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
};

type Post = {
  body: string;
  id: number;
  title: string;
  userId: number;
  comments: Array<Comment>;
};

const Feed: NextPage = () => {
  const postsDataUrl = "https://jsonplaceholder.typicode.com/posts?_limit=10";
  const commentsDataUrl = "https://jsonplaceholder.typicode.com/comments";
  const [postsData, setPostsData] = useState([]);
  const [commentsData, setCommentsData] = useState([]);

  const [loadingState, setLoadingState] = useState(false);
  const [error, setError] = useState();

  const [highlightedPost, setHighlightedPost] = useState();
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    setLoadingState(true);
    fetch(postsDataUrl)
      .then((response) => response.json())
      .then((data) => {
        setPostsData(data);
      })
      .finally(() => setLoadingState(false))
      .catch((err) => {
        setError(err);
      });

    fetch(commentsDataUrl)
      .then((response) => response.json())
      .then((data) => setCommentsData(data));
  }, []);

  const toggleComments = (postId) => {
    if (postId === highlightedPost) {
      setShowComments(false);
    } else {
      setShowComments(true);
    }
    setHighlightedPost(postId);
  };

  return (
    <Grid>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 500,
        }}
      >
        <Chip label="blog" />
        <Chip label="posts" />
        <Chip label="article" />
        <Chip label="comments" />
        <Chip label="opinions" />
      </Stack>
      <Container sx={{ margin: "auto" }}>
        <>
          {!postsData && <h2>{error}</h2>}
          {loadingState && (
            <Box>
              <h2>Loading ...</h2>
            </Box>
          )}
          {postsData &&
            postsData.map((post, index) => {
              return (
                <Card
                  sx={{ p: 5, m: 10, border: "1px solid grey" }}
                  key={index}
                >
                  <h2>{post.title}</h2>
                  <div>{post.body}</div>
                  <Button
                    variant="text"
                    onClick={() => toggleComments(post.id)}
                  >
                    {
                      commentsData.filter(
                        (comment) => comment.postId === post.id
                      ).length
                    }
                  </Button>

                  {showComments && highlightedPost === post.id && (
                    <div>
                      {commentsData.filter(
                        (comment) => comment.postId === post.id
                      ) &&
                        commentsData
                          .filter((comment) => comment.postId === post.id)
                          .map((comment) => {
                            return (
                              <Paper
                                sx={{ p: 2, m: 2, border: "1px solid grey" }}
                                key={comment.id}
                              >
                                <h3>{comment.title}</h3>
                                <div>{comment.body}</div>
                              </Paper>
                            );
                          })}
                    </div>
                  )}
                </Card>
              );
            })}
        </>
      </Container>
    </Grid>
  );
};

export default Feed;

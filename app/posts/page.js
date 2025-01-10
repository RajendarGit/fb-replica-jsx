'use client'
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, selectPosts } from '@/redux/slice/postSlice';
import PostItemCard from './components/PostItemCard';
import { Box, Container } from '@mui/material';

const PostPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Container>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 20 }}>
        <Box sx={{ minWidth: 300, position: "fixed", top: 0 }}>
          <h1>Posts</h1>
          <p>Here are some posts from the Redux store</p>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            marginLeft: 50,
          }}
        >
          {posts.map((post) => (
            <PostItemCard
              key={post.id}
              id={post.id}
              name={post.title}
              time={`Posted ${post.id} hours ago`}
              mediaUrl={post.mediaUrl}
              mediaType={post.mediaType}
              title={post.title}
              description={post.body}
            />
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default PostPage;
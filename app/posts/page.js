"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, selectPosts, selectStatus } from "@/redux/slice/postSlice";
import PostItemCard from "./components/PostItemCard";
import { Box, Container } from "@mui/material";
import ProfileCard from "../components/ProfileCard";
import PostLoading from "./components/Loading";

const PostPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const status = useSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Container>
      <Box sx={{ display: { lg: "flex" }, flexDirection: "row", gap: 20 }}>
        <ProfileCard />
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
            marginLeft: {lg: 50},
          }}
        >
          {status === "loading"
            ? Array.from(new Array(10)).map((_, index) => (
                <PostLoading key={index} />
              ))
            : posts.map((post) => (
                <PostItemCard
                  key={post.id}
                  id={post.id}
                  avatarUrl={post.avatarUrl}
                  userName={post.userName}
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

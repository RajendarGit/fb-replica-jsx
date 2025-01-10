'use client'
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, selectPosts } from '@/redux/slice/postSlice';
import PostItemCard from './components/PostItemCard';

const PostPage = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
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
    </div>
  );
};

export default PostPage;
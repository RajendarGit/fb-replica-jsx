import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  posts: [],
  status: 'idle',
  error: null,
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  try {
    // Fetch posts
    const postsResponse = await axios.get(process.env.NEXT_PUBLIC_POSTS_API);
    const posts = postsResponse.data.slice(0, 10);

    // Fetch random images from Unsplash
    const imageRequests = posts.map(() =>
      axios.get(`${process.env.NEXT_PUBLIC_UNSPLASH_API}?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`)
    );
    const imageResponses = await Promise.all(imageRequests);
    const images = imageResponses.map((res) => res.data.urls.regular);

    // Fetch random videos from Pexels
    const videoResponse = await axios.get(process.env.NEXT_PUBLIC_PEXELS_API, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_PEXELS_ACCESS_KEY,
      },
    });
    const videos = videoResponse.data.videos.map((video) => video.video_files[0].link);

    // Mix posts with images and videos
    const combinedPosts = posts.map((post, index) => ({
      ...post,
      mediaUrl: index % 2 === 0 ? images[index % images.length] : videos[index % videos.length],
      mediaType: index % 2 === 0 ? 'image' : 'video',
    }));

    return combinedPosts;
  } catch (error) {
    throw new Error('Failed to fetch posts, images, or videos');
  }
});

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || null;
      });
  },
});

export const selectPosts = (state) => state.posts.posts;
export default postSlice.reducer;
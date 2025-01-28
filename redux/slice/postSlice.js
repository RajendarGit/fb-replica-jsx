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
    const postsResponse = await axios.get(`${process.env.NEXT_PUBLIC_POSTS_API}/posts`);
    const posts = postsResponse.data.slice(0, 10);

    // Fetch user data
    const usersResponse = await axios.get(`${process.env.NEXT_PUBLIC_POSTS_API}/users`);
    const users = usersResponse.data;

    // Fetch user avatar data
    // const userAvatarResponse = await axios.get(`${process.env.NEXT_PUBLIC_AVATAR_API}/avatar.php?g=female`);
    // const userAvatar = userAvatarResponse.data;

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

    // Mix posts with user data, images, and videos
    const combinedPosts = posts.map((post, index) => {
      const user = users.find((user) => user.id === post.userId) || {};
      // const usersAvatar = userAvatar.find((avatar) => avatar.id === post.userId) || {};
      return {
        ...post,
        userName: user.name || 'Unknown User',
        avatarUrl:'https://xsgames.co/randomusers/avatar.php?g=pixel',
        mediaUrl: index % 2 === 0 ? images[index % images.length] : videos[index % videos.length],
        mediaType: index % 2 === 0 ? 'image' : 'video',
      };
    });

    return combinedPosts;
  } catch (error) {
    throw new Error('Failed to fetch posts, users, images, or videos');
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
export const selectStatus = (state) => state.posts.status;
export default postSlice.reducer;
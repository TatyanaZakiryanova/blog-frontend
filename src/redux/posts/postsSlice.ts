import { createSlice } from '@reduxjs/toolkit';
import { PostsState, Status } from './types';
import { fetchPosts } from './asyncActions';

const initialState: PostsState = {
  posts: {
    items: [],
    status: Status.LOADING,
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.posts.status = Status.LOADING;
        state.posts.items = [];
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts.status = Status.SUCCESS;
        state.posts.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.posts.status = Status.ERROR;
        state.posts.items = [];
      });
  },
});

export default postsSlice.reducer;

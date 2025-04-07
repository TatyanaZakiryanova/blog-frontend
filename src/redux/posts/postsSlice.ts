import { createSlice } from '@reduxjs/toolkit';

import { fetchPosts } from './asyncActions';
import { PostsState, Status } from './types';

const initialState: PostsState = {
  items: [],
  status: Status.LOADING,
  error: null,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.items = [];
        state.error = action.payload as string;
      });
  },
});

export default postsSlice.reducer;

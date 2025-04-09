import { createSlice } from '@reduxjs/toolkit';

import { fetchDeletePosts, fetchPosts } from './asyncActions';
import { PostsState, Status } from './types';

const initialState: PostsState = {
  items: [],
  status: Status.LOADING,
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
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      })
      .addCase(fetchDeletePosts.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchDeletePosts.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = state.items.filter((post) => post._id !== action.payload);
      })
      .addCase(fetchDeletePosts.rejected, (state) => {
        state.status = Status.ERROR;
      });
  },
});

export default postsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { fetchDeletePosts, fetchPosts } from './asyncActions';
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
      })
      .addCase(fetchDeletePosts.pending, (state) => {
        state.status = Status.LOADING;
        state.error = null;
      })
      .addCase(fetchDeletePosts.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = state.items.filter((post) => post._id !== action.payload);
      })
      .addCase(fetchDeletePosts.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.payload as string;
      });
  },
});

export default postsSlice.reducer;

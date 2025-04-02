import { createSlice } from '@reduxjs/toolkit';
import { PostsState, Status } from './types';
import { fetchPosts } from './asyncActions';

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
      });
  },
});

export default postsSlice.reducer;

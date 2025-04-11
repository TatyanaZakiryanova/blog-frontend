import { createSlice } from '@reduxjs/toolkit';

import { Status } from '../posts/types';
import { fetchComments } from './asyncActions';
import { CommentsState } from './types';

const initialState: CommentsState = {
  items: [],
  status: Status.LOADING,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    addComment: (state, action) => {
      state.items.push(action.payload);
    },
    removeComment: (state, action) => {
      state.items = state.items.filter((comment) => comment._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { addComment, removeComment } = commentsSlice.actions;
export default commentsSlice.reducer;

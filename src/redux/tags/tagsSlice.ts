import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../posts/types';
import { TagsState } from './types';
import { fetchTags } from './asyncActions';

const initialState: TagsState = {
  items: [],
  status: Status.LOADING,
  error: null,
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTags.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchTags.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchTags.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.items = [];
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export default tagsSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { Status } from '../posts/types';
import { fetchTags } from './asyncActions';
import { TagsState } from './types';

const initialState: TagsState = {
  items: [],
  status: Status.LOADING,
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
      .addCase(fetchTags.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export default tagsSlice.reducer;

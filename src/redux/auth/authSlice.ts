import { createSlice } from '@reduxjs/toolkit';
import { Status } from '../posts/types';
import { UserState } from './types';
import { fetchAuth, fetchUserData } from './asyncActions';

const initialState: UserState = {
  data: null,
  status: Status.LOADING,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = Status.LOADING;
        state.data = null;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.data = null;
        state.error = action.error.message || 'Unknown error';
      })
      .addCase(fetchAuth.pending, (state) => {
        state.status = Status.LOADING;
        state.data = null;
        state.error = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.data = null;
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

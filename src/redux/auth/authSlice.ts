import { createSlice } from '@reduxjs/toolkit';

import { Status } from '../posts/types';
import { fetchAuth, fetchRegister, fetchUserData } from './asyncActions';
import { UserState } from './types';

const initialState: UserState = {
  data: null,
  status: Status.LOADING,
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
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.status = Status.ERROR;
        state.data = null;
      })
      .addCase(fetchAuth.pending, (state) => {
        state.status = Status.LOADING;
        state.data = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchAuth.rejected, (state) => {
        state.status = Status.ERROR;
        state.data = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = Status.LOADING;
        state.data = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload;
      })
      .addCase(fetchRegister.rejected, (state) => {
        state.status = Status.ERROR;
        state.data = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

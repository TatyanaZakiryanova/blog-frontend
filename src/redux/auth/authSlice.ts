import { createSlice } from '@reduxjs/toolkit';

import { Status } from '../posts/types';
import { fetchAuth, fetchRegister, fetchUserData } from './asyncActions';
import { UserState } from './types';

const initialState: UserState = {
  data: null,
  status: Status.LOADING,
  authError: null,
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
        state.authError = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload;
        state.authError = null;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.data = null;
        if (action.payload) {
          state.authError = action.payload;
        } else {
          state.authError = { status: 500, message: action.error.message || 'Unknown error' };
        }
      })
      .addCase(fetchAuth.pending, (state) => {
        state.status = Status.LOADING;
        state.data = null;
        state.authError = null;
      })
      .addCase(fetchAuth.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload;
        state.authError = null;
      })
      .addCase(fetchAuth.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.data = null;
        if (action.payload) {
          state.authError = action.payload;
        } else {
          state.authError = { status: 500, message: action.error.message || 'Unknown error' };
        }
      })
      .addCase(fetchRegister.pending, (state) => {
        state.status = Status.LOADING;
        state.data = null;
        state.authError = null;
      })
      .addCase(fetchRegister.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.data = action.payload;
        state.authError = null;
      })
      .addCase(fetchRegister.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.data = null;
        if (action.payload) {
          state.authError = action.payload;
        } else {
          state.authError = { status: 500, message: action.error.message || 'Unknown error' };
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

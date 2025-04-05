import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import axios from '../../axios';
import { AuthUser, UserData } from './types';

export const fetchUserData = createAsyncThunk<AuthUser, UserData>(
  'auth/fetchUserData',
  async (params) => {
    try {
      const response: AxiosResponse<AuthUser> = await axios.post('/auth/login', params);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      throw new Error(error.message || 'Unknown error');
    }
  },
);

export const fetchAuth = createAsyncThunk<AuthUser>('auth/fetchAuth', async () => {
  try {
    const response: AxiosResponse<AuthUser> = await axios.get('/auth/me');
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message || 'Unknown error');
  }
});

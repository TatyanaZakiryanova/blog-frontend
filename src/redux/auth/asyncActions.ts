import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import axios from '../../axios';
import { AuthUser, UserData, UserDataRegister } from './types';

export const fetchUserData = createAsyncThunk<AuthUser, UserData>(
  'auth/fetchUserData',
  async (params) => {
    const response: AxiosResponse<AuthUser> = await axios.post('/auth/login', params);
    return response.data;
  },
);

export const fetchAuth = createAsyncThunk<AuthUser, void>('auth/fetchAuth', async () => {
  const response: AxiosResponse<AuthUser> = await axios.get('/auth/me');
  return response.data;
});

export const fetchRegister = createAsyncThunk<AuthUser, UserDataRegister>(
  'auth/fetchRegister',
  async (params) => {
    const response: AxiosResponse<AuthUser> = await axios.post('/auth/register', params);
    return response.data;
  },
);

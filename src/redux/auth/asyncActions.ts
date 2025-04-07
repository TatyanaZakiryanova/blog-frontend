import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import axios from '../../axios';
import { AuthUser, UserData, UserDataRegister } from './types';

export const fetchUserData = createAsyncThunk<AuthUser, UserData>(
  'auth/fetchUserData',
  async (params) => {
    try {
      const response: AxiosResponse<AuthUser> = await axios.post('/auth/login', params);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

export const fetchAuth = createAsyncThunk<AuthUser, void>('auth/fetchAuth', async () => {
  try {
    const response: AxiosResponse<AuthUser> = await axios.get('/auth/me');
    return response.data;
  } catch (err) {
    throw err;
  }
});

export const fetchRegister = createAsyncThunk<AuthUser, UserDataRegister>(
  'auth/fetchRegister',
  async (params) => {
    try {
      const response: AxiosResponse<AuthUser> = await axios.post('/auth/register', params);
      return response.data;
    } catch (err) {
      throw err;
    }
  },
);

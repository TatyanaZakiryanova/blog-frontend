import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import axios from '../../axios';
import {
  AuthResponse,
  AuthUser,
  UserData,
  UserDataLogin,
  UserDataRegister,
  UserDataResponse,
} from './types';

export const fetchUserData = createAsyncThunk<
  AuthUser,
  UserDataLogin,
  { rejectValue: { status: number; message: string } }
>('auth/fetchUserData', async (params, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post('/auth/login', params);
    return response.data.data;
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data.message || 'Unknown error';
    return rejectWithValue({ status, message });
  }
});

export const fetchRegister = createAsyncThunk<
  AuthUser,
  UserDataRegister,
  { rejectValue: { status: number; message: string } }
>('auth/fetchRegister', async (params, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<AuthResponse> = await axios.post('/auth/register', params);
    return response.data.data;
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data.message || 'Unknown error';
    return rejectWithValue({ status, message });
  }
});

export const fetchAuth = createAsyncThunk<
  UserData,
  void,
  { rejectValue: { status: number; message: string } }
>('auth/fetchAuth', async (_, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<UserDataResponse> = await axios.get('/auth/me');
    return response.data.data;
  } catch (err: any) {
    const status = err.response?.status;
    const message = err.response?.data.message || 'Unknown error';
    return rejectWithValue({ status, message });
  }
});

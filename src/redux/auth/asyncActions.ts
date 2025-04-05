import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import axios from '../../axios';
import { AuthUser, UserData, UserDataRegister } from './types';

export const fetchUserData = createAsyncThunk<
  AuthUser,
  UserData,
  { rejectValue: { message: string } }
>('auth/fetchUserData', async (params, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<AuthUser> = await axios.post('/auth/login', params);
    return response.data;
  } catch (err) {
    return rejectWithValue({ message: 'Неверный логин или пароль' });
  }
});

export const fetchAuth = createAsyncThunk<AuthUser, { rejectValue: { message: string } }>(
  'auth/fetchAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<AuthUser> = await axios.get('/auth/me');
      return response.data;
    } catch (err) {
      return rejectWithValue({ message: 'Ошибка получения данных пользователя' });
    }
  },
);

export const fetchRegister = createAsyncThunk<
  AuthUser,
  UserDataRegister,
  { rejectValue: { message: string } }
>('auth/fetchRegister', async (params, { rejectWithValue }) => {
  try {
    const response: AxiosResponse<AuthUser> = await axios.post('/auth/register', params);
    return response.data;
  } catch (err) {
    return rejectWithValue({ message: 'Ошибка регистрации' });
  }
});

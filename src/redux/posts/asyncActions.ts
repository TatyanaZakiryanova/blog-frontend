import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import axios from '../../axios';
import { handleAxiosError } from '../../handleAxiosError';
import { Post } from './types';

export const fetchPosts = createAsyncThunk<Post[], void>(
  'posts/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.get<Post[]>('/posts');
      return response.data;
    } catch (err) {
      const message = handleAxiosError(err);
      return rejectWithValue(message);
    }
  },
);

export const fetchDeletePosts = createAsyncThunk<number, number, { rejectValue: string }>(
  'posts/fetchDeletePosts',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/posts/${id}`);
      return id;
    } catch (err) {
      const message = handleAxiosError(err);
      return rejectWithValue(message);
    }
  },
);

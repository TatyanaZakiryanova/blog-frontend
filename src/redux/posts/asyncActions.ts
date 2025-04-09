import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import axios from '../../axios';
import { Post } from './types';

export const fetchPosts = createAsyncThunk<Post[], void>('posts/fetchPosts', async () => {
  const response: AxiosResponse = await axios.get<Post[]>('/posts');
  return response.data;
});

export const fetchDeletePosts = createAsyncThunk<number, number>(
  'posts/fetchDeletePosts',
  async (id) => {
    await axios.delete(`/posts/${id}`);
    return id;
  },
);

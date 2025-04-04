import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Post } from './types';
import { AxiosError, AxiosResponse } from 'axios';

export const fetchPosts = createAsyncThunk<Post[]>('posts/fetchPosts', async () => {
  try {
    const response: AxiosResponse = await axios.get<Post[]>('/posts');
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message || 'Unknown error');
  }
});

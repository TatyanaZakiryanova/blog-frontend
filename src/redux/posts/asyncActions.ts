import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';
import { Post, PostResponse } from './types';
import { AxiosResponse } from 'axios';

export const fetchPosts = createAsyncThunk<Post[], { sort?: string; tag?: string }>(
  'posts/fetchPosts',
  async ({ sort, tag }) => {
    const params = new URLSearchParams();
    if (sort) params.append('sort', sort);
    if (tag) params.append('tag', tag);

    const response: AxiosResponse<PostResponse> = await axios.get(`/posts?${params.toString()}`);
    return response.data.data;
  },
);

export const fetchDeletePosts = createAsyncThunk<number, number>(
  'posts/fetchDeletePosts',
  async (id) => {
    await axios.delete(`/posts/${id}`);
    return id;
  },
);

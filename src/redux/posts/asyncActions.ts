import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from '../../axios';
import { Post } from './types';

export const fetchPosts = createAsyncThunk<Post[], { sort?: string; tag?: string }>(
  'posts/fetchPosts',
  async ({ sort, tag }) => {
    const params = new URLSearchParams();
    if (sort) params.append('sort', sort);
    if (tag) params.append('tag', tag);

    const response = await axios.get<Post[]>(`/posts?${params.toString()}`);
    return response.data;
  },
);

export const fetchDeletePosts = createAsyncThunk<string, string>(
  'posts/fetchDeletePosts',
  async (id) => {
    await axios.delete(`/posts/${id}`);
    return id;
  },
);

import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import axios from '../../axios';
import { Comment } from './types';

export const fetchComments = createAsyncThunk<Comment[], string>(
  'comments/fetchComments',
  async (id) => {
    const response: AxiosResponse = await axios.get<Comment[]>(`/posts/${id}/comments`);
    return response.data;
  },
);

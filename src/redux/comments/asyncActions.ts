import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import axios from '../../axios';
import { Comment, CommentsResponse } from './types';

export const fetchComments = createAsyncThunk<Comment[], number>(
  'comments/fetchComments',
  async (id) => {
    const response: AxiosResponse<CommentsResponse> = await axios.get(`/posts/${id}/comments`);
    return response.data.data;
  },
);

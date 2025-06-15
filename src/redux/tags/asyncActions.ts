import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import axios from '../../axios';
import { TagsResponse } from './types';

export const fetchTags = createAsyncThunk<string[]>('tags/fetchTags', async () => {
  const response: AxiosResponse<TagsResponse> = await axios.get('/tags');
  return response.data.data;
});

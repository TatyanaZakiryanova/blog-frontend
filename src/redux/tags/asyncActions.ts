import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import axios from '../../axios';

export const fetchTags = createAsyncThunk<string[]>('tags/fetchTags', async () => {
  const response: AxiosResponse = await axios.get<string[]>('/tags');
  return response.data;
});

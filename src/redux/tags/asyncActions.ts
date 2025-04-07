import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import axios from '../../axios';
import { handleAxiosError } from '../../handleAxiosError';

export const fetchTags = createAsyncThunk<string[]>(
  'tags/fetchTags',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse = await axios.get<string[]>('/tags');
      return response.data;
    } catch (err) {
      const message = handleAxiosError(err);
      return rejectWithValue(message);
    }
  },
);

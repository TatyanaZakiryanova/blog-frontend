import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';
import { AxiosError, AxiosResponse } from 'axios';

export const fetchTags = createAsyncThunk<string[]>('tags/fetchTags', async () => {
  try {
    const response: AxiosResponse = await axios.get('/tags');
    return response.data;
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error.message || 'Unknown error');
  }
});

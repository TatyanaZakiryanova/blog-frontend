import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchTags = createAsyncThunk('tags/fetchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

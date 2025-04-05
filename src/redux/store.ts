import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/postsSlice';
import tagsReducer from './tags/tagsSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    tags: tagsReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

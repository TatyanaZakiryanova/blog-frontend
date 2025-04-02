import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './posts/postsSlice';
import tagsReducer from './tags/tagsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    tags: tagsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

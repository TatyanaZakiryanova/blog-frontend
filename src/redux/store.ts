import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import commentsReducer from './comments/commentsSlice';
import postsReducer from './posts/postsSlice';
import tagsReducer from './tags/tagsSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    tags: tagsReducer,
    auth: authReducer,
    comments: commentsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

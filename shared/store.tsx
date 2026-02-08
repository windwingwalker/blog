import pathReducer from "./pathSlice";
import userReducer from "./userSlice";
import articleReducer from "./articleSlice";
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    path: pathReducer,
    user: userReducer,
    article: articleReducer
  }
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
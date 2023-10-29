import { combineReducers, configureStore } from '@reduxjs/toolkit';
import projectsDataSliceReducer from './slices/projectsDataSlice';
import userDataSliceReducer from './slices/userDataSlice';

const rootReducer = combineReducers({
  projectsDataSlice: projectsDataSliceReducer,
  userDataSlice: userDataSliceReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

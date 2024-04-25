import { configureStore } from '@reduxjs/toolkit'
import counterSlice from "./features/counter/counterSlice"
import { apis } from './features/api/apiSlice'
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    [apis.reducerPath]: apis.reducer,
   counter: counterSlice
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apis.middleware),
})

setupListeners(store.dispatch)

    // typeof state = store && store.getState
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
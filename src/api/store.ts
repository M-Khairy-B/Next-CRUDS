import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { postsApi } from './posts/postsApi'
import { rtkQueryErrorLogger } from "./ErrorCatchingMiddleware";

export const store = configureStore({
  reducer: {
    [postsApi.reducerPath]: postsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware , rtkQueryErrorLogger),
})

setupListeners(store.dispatch)
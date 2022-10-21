import { configureStore } from '@reduxjs/toolkit'
import auth from './auth'
import tasksSlice from './tasks'
import usersSlice from './users'

const store = configureStore({
  reducer: {
    auth,
    tasksSlice,
    usersSlice
  }
});

export default store;
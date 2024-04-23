import { configureStore } from '@reduxjs/toolkit';
import userLoginSlice from './Slices/LoginSlice';

const store = configureStore({
  reducer: {
    usersLogin: userLoginSlice,
  },
});

export default store;

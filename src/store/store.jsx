
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import basketReducer from '../features/basket/basketSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    basket: basketReducer,
  },
});
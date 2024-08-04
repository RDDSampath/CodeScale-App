import { configureStore } from '@reduxjs/toolkit';
import characterReducer from './characterReducer';
import batteryReducer from './batteryReducer';

export const store = configureStore({
  reducer: {
    character: characterReducer,
    battery: batteryReducer,

  },
})
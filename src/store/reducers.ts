import {combineReducers } from '@reduxjs/toolkit';
import themeSlice from './Slices/theme.slice';
import tostifySlice from './Slices/tostifi.slice';

export const rootReducer = combineReducers({
  tostify:tostifySlice,
  theme: themeSlice,
});


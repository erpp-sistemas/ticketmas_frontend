import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TypeThemeStyles } from '../../@types/slices/theme';


let initialState: TypeThemeStyles = 'light';


const themeSlice = createSlice({
    name: 'themeSlice',
    initialState,
    reducers: {
      setModeTheme: (state, action: PayloadAction<TypeThemeStyles>) =>  action.payload
    },
  });


export const { setModeTheme } = themeSlice.actions;
export default themeSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BodyTostify } from "../../@types/tostify";


const initialState: BodyTostify = {
    message: "",
    status: "success"
}; 

const tostifySlice = createSlice({
    name: "tostifySlice",
    initialState,
    reducers: {
        createTostify: (state, action: PayloadAction<BodyTostify>) => action.payload
    }
});

export const { createTostify } = tostifySlice.actions;
export default tostifySlice.reducer;











import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserData } from "../../@types/slices/user";

const initialState:UserData={
    id:null,
    apellido_materno:"",
    apellido_paterno:"",
    email:"",
    nombre:"",
    url_foto:"",
    rol:""
}



const userSlice=createSlice({
    name:"userSlice",
    initialState,
    reducers:{
        saveUser:(value,action:PayloadAction<UserData>)=>action.payload
    }
})


export const {saveUser}=userSlice.actions
export default userSlice.reducer
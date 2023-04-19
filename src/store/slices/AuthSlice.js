import { createSlice } from "@reduxjs/toolkit";

const userString = localStorage.getItem('username');
const user = JSON.parse(userString);

const initialState = {
    isAuth: user
}

const AuthSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {}
})

export default AuthSlice.reducer
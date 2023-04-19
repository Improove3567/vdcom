import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: null,
    token: null,
    id: null
}

const UserSlice = createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.email = action.payload.email
            state.token = action.payload.token
            state.id = action.payload.id
            const user = {
                email: action.payload.email,
                token: action.payload.token,
                id: action.payload.id
            }
            localStorage.setItem('username', JSON.stringify(user));
        },
        removeUser(state) {
            state.email = null
            state.token = null
            state.id = null
        }
    }
})

export default UserSlice.reducer
export const { setUser, removeUser } = UserSlice.actions
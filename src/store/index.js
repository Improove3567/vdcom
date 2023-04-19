import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSlice from "./slices/userSlice";
import AuthSlice from "./slices/AuthSlice";

const rootReducer = combineReducers({
    user: UserSlice,
    auth: AuthSlice
})

const store = configureStore({
    reducer: rootReducer
})

export default store
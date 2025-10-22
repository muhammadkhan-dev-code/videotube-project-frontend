// store/ store.js
import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../pages/Login/loginSlice.js";

export const store = configureStore({
    reducer: {
        login: loginReducer,
    }
});

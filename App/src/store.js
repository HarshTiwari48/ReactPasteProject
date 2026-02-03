import { configureStore } from "@reduxjs/toolkit";
import { pasteSlice } from "./redux/pasteSlice";
import pasteReducer from './redux/pasteSlice'


export const store = configureStore({
    reducer: {
        paste: pasteReducer,
    },
})
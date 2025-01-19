import { configureStore } from "@reduxjs/toolkit";
import { fieldReducer } from "./Slices/FieldSlice";

const store=configureStore({
    reducer:{
        field:fieldReducer
    }
})
export default store;
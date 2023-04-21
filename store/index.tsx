import {configureStore} from "@reduxjs/toolkit";
import {reducer as userReducer} from './user/index'

export const store=configureStore({
    reducer:{
        user:userReducer
    }
})
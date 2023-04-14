import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'

interface IUserInitialState {
    firstName: string,
    lastName: string,
    lastViewPage: string
}

const initialState = {
    firstName: '',
    lastName: '',
    lastViewPage: ''
} as IUserInitialState

export const userLoginHandler = createAsyncThunk<any>("user/getProfile", async () => {
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({mail: 'test@gmail.com', password: 'test'})
    });
    const data = await response.json();
    return data;
})

export const {reducer, actions} = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(userLoginHandler.fulfilled, (state: IUserInitialState, action) => {
            state.firstName = action.payload.firstName
            state.lastName = action.payload.lastName
        })
    },
    reducers: {
        setActivePage(state, action: PayloadAction<string>) {
            state.lastViewPage = action.payload
        },
    },
})


/*
*
*  extraReducers:(builder)=>{
        builder.addCase(fetchUserData.fulfilled,(state,action)=>{
            state.firstName=action.payload.firstName
            state.lastName=action.payload.lastName
        })
    }
    *
    * */
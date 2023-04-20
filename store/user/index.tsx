import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import axios from 'axios';
import Cookies from 'universal-cookie';

interface IUserInitialState {
    firstName: string,
    lastName: string,
    lastViewPage: string,
    accessToken?: string | undefined,
    loading: boolean
}

const initialState = {
    firstName: '',
    lastName: '',
    lastViewPage: '',
    accessToken: undefined,
    loading: false
} as IUserInitialState

interface IUserLoginHandler {
    mail: string,
    password: string
}

interface IUserLoginResponse {
    status?: string,
    accessToken?: string,
    errorMessage?: string
}

export const userLoginHandler = createAsyncThunk<IUserLoginResponse,
    IUserLoginHandler,
    { rejectValue: { errorMessage: string } }>(
    "user/getProfile",
    async ({mail, password}: IUserLoginHandler, ThunkAPI) => {
        try {
            const {status, accessToken, errorMessage}: IUserLoginResponse = await axios.post('/auth/login', {
                mail,
                password
            });
            return {status, accessToken, errorMessage}
        } catch (e) {
            ThunkAPI.rejectWithValue({errorMessage: e.message})
        }
    }
);

export const {reducer, actions} = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(userLoginHandler.pending, (state: IUserInitialState) => {
            state.loading = true
        })
        builder.addCase(userLoginHandler.rejected, (state: IUserInitialState) => {
            state.loading = false
        })
        builder.addCase(userLoginHandler.fulfilled, (state: IUserInitialState, action) => {
            const {status, accessToken} = action.payload
            const cookies = new Cookies();

            if (status === true) {
                state.loading = false
                state.accessToken = accessToken
                //set cookie token
                cookies.set("accessToken", accessToken)
            }
        })
    },
    reducers: {
        setActivePage(state, action: PayloadAction<string>) {
            state.lastViewPage = action.payload
        },
    },
})
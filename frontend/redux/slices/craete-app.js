import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_APP } from '@src/urls';

export const createAppSlice = createSlice({
    name: 'createAppSlice',
    initialState: {
        isSuccessful: false,
        loading: false,
    },
    reducers: {
        setIsSuccessful: (state, { payload }) => {
            state.isSuccessful = payload
            state.loading = false
        },
        loading: (state) => {
            state.loading = true
        }
    }
})

export const { setIsSuccessful, loading } = createAppSlice.actions

export const createApp = async (postData) => {

    const { status } = await axios
    .post(CREATE_APP, postData, {
        headers: { 
            'Content-Type': 'multipart/form-data' ,
        }
    })
    
    if (status === 201) return true
    return false
}
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_APP } from '@src/urls';

export const createAppSlice = createSlice({
    name: 'createAppReducer',
    initialState: {
        isSuccessful: false
    },
    reducers: {
        setIsSuccessful: (state, action) => {
            state.isSuccessful = action.payload
        }
    }
})

const { setIsSuccessful } = createAppSlice.actions

export const createApp = (postData) => async dispatch => {

    axios
    .post(CREATE_APP, postData)
    .then(response => {
        console.log(response)
        dispatch(setIsSuccessful(true))
    })
    .catch(error => {
        console.error(error)
        dispatch(setIsSuccessful(false))
    })
}
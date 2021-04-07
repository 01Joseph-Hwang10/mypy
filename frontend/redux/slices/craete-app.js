import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_APP } from '@src/urls';

export const createAppSlice = createSlice({
    name: 'createAppReducer',
    initialState: {},
    reducers: {}
})

export const createApp = (postData) => async dispatch => {
    await axios
    .post(CREATE_APP, postData)
    .then(response => console.log(response.status))
    .catch(error => console.error(error))
}
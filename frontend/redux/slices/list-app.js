import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LIST_APP } from '@src/urls';


export const listAppSlice = createSlice({
    name:' listAppSlice',
    initialState: {
        isSuccessful: false,
        appList: []
    },
    reducers: {
        loadListSuccessful: ({ isSuccessful, appList }, { payload }) => {
            appList = payload;
            isSuccessful = true;
        },
        loadListError: ({ isSuccessful }) => {
            isSuccessful = false
        }
    }
})

const { loadListSuccessful, loadListError } = listAppSlice.actions;

export const listApp = () => async dispatch => {

    axios
    .get(LIST_APP)
    .then(response => {
        console.log(response)
        const appList = response.data.results
        dispatch(loadListSuccessful(appList))
    })
    .catch(error => {
        console.error(error)
        dispatch(loadListError())
    })
}
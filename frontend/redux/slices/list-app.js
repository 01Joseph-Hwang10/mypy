import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LIST_APP } from '@src/urls';


export const listAppSlice = createSlice({
    name:' listAppSlice',
    initialState: {
        isSuccessful: false,
        appList: [],
        loading: true
    },
    reducers: {
        loadListSuccessful: ({ isSuccessful, loading, appList }, { payload }) => {
            appList = payload;
            isSuccessful = true;
            loading = false;
        },
        loadListError: ({ isSuccessful, loading }) => {
            isSuccessful = false;
            loading = false;
        },
        loading: ({ loading }) => {
            loading = true;
        }
    }
})

const { loadListSuccessful, loadListError, loading } = listAppSlice.actions;

export const listApp = () => dispatch => {

    dispatch(loading())

    axios
    .get(LIST_APP)
    .then(response => {
        const appList = response.data.results
        dispatch(loadListSuccessful(appList))
    })
    .catch(error => {
        console.error(error)
        dispatch(loadListError())
    })
}
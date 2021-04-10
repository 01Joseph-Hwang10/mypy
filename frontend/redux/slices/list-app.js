import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LIST_APP } from '@src/urls';


export const listAppSlice = createSlice({
    name:' listAppSlice',
    initialState: {
        isSuccessful: false,
        appList: [],
        loading: true,
        errorMessage: null
    },
    reducers: {
        loadListSuccessful: ( state, { payload }) => {
            state.appList = payload
            state.isSuccessful = true
            state.loading = false
        },
        loadListError: ( state, { payload }) => {
            state.isSuccessful = false
            state.loading = False
            state.errorMessage = payload
        },
        loading: (state) => {
            state.loading = false
        }
    }
})

export const { 
    loadListSuccessful, 
    loadListError, 
    loading 
} = listAppSlice.actions;

export const listApp = async () => {

    try {
        const { 
            data: { 
                results 
            } 
        } = await axios.get(LIST_APP);
        return {
            ok: true,
            data: results
        }
    } catch (error) {
        console.error(error);
        return {
            ok: false,
            data: error.message
        };
    }
}
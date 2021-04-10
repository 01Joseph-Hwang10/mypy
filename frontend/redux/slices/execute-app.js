import { createSlice } from '@reduxjs/toolkit';
import { EXECUTE_APP } from '@src/urls';
import axios from 'axios';


export const executeAppSlice = createSlice({
    name:'executeAppSlice',
    initialState: {
        isSuccessful: false,
        loading: true,
        result: null
    },
    reducers: {
        loading: (state) => {
            state.loading = true
        },
        setIsSuccessful: (state, { payload: { ok, data } }) => {
            state.isSuccessful = ok
            state.loading = false
            state.result = data
        }
    }
})


export const { loading, setIsSuccessful } = executeAppSlice.actions;


export const executeApp = async (postData) => {
    
    const { status, data } = await axios.post(EXECUTE_APP, postData)

    if (status === 200) {
        return {
            ok: true,
            data
        }
    }
    return {
        ok: false,
        data
    }
}

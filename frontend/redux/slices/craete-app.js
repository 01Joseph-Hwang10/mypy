import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { CREATE_APP } from '@src/urls';

export const {
	reducer,
	actions : {
		createAppSuccessful,
		createAppError,
		loading,
	},
} = createSlice( {
	name : 'createAppSlice',
	initialState : {
		isSuccessful : false,
		loading : false,
		isFirstTime : true,
		error : null,
	},
	reducers : {
		loading : ( state ) => {
			state.loading = true;
			state.firstTime = false;
		},
		createAppSuccessful : ( state ) => {
			state.isSuccessful = true;
			state.loading = false;
			state.firstTime = false;
		},
		createAppError : ( state ) => {
			state.isSuccessful = false;
			state.loading = false;
			state.firstTime = false;
		},
	},
} );


export const createApp = async ( postData ) => {

	try {
		const {  data, } = await axios
			.post( CREATE_APP, postData, {
				headers : { 
					'Content-Type' : 'multipart/form-data',
				},
			} );
    
		return {
			ok : true,
			data,
		};
	} catch ( error ) {
		return {
			ok : false,
			data : error.message,
		};
	}
};
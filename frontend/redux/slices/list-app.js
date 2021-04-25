import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LIST_APP, LIST_SELECTED_APP } from '@src/urls';


export const {
	reducer,
	actions : {
		loadListSuccessful,
		loadListError,
		loading,
	},
} = createSlice( {
	name : ' listAppSlice',
	initialState : {
		isSuccessful : false,
		appList : [],
		loading : true,
		errorMessage : null,
	},
	reducers : {
		loadListSuccessful : ( state, { payload, } ) => {
			state.appList = payload;
			state.isSuccessful = true;
			state.loading = false;
		},
		loadListError : ( state, { payload, } ) => {
			state.isSuccessful = false;
			state.loading = false;
			state.errorMessage = payload;
		},
		loading : ( state ) => {
			state.loading = false;
		},
	},
} );

export const listApp = async () => {

	try {
		const { 
			data : { 
				results, 
			}, 
		} = await axios.get( LIST_APP );
		return {
			ok : true,
			data : results,
		};
	} catch ( error ) {
		console.error( error );
		return {
			ok : false,
			data : error.message,
		};
	}
};


export const listSelectedApp = async ( postData ) => {

	try {
		const { data, } = await axios
			.post( LIST_SELECTED_APP, postData, { withCredentials : true, } ); 

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

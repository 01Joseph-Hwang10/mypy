import { createSlice } from "@reduxjs/toolkit";
import { UPDATE_APP_SPEC, UPDATE_INPUT_SPEC } from "@src/urls";
import axios from "axios";


export const {
	reducer,
	actions : {
		loading,
		updateAppError,
		updateAppSuccessful,
	},
} = createSlice( {
	name : 'updateAppSlice',
	initialState : {
		loading : false,
		isSuccessful : false,
		errorMessage : null,
	},
	reducers : {
		loading : ( state ) => {
			state.loading = true;
		},
		updateAppSuccessful : state => {
			state.loading = false;
			state.isSuccessful = true;
		},
		updateAppError : ( state, { payload, } ) => {
			state.loading = false;
			state.isSuccessful = false;
			state.errorMessage = payload;
		},
	},
} );


export const updateApp = async ( postData ) => {

	try {
		const { data, } = await axios
			.patch( UPDATE_APP_SPEC, postData, { withCredentials : true, } );
    
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


export const updateInputSpec = async ( postData ) => {

	try {
		await axios
			.patch( UPDATE_INPUT_SPEC, postData, { withCredentials : true, } );
		
		return {
			ok : true,
		};
	} catch ( { response : data, } ) {
		return {
			ok : false,
			data, 
		};
	}
};

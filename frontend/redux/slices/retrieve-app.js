import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { RETRIEVE_APP } from '@src/urls';


export const {
	reducer,
	actions : {
		loadAppSuccessful,
		loadAppError,
		loading,
	},
} = createSlice( {
	name : 'retrieveAppSlice',
	initialState : {
		isSuccessful : false,
		appSpec : {},
		loading : true,
		errorMessage : null,
		inputs : [],
		createdBy : {},
	},
	reducers : {
		loadAppSuccessful : ( state, { payload : { app, inputs, createdBy, }, } ) => {
			state.isSuccessful = true;
			state.loading = false;
			state.inputs = inputs;
			state.appSpec = app;
			state.createdBy = createdBy;
		},
		loadAppError : ( state, { payload, } ) => {
			state.isSuccessful = false;
			state.loading = false;
			state.errorMessage = payload;
		},
		loading : ( state ) => {
			state.loading = true;
		},
	},
} );


export const retrieveApp = async ( id ) => {
    
	try {
		const {
			data,
		} = await axios.get( `${RETRIEVE_APP}?id=${id}` );

		return {
			ok : true,
			data,
		};
	} catch ( error ) {
		console.error( error );
		return {
			ok : false,
			data : error.message,
		};
	}
};
import { createSlice } from '@reduxjs/toolkit';
import { EXECUTE_APP } from '@src/urls';
import axios from 'axios';


export const {
	reducer,
	actions : {
		loading,
		executeAppSuccessful,
		executeAppError,
	},
} = createSlice( {
	name : 'executeAppSlice',
	initialState : {
		isSuccessful : false,
		loading : true,
		result : null,
		log : null,
		error : null,
	},
	reducers : {
		loading : ( state ) => {
			state.loading = true;
		},
		executeAppSuccessful : ( state, { payload : { result, log, }, } ) => {
			state.isSuccessful = true;
			state.loading = false;
			state.result = result.toString(); // For temporal
			state.log = log;
		},
		executeAppError : ( state, { payload, } ) => {
			state.isSuccessful = false;
			state.loading = false;
			state.error = payload;
		},
	},
} );

export const executeApp = async ( postData ) => {
    
	const { status, data, } = await axios.post( EXECUTE_APP, postData );

	if ( status === 200 ) {
		return {
			ok : true,
			data,
		};
	}
	return {
		ok : false,
		data,
	};
};

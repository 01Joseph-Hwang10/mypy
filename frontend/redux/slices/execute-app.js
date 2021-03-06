import { createSlice } from '@reduxjs/toolkit';
import { BASE_APP_URL } from '@src/urls';
import axios from 'axios';


export const {
	reducer,
	actions : {
		loading,
		executeAppSuccessful,
		executeAppError,
		cleanAppPage,
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
		executeAppSuccessful : ( state, { payload,  } ) => {
			state.isSuccessful = true;
			state.loading = false;
			state.result = payload;
		},
		executeAppError : ( state, { payload, } ) => {
			state.isSuccessful = false;
			state.loading = false;
			state.result = payload;
		},
		cleanAppPage : ( state ) => {
			state.result = null;
			state.log = null;
		},
	},
} );

export const executeApp = async ( postData, { serverNumber, port, name, } ) => {


	const postUrl = `${BASE_APP_URL}:${port}/${name}`;
    
	try {
		const result = await axios.post( postUrl, postData );
		const { data, } = result;
	
		return {
			ok : true,
			data,
		};
	} catch ( { response : { data, }, } ) {
		return {
			ok : false,
			data : data,
		};
	}
};

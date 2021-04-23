import { createSlice } from '@reduxjs/toolkit';
import { LOGOUT, REFRESH, TOKEN } from '@src/urls';
import axios from 'axios';


export const {
	reducer,
	actions : {
		loading,
		signInSuccessful,
		signInError,
		logout,
	},
} = createSlice( {
	name : 'authSlice',
	initialState : {
		signedIn : true,
		userId : null,
		error : null,
		loading : false,
	},
	reducers : {
		loading : ( state ) => {
			state.loading = true;
		},
		signInSuccessful : ( state, { payload, } ) => {
			state.loading = false;
			state.userId = payload;
			state.signedIn = true;
		},
		signInError : ( state, { payload, } ) => {
			state.loading = false;
			state.error = payload;
			state.signedIn = false;
			state.userId = null;
		},
		logout : ( state ) => {
			state.loading = false;
			state.signedIn = false;
			state.userId = null;
		},
	},
} );


export const signIn = async postData => {

	const { status, data, } = await axios
		.post( TOKEN, postData, { 
			headers : {
				'Content-Type' : 'multipart/form-data',
			},
			withCredentials : true,
		} );

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


export const refreshToken = async () => {

	const { status, data, } = await axios
		.post( REFRESH, {}, { withCredentials : true, } );

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


export const signOut = async () => {
    
	await axios.get( LOGOUT, { withCredentials : true, } );
};

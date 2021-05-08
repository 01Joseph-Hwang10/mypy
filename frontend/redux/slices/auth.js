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
		signedIn : false,
		userId : null,
		error : null,
		loading : false,
	},
	reducers : {
		loading : ( state ) => {
			state.loading = true;
		},
		signInSuccessful : ( state, { payload, } ) => {
			window.localStorage.setItem( 'user_id', payload );
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

	try {
		const { data, } = await axios
			.post( TOKEN, postData, { 
				headers : {
					'Content-Type' : 'multipart/form-data',
				},
				withCredentials : true,
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


export const refreshToken = async () => {

	try {
		const { data, } = await axios
			.post( REFRESH, {}, { withCredentials : true, } );

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


export const signOut = async () => {
    
	try {
		await axios.get( LOGOUT, { withCredentials : true, } );
		return { ok : true, };
	} catch ( error ) {
		return { ok : false, };
	}
};

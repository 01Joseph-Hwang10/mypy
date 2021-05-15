import { createSlice } from "@reduxjs/toolkit";
import { SIGN_UP } from "@src/urls";
import axios from "axios";


export const {
	reducer,
	actions : {
		loading,
		createUserError,
		createUserSuccessful,
	},
} = createSlice( {
	name : 'createUserSlice',
	initialState : {
		loading : false,
		isSuccessful : false,
		error : null,
		emailError : null,
		passwordError : null,
		nameError : null,
	},
	reducers : {
		loading : ( state ) => {
			state.loading = true;
		},
		createUserSuccessful : ( state ) => {
			state.loading = false;
			state.isSuccessful = true;
		},
		createUserError : ( state, { error, emailError, passwordError, nameError, } ) => {
			state.loading = false;
			state.isSuccessful = false;
			state.error = error;
			if ( emailError ) state.emailError = emailError;
			if ( passwordError ) state.passwordError = passwordError;
			if ( nameError ) state.nameError = nameError;
		},
	},
} );


export const createUser = async ( postData ) => {

	try {
		const { status, data, } = await axios
			.post( SIGN_UP, postData, { withCredentials : true, } );

		if ( status == 201 ) {
			return {
				ok : true,
				data,
			};
		}
		return {
			ok : false,
			data,
		};
	} catch ( error ) {
		return {
			ok : false,
			data : {
				error : error.message,
			},
		};
	}
};

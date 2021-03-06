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
		createUserError : ( state, { payload : { error, emailError, passwordError, nameError, }, } ) => {
			state.loading = false;
			state.isSuccessful = false;
			state.error = error;
			if ( emailError && emailError.length != 0 ) state.emailError = emailError;
			if ( passwordError && passwordError.length != 0 ) state.passwordError = passwordError;
			if ( nameError && nameError.length != 0 ) state.nameError = nameError;
		},
	},
} );


export const createUser = async ( postData ) => {

	try {
		const {  data, } = await axios
			.post( SIGN_UP, postData, { withCredentials : true, } );

		return {
			ok : true,
			data,
		};
	} catch ( { response : { data, }, } ) {
		
		return {
			ok : false,
			data, 
		};
	}
};

import { createSlice } from "@reduxjs/toolkit";
import { UPDATE_GENERAL } from "@src/urls";
import axios from "axios";


export const {
	reducer,
} = createSlice( {
	name : 'updateUserSlice',
	initialState : {
		loading : false,
		isSuccessful : false,
		error : null,
	},
	reducers : {
		loading : ( state ) => {
			state.loading = true;
		},
		updateUserSuccessful : ( state ) => {
			state.loading = false;
			state.isSuccessful = true;
		},
		updateUserError : ( state, { payload, } ) => {
			state.loading = false;
			state.error = payload;
		},
	},
} );

export const updateUser = async ( id, postData ) => {

	try {
		await axios
			.patch( `${UPDATE_GENERAL}${id}`, postData, { withCredentials : true, } );

		return {
			ok : true,
		};
	} catch ( error ) {
		return {
			ok : false,
			data : error.message,
		};
	}
};
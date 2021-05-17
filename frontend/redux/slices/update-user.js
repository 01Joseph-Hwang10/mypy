import { createSlice } from "@reduxjs/toolkit";
import { UPDATE_GENERAL } from "@src/urls";
import axios from "axios";


export const {
	reducer,
	actions : {
		loading,
		updateUserError,
		updateUserSuccessful,
	},
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

	postData.append( 'id', id );

	try {
		await axios
			.patch( `${UPDATE_GENERAL}`, postData, { withCredentials : true, } );

		return {
			ok : true,
		};
	} catch ( { response : { data, }, } ) {
		return {
			ok : false,
			data, 
		};
	}
};
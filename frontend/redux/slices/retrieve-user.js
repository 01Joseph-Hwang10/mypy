import { createSlice } from "@reduxjs/toolkit";
import { RETRIEVE_USER } from "@src/urls";
import axios from "axios";


export const {
	reducer,
	actions : {
		loading,
		retrieveMeError,
		retrieveMeSuccessful,
	},
} = createSlice( {
	name : 'retrieveUserSlice',
	initialState : {
		loading : false,
		isSuccessful : false,
		me : null,
		error : null,
	},
	reducers : {
		loading : ( state ) => {
			state.loading = true;
		},
		retrieveMeSuccessful : ( state, { payload, } ) => {
			state.loading = false;
			state.isSuccessful = true;
			state.me = payload;
		},
		retrieveMeError : ( state, { payload, } ) => {
			state.loading = false;
			state.isSuccessful = false;
			state.me = null;
			state.error = payload;
		},
	},
} );


export const retrieveUser = async ( userId ) => {

	const getUrl = `${RETRIEVE_USER}${userId}/`;

	const { status, data, } = await axios
		.get( getUrl, { withCredentials : true, } );

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

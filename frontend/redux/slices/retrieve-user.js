import { createSlice } from "@reduxjs/toolkit";
import { RETRIEVE_USER } from "@src/urls";
import axios from "axios";


export const {
	reducer,
	actions : {
		loading,
		retrieveMeError,
		retrieveMeSuccessful,
		setImportedApps,
		setMyApps,
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

	try {
		const getUrl = `${RETRIEVE_USER}${userId}/`;

		const { data, } = await axios
			.get( getUrl, { withCredentials : true, } );

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

import { createSlice } from "@reduxjs/toolkit";
import { DELETE_APP } from "@src/urls";
import axios from "axios";



export const {
	reducer,
	actions : {
		loading,
		deleteAppError,
		deleteAppSuccessful,
	},
} = createSlice( {
	name : 'deleteAppSlice',
	initialState : {
		isSuccessful : false,
		loading : true,
		error : null,
	},
	reducers : {
		loading : state => {
			state.loading = true;
		},
		deleteAppSuccessful : state => {
			state.loading = false;
			state.isSuccessful = true;
		},
		deleteAppError : ( state, { payload, } ) => {
			state.loading = false;
			state.isSuccessful = false;
			state.error = payload;
		},
	},
} );


export const deleteApp = async id => {

	try {
		const {  data, } = await axios.delete( `${DELETE_APP}?id=${id}`, { withCredentials : true, } );

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

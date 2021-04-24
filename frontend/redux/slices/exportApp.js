import { createSlice } from "@reduxjs/toolkit";
import { UPDATE_IMPORTS } from "@src/urls";
import axios from "axios";


export const saveAppToLocalStorage = ( id ) => {
	if ( !window.localStorage.getItem( 'imported' ) ) {
		window.localStorage.setItem( 'imported', JSON.stringify( [] ) );
	}
	let exported = JSON.parse( window.localStorage.getItem( 'imported' ) );
	exported.push( id );
	window.localStorage.setItem( 'imported', JSON.stringify( exported ) );
};

export const deleteAppFromLocalStorage = ( id ) => {
	const exported = JSON.parse( window.localStorage.getItem( 'imported' ) );
	const deleted = exported.filter( appId => appId != id );
	window.localStorage.setItem( 'imported', JSON.stringify( deleted ) );
};


export const {
	reducer,
	actions : {
		loading,
		toggleAppSuccessful,
		toggleAppError,
		propagateNewItems,
		mapStorageItemsToProps,
	},
} = createSlice( {
	name : 'exportAppSlice',
	initialState : {
		loading : false,
		error : null,
		isSuccessful : false,
		imports : [],
	},
	reducers : {
		loading : ( state ) => {
			state.loading = true;
		},
		toggleAppSuccessful : ( state, { payload : { id, isAdding, }, } ) => {
			state.loading = false;
			if ( isAdding ) {
				saveAppToLocalStorage( id );
				state.imports.push( id );
			} else {
				deleteAppFromLocalStorage( id );
				state.imports = state.imports.filter( appId => appId != id );
			}
			state.isSuccessful = true;
		},
		toggleAppError : ( state, { payload, } ) => {
			state.loading = false;
			state.error = payload;
			state.isSuccessful = false;
		},
		propagateNewItems : ( state, { payload, } ) => {
			state.imports = payload;
			window.localStorage.setItem( 'imported', JSON.stringify( payload ) );
		},
		mapStorageItemsToProps : ( state ) => {
			state.imports = JSON.parse( window.localStorage.getItem( 'imported' ) );
		},
	},
} );


export const axiosExportApp = async ( postData ) => {
	const { status, } = await axios
		.patch( UPDATE_IMPORTS, postData, { withCredentials : true, } );

	if ( status === 200 ) {
		return {
			ok : true,
		};
	}
	return {
		ok : false,
	};
};

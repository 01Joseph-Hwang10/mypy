import { loading as authLoading, logout, refreshToken, signInSuccessful } from '@redux/slices/auth';
import { retrieveMeError, retrieveMeSuccessful, retrieveUser, loading as retrieveUserLoading } from '@redux/slices/retrieve-user';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { propagateNewItems, mapStorageItemsToProps } from '@slices/exportApp';
import { showMessage } from '@redux/slices/message';

function Initialize( {
	logout : Logout,
	signInSuccessful : SignInSuccessful,
	retrieveMeSuccessful : RetrieveMeSuccessful,
	retrieveMeError : RetrieveMeError,
	propagateNewItems : PropagateNewItems,
	mapStorageItemsToProps : MapStorageItemsToProps,
	showMessage : ShowMessage,
	authLoading : AuthLoading,
	retrieveUserLoading : RetrieveUserLoading,
} ) {

	useEffect( async () => {
		AuthLoading();
		RetrieveUserLoading();
		const { ok : tokenOk, } = await refreshToken();
		if ( tokenOk ) {
			const userId = window.localStorage.getItem( 'user_id' );
			SignInSuccessful( userId );
			const { ok : userOk, data, } = await retrieveUser( userId );
			if ( userOk ) {
				RetrieveMeSuccessful( data );
				const { imported, } = data;
				PropagateNewItems( imported );
			} else {
				RetrieveMeError( 'Something went wrong :/' );
				MapStorageItemsToProps();
				ShowMessage( 'Something went wrong :/', 'error' );
			}
		} else {
			Logout();
			MapStorageItemsToProps();
		}
	}, [] );

	return <></>;
}


const mapDispatchToProps = dispatch => {
	return {
		logout : () => dispatch( logout() ),
		signInSuccessful : data => dispatch( signInSuccessful( data ) ),
		retrieveMeSuccessful : response => dispatch( retrieveMeSuccessful( response ) ),
		retrieveMeError : response => dispatch( retrieveMeError( response ) ),
		propagateNewItems : data => dispatch( propagateNewItems( data ) ),
		mapStorageItemsToProps : () => dispatch( mapStorageItemsToProps() ),
		showMessage : ( data ) => dispatch( showMessage( data ) ),
		authLoading : () => dispatch( authLoading() ),
		retrieveUserLoading : () => dispatch( retrieveUserLoading() ),
	};
};


export default connect( null, mapDispatchToProps )( Initialize );

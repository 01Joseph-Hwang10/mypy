import { logout, refreshToken, signInSuccessful } from '@redux/slices/auth';
import { retrieveMeError, retrieveMeSuccessful, retrieveUser } from '@redux/slices/retrieve-user';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { propagateNewItems, mapStorageItemsToProps } from '@slices/exportApp';

function Initialize( {
	logout : Logout,
	signInSuccessful : SignInSuccessful,
	retrieveMeSuccessful : RetrieveMeSuccessful,
	retrieveMeError : RetrieveMeError,
	propagateNewItems : PropagateNewItems,
	mapStorageItemsToProps : MapStorageItemsToProps,
} ) {

	useEffect( async () => {
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
			}
		} else {
			Logout();
			MapStorageItemsToProps();
		}
	}, [] );

	return (
		<></>
	);
}


const mapDispatchToProps = dispatch => {
	return {
		logout : () => dispatch( logout() ),
		signInSuccessful : data => dispatch( signInSuccessful( data ) ),
		retrieveMeSuccessful : response => dispatch( retrieveMeSuccessful( response ) ),
		retrieveMeError : response => dispatch( retrieveMeError( response ) ),
		propagateNewItems : data => dispatch( propagateNewItems( data ) ),
		mapStorageItemsToProps : () => dispatch( mapStorageItemsToProps() ),
	};
};


export default connect( null, mapDispatchToProps )( Initialize );

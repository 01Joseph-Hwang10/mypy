import { logout, refreshToken, signInSuccessful } from '@redux/slices/auth';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function Initialize( {
	logout : Logout,
	signInSuccessful : SignInSuccessful,
} ) {

	useEffect( async () => {
		try {
			await refreshToken();
			const userId = window.localStorage.getItem( 'user_id' );
			SignInSuccessful( userId );
		} catch ( error ) {
			Logout();
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
	};
};


export default connect( null, mapDispatchToProps )( Initialize );

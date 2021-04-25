import MypyPage from '@components/mypy/MypyPage';
import listSelectedAppDataForm from '@redux/form/listSelectedAppDataForm';
import { listSelectedApp } from '@redux/slices/list-app';
import { showMessage } from '@redux/slices/message';
import { retrieveUser, retrieveMeSuccessful, retrieveMeError } from '@redux/slices/retrieve-user';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function MypyPrivate( {
	retrieveMeSuccessful : RetrieveMeSuccessful,
	retrieveMeError : RetrieveMeError,
	showMessage : ShowMessage,
} ) {

	useEffect( async () => {
		const { ok, data, } = await retrieveUser( window.localStorage.getItem( 'user_id' ) );
		if ( ok ) {
			RetrieveMeSuccessful( data );
		} else {
			RetrieveMeError( data );
			ShowMessage( { message : data, level : 'error', } );
		}
	}, [] );

	return (
		<>
			<MypyPage />
		</>
	);
}


const mapStateToProps = null;

const mapDispatchToProps = dispatch => {
	return {
		retrieveMeSuccessful : response => dispatch( retrieveMeSuccessful( response ) ),
		retrieveMeError : response => dispatch( retrieveMeError( response ) ),
		showMessage : data => dispatch( showMessage( data ) ),
	};
};


export default connect( mapStateToProps, mapDispatchToProps )( MypyPrivate );

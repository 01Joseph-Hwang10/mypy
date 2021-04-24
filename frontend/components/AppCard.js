import ExportAppDataForm from '@redux/form/exportAppDataForm';
import { loading, toggleAppError, toggleAppSuccessful, axiosExportApp } from '@redux/slices/exportApp';
import { showMessage, playAnimation } from '@redux/slices/message';
import { useRouter } from 'next/router';
import React from 'react';
import { connect } from 'react-redux';

function AppCard( {
	id,
	name,
	description,
	created_by,
	exports,
	signedIn : SignedIn,
	userId : UserId,
	loading : Loading,
	imports : Imports,
	toggleAppSuccessful : ToggleAppSuccessful,
	toggleAppError : ToggleAppError,
	showMessage : ShowMessage,
} ) {

	const router = useRouter();

	const isImported = Boolean( Imports && Imports.includes( id ) );

	const toggleExportApp = async () => {
		Loading();
		const isAdding = ( isImported ? false : true );
		if ( SignedIn ) {
			const postData = ExportAppDataForm( id, isAdding, UserId );
			const { ok, } = await axiosExportApp( postData );
			if ( !ok ) {
				ToggleAppError( "App importing not saved at your account since some error occured!" );
				ShowMessage( {
					message : 'An error occurred during importing :/',
					level : 'error',
				} );
				return;
			}
		}
		ToggleAppSuccessful( { id, isAdding, } );
		if ( isAdding ) {
			ShowMessage( {
				message : 'Successfully imported!',
				level : 'success',
			} );
		} else {
			ShowMessage( {
				message : 'Successfully unimported!',
				level : 'success',
			} );
		}
	};

	const moveToApp = ( e ) => {
		const card = e.target.closest( '.appCard' );
		const buttonWrapper = card.querySelector( '.itemWrapper' );
		if ( !buttonWrapper.contains( e.target ) ) {
			router.push( `/app/${id}` );
		}
	};


	return (
		<div onClick={moveToApp} className="appCard">
			<div className="appCard__name">
				<span className="truncate-subject">{name}</span>
			</div>
			<div className="appCard__description">
				<p className="truncate-overflow">{description}</p>
			</div>
			<div className="appCard__extraInfo">
				<div onClick={toggleExportApp} className="itemWrapper">
					<span className="exportCount">{exports} Exports</span>
					{
						isImported ? (
							<div className="exportButton bi bi-x-square"></div>
						) : (
							<div className="exportButton bi bi-plus-square"></div>
						)
					}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		signedIn : state.auth.signedIn,
		userId : state.auth.userId,
		imports : state.exportApp.imports,
	};
};


const mapDispatchToProps = dispatch => {
	return {
		loading : () => dispatch( loading() ),
		toggleAppSuccessful : ( data ) => dispatch( toggleAppSuccessful( data ) ),
		toggleAppError : ( data ) => dispatch( toggleAppError( data ) ),
		showMessage : ( data ) => dispatch( showMessage( data ) ),
	};
};


export default connect( mapStateToProps, mapDispatchToProps )( AppCard );


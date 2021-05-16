import updateAppDataForm from '@redux/form/updateAppDataForm';
import { showMessage } from '@redux/slices/message';
import { loading, updateAppError, updateAppSuccessful, updateApp } from '@redux/slices/update-app';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';

function UpdateAppSpec( {
	appSpec : {
		id,
		name,
		description,
	},
	isLoading : IsLoading,
	isSuccessful : IsSuccessful,
	errorMessage : ErrorMessage,
	updateAppSuccessful : UpdateAppSuccessful,
	updateAppError : UpdateAppError,
	loading : Loading,
} ) {

	const router = useRouter();

	const [ isIdMatchesWithUrl, setIsIdMatchesWithUrl, ] = useState( false );
    
	const submitUpdate = async e => {
		e.preventDefault();
		Loading();
		const { query : { id : appId, }, } = router;
		const postData = updateAppDataForm( e );
		postData.append( 'id', appId );
		const { ok, data, } = await updateApp( postData );
		if ( ok ) {
			UpdateAppSuccessful();
			router.push( `/app/${appId}` );
			showMessage( { message : 'Updating App Successful!', level : 'success', } );
		} else {
			UpdateAppError( data );
			showMessage( { message : data, level : 'error', } );
		}
	};
    
	useEffect( () => {
		const { query : { id : appId, }, } = router;
		if ( id && id == appId ) setIsIdMatchesWithUrl( true );
	} );


	return (
		<div id='appRoot'>
			<div className="updateAppSpecFormWrapper">
				<form onSubmit={submitUpdate}>
					<input defaultValue={isIdMatchesWithUrl && name} className="name" name='name' placeholder='name'></input>
					<TextareaAutosize defaultValue={isIdMatchesWithUrl && description} className="description" name='description' placeholder='description' />
					<label htmlFor="cover_img">App Cover Image</label>
					<input className="coverImg" name="cover_img" type="file" accept="image/*" />
					<button>Update</button>
					{ErrorMessage && !IsSuccessful && <span className="errorMessage">{ErrorMessage}</span>}
				</form>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		appSpec : state.retrieveApp.appSpec,
		isLoading : state.updateApp.loading,
		isSuccessful : state.updateApp.isSuccessful,
		errorMessage : state.updateApp.errorMessage,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loading : () => dispatch( loading() ),
		updateAppSuccessful : () => dispatch( updateAppSuccessful() ),
		updateAppError : ( response )  => dispatch( updateAppError( response ) ),
		showMessage : ( data ) => dispatch( showMessage( data ) ),
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( UpdateAppSpec );

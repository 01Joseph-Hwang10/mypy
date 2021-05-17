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
		created_by_id,
	},
	isLoading : IsLoading,
	isSuccessful : IsSuccessful,
	errorMessage : ErrorMessage,
	updateAppSuccessful : UpdateAppSuccessful,
	updateAppError : UpdateAppError,
	loading : Loading,
	userId : UserId,
} ) {

	const router = useRouter();
    
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
	
	const backToAppPage = () => {
		const { query : { id : appId, }, } = router;
		router.push( `/app/${appId}` );
	};
    
	useEffect( () => {
		if ( Number( created_by_id ) !== Number( UserId ) ) {
			router.push( `/` );
			showMessage( { message : "No permission to modify app", level : 'error', } );
		}
	} );


	return (
		<div id='appRoot'>
			<div className="updateAppSpecFormWrapper">
				<form onSubmit={submitUpdate}>
					<input defaultValue={name} className="name" name='name' placeholder='name'></input>
					<TextareaAutosize defaultValue={description} className="description" name='description' placeholder='description' />
					<label htmlFor="cover_img">App Cover Image</label>
					<input className="coverImg" name="cover_img" type="file" accept="image/*" />
					<button className="submitButton" type='submit'>Update</button>
					{ErrorMessage && !IsSuccessful && <span className="errorMessage">{ErrorMessage}</span>}
					<button className="cancelButton" onClick={backToAppPage}>Cancel</button>
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
		userId : state.auth.userId,
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

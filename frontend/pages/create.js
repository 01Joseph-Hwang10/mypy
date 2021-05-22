import React, { useEffect } from 'react';
import { createApp } from '@slices/craete-app';
import createAppDataForm from '@form/createAppDataForm';
import { connect } from 'react-redux';
import { loading, createAppSuccessful, createAppError } from '@slices/craete-app';
import { useRouter } from 'next/router';
import TextAreaAutosize from 'react-textarea-autosize';
import QuickStartContent from '@components/tutorial/QuickStartContent';

function create( { 
	loading : Loading,
	createAppSuccessful : CreateAppSuccessful,
	createAppError : CreateAppError,
	isLoading : IsLoading,
	authLoading : AuthLoading,
	retrieveUserLoading : RetrieveUserLoading,
	isSuccessful : IsSuccessful,
	isFirstTime : IsFirstTime,
	userId : UserId,
	signedIn : SignedIn,
	error : Error,
} ) {

	const router = useRouter();

	useEffect( () => {
		if ( !AuthLoading && !RetrieveUserLoading && !SignedIn ) {
			router.push( '/login' );
		}
	}, [] );

	const createAppSubmit = async ( e ) => {
		e.preventDefault();
		Loading();
		const button = e.target.querySelector( 'button' );
		button.disabled = true;
		let formData = createAppDataForm( e );
		formData.append( 'user_id', Number( UserId ) );
		const { ok, data, } = await createApp( formData );
		if ( ok ) {
			const { id, } = data;
			CreateAppSuccessful();
			button.disabled = false;
			router.push( `/app/${id}` );
		} else {
			alert( data );
			CreateAppError( data );
			button.disabled = false;
		}
	};

	if ( !SignedIn ) return <></>;
	return (
		<div className="createContentRoot">
			<div className="tutorialContentRoot">
				<div className="quickStartWrapper tutorialContent">
					<QuickStartContent />
				</div>
			</div>
			<div className="createFormWrapper">
				<form onSubmit={createAppSubmit}>
					<span className="formSubject">Create New App</span>
					<input className='name' name='name' placeholder='name' type='text' required autoComplete="off" />
					<TextAreaAutosize className='description' name='description' placeholder='description' />
					<label htmlFor='app'>Zipped Python App</label>
					<input className='app' name='app' type='file' accept='.zip' required />
					<label htmlFor='cover_img'>App Cover Image</label>
					<input className='coverImg' name='cover_img' type='file' accept='image/*' />
					<div className="selectionWrapper">
						<span htmlFor='outputType'>Output Type</span>
						<select className="outputType" name="output_type">
							<option value="application/json" selected>JSON</option>
							<option value="text/markdown">Markdown</option>
							{/* <option value="image/jpeg">JPG/JPEG</option> */}
							{/* <option value="image/png">PNG</option> */}
							<option value="text/plain">Plain text</option>
						</select>
					</div>
					{ !IsSuccessful && <span className="errorMessage">{Error}</span> }
					<button>{IsLoading ? 'Creating...' : 'Create'}</button>
				</form>
			</div>
		</div>
	);
}


const mapStateToProps = ( state ) => {
	return {
		isLoading : state.createApp.loading,
		authLoading : state.auth.loading,
		retrieveUserLoading : state.retrieveUser.loading,
		isSuccessful : state.createApp.isSuccessful,
		isFirstTime : state.createApp.isFirstTime,
		userId : state.auth.userId,
		signedIn : state.auth.signedIn,
		error : state.createApp.error,
	};
};


const mapDispatchToProps = ( dispatch ) => {
	return {
		loading : () => dispatch( loading() ),
		createAppSuccessful : () => dispatch( createAppSuccessful() ),
		createAppError : ( response ) => dispatch( createAppError( response ) ),
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( create );
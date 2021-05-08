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
		let formData = createAppDataForm( e );
		formData.append( 'user_id', Number( UserId ) );
		const { ok, data, } = await createApp( formData );
		if ( ok ) {
			const { id, } = data;
			CreateAppSuccessful();
			router.push( `/app/${id}` );
		} else {
			CreateAppError();
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
					<label htmlFor='image'>App Cover Image</label>
					<input className='coverImg' name='cover_img' type='file' accept='image/*' />
					<div className="hasFileInputWrapper">
						<label htmlFor='hasFileInput'>Do App Has File Input?</label>
						<input className='hasFileInput' name='has_file_input' type='checkbox' />
					</div>
					<button>Create</button>
				</form>
				{ IsFirstTime ? ( <></> ) : (
					<>
						{
							IsLoading ? (
								<div>Creating the app...</div>
							) : (
								<>
									{
										IsSuccessful ? (
											<div>App successfully created</div>
										) : (
											<div>App creation failed</div>
										)
									}
								</>
							)
						}
					</>
				) }
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
	};
};


const mapDispatchToProps = ( dispatch ) => {
	return {
		loading : () => dispatch( loading() ),
		createAppSuccessful : () => dispatch( createAppSuccessful() ),
		createAppError : () => dispatch( createAppError() ),
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( create );
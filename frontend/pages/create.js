import React, { useEffect } from 'react';
import { createApp } from '@slices/craete-app';
import createAppDataForm from '@form/createAppDataForm';
import { connect } from 'react-redux';
import { loading, createAppSuccessful, createAppError } from '@slices/craete-app';
import { useRouter } from 'next/router';

function create( { 
	loading : Loading,
	createAppSuccessful : CreateAppSuccessful,
	createAppError : CreateAppError,
	isLoading : IsLoading,
	isSuccessful : IsSuccessful,
	isFirstTime : IsFirstTime,
	userId : UserId,
	signedIn : SignedIn,
} ) {

	const router = useRouter();

	useEffect( () => {
		if ( !SignedIn ) {
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
		<div>
			<form onSubmit={createAppSubmit}>
				<input id='name' placeholder='name' type='text' required />
				<input id='description' placeholder='description' type='textarea' />
				<input id='app' type='file' accept='.zip' required />
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
	);
}


const mapStateToProps = ( state ) => {
	return {
		isLoading : state.createApp.loading,
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
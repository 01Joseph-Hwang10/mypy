import React from 'react';
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
} ) {

	const router = useRouter();

	const createAppSubmit = async ( e ) => {
		e.preventDefault();
		Loading();
		const postData = createAppDataForm( e );
		const { ok, data, } = await createApp( postData );
		if ( ok ) {
			const { id, } = data;
			CreateAppSuccessful();
			router.push( `/app/${id}` );
		} else {
			CreateAppError();
		}
	};

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
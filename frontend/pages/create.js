import React from 'react';
import { createApp } from '@slices/craete-app';
import createAppDataForm from '@form/createAppDataForm';
import { connect } from 'react-redux';
import { loading, setIsSuccessful } from '@slices/craete-app';

function create( { 
	loading : Loading,
	setIsSuccessful : SetIsSuccessful,
	isLoading : IsLoading,
	isSuccessful : IsSuccessful,
	isFirstTime : IsFirstTime,
} ) {

	const createAppSubmit = async ( e ) => {
		e.preventDefault();
		Loading();
		const postData = createAppDataForm( e );
		const status = await createApp( postData );
		if ( status ) {
			SetIsSuccessful( true );
		} else {
			SetIsSuccessful( false );
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
		setIsSuccessful : ( bool ) => dispatch( setIsSuccessful( bool ) ),
	};
};

export default connect( mapStateToProps, mapDispatchToProps )( create );
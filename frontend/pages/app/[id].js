import { loading as executeLoading, executeAppSuccessful, executeAppError } from '@redux/slices/execute-app';
import { loading as retrieveLoading, loadAppSuccessful, loadAppError } from '@redux/slices/retrieve-app';
import { loading as deleteLoading, deleteAppSuccessful, deleteAppError } from '@redux/slices/delete-app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { executeApp as axiosExecuteApp } from '@slices/execute-app';
import { retrieveApp as axiosRetrieveApp } from '@slices/retrieve-app';
import { deleteApp as axiosDeleteApp } from '@slices/delete-app';

function AppDetail( {
	executeLoading : ExecuteLoading,
	executeAppSuccessful : ExecuteAppSuccessful,
	executeAppError : ExecuteAppError,
	result : Result,
	log : Log,
	inputs : Inputs,
	appSpec : AppSpec,
	retrieveLoading : RetrieveLoading,
	loadAppError : LoadAppError,
	loadAppSuccessful : LoadAppSuccessful,
	retrieveIsLoading : RetrieveIsLoading,
	// deleteIsLoading : DeleteIsLoading,
	deleteLoading : DeleteLoading,
	deleteAppSuccessful : DeleteAppSuccessful,
	deleteAppError : DeleteAppError,
} ) {
    
	const router = useRouter();

	const retrieveApp = async () => {
		RetrieveLoading();
		const { ok, data, } = await axiosRetrieveApp( router.query.id );
		if ( ok ) {
			LoadAppSuccessful( data );
		} else {
			LoadAppError( data );
		}
	};

	useEffect( ()=>{
		retrieveApp();
	}, [] );
    
	const executeApp = async () => {
		ExecuteLoading();
		const forms = document.querySelectorAll( '.formElement' );
		let variables = {};
		for ( let i = 0; i < forms.length; i++ ) {
			const input = forms[ i ].querySelector( 'input' );
			const key = input.name;
			const value = input.value;
			variables[ key ] = value;
		}

		const postData = { app : AppSpec.app, variables, id : AppSpec.id, };
		const { ok, data, } = await axiosExecuteApp( postData );
		if ( ok ) {
			ExecuteAppSuccessful( data );
		} else {
			ExecuteAppError( data );
		}
	};

	const deleteApp = async () => {
		DeleteLoading();
		const { ok, data, } = await axiosDeleteApp( AppSpec.id );
		if ( ok ) {
			DeleteAppSuccessful();
			router.push( '/' );
		} else {
			DeleteAppError( data );
		}
	};


	return (
		<>
			{
				RetrieveIsLoading ? (
					<div>Loading...</div>
				) : (
					<div>
						<h2>{AppSpec.name}</h2>
						<h3>{AppSpec.description}</h3>
						<h3>Exports: {AppSpec.exports}</h3>
						<h4>Created by: {AppSpec.created_by}</h4>
						<button onClick={deleteApp}>Delete</button>
						<section>
							{
								Inputs && Inputs.map( input => (
									<div className="formElement" key={input.id}>
										<div>{input.name}</div>
										<div>{input.description}</div>
										<input name={input.name} placeholder={input.description}></input>
									</div>
								) )
							}
						</section>
						<button onClick={executeApp}>Run</button>
						<section>
							<h2>Result</h2>
							{Result}
							<h2>Log</h2>
							{
								Log && Log.map( log => (
									<div key={log.id}>{log.log}</div>
								) )
							}
						</section>
					</div>
				)
			}
		</>
	);
}


const mapStateToProps = state => {
	return {
		result : state.executeApp.result,
		log : state.executeApp.log,
		inputs : state.retrieveApp.inputs,
		appSpec : state.retrieveApp.appSpec,
		retrieveIsLoading : state.retrieveApp.loading,
		// deleteIsLoading : state.deleteApp.loading,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		executeLoading : () => dispatch( executeLoading() ),
		executeAppSuccessful : ( response ) => dispatch( executeAppSuccessful( response ) ),
		executeAppError : ( response ) => dispatch( executeAppError( response ) ),
		retrieveLoading : () => dispatch( retrieveLoading() ),
		loadAppSuccessful : ( response ) => dispatch( loadAppSuccessful( response ) ),
		loadAppError : ( response ) => dispatch( loadAppError( response ) ),
		deleteLoading : () => dispatch( deleteLoading() ),
		deleteAppSuccessful : () => dispatch( deleteAppSuccessful() ),
		deleteAppError : ( response ) => dispatch( deleteAppError( response ) ),
	};
};


export default connect( mapStateToProps, mapDispatchToProps )( AppDetail );

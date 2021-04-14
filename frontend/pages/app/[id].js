import { loading as executeLoading, executeAppSuccessful, executeAppError } from '@redux/slices/execute-app';
import { loading as retrieveLoading, loadAppSuccessful, loadAppError } from '@redux/slices/retrieve-app';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { executeApp } from '@slices/execute-app';
import { retrieveApp } from '@slices/retrieve-app';

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
} ) {
    
	const {
		query : {
			id,
		},
	} = useRouter();

	const axiosApp = async () => {
		RetrieveLoading();
		const { ok, data, } = await retrieveApp( id );
		if ( ok ) {
			LoadAppSuccessful( data );
		} else {
			LoadAppError( data );
		}
	};

	useEffect( ()=>{
		axiosApp();
	}, [] );
    
	const execute = async () => {
		ExecuteLoading();
		const postData = { app : AppSpec.app, variables : {}, user_id : AppSpec.id, };
		const { ok, data, } = await executeApp( postData );
		if ( ok ) {
			ExecuteAppSuccessful( data );
		} else {
			ExecuteAppError( data );
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
						{
							Inputs && Inputs.map( input => {
								console.log( input );
							} )
						}
						<button onClick={execute}>Run</button>
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
	};
};


export default connect( mapStateToProps, mapDispatchToProps )( AppDetail );

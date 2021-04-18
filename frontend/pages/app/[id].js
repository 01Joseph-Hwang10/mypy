import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { loading as executeLoading, executeAppSuccessful, executeAppError } from '@slices/execute-app';
import { loading as retrieveLoading, loadAppSuccessful, loadAppError } from '@slices/retrieve-app';
import { loading as deleteLoading, deleteAppSuccessful, deleteAppError } from '@slices/delete-app';
import { executeApp as axiosExecuteApp } from '@slices/execute-app';
import { retrieveApp as axiosRetrieveApp } from '@slices/retrieve-app';
import { deleteApp as axiosDeleteApp } from '@slices/delete-app';
import executeAppDataForm from '@form/executeAppDataForm';
import * as styles from '@styles/AppDetail.module.scss';
import Input from '@components/inputs/Input';


function AppDetail( {
	executeLoading : ExecuteLoading,
	executeAppSuccessful : ExecuteAppSuccessful,
	executeAppError : ExecuteAppError,
	result : Result,
	log : Log,
	inputs : Inputs,
	appSpec : { 
		name, 
		description,
		exports,
		created_by,
		id,
		app, 
	},
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
		const postData = executeAppDataForm( app, id );
		const { ok, data, } = await axiosExecuteApp( postData );
		if ( ok ) {
			ExecuteAppSuccessful( data );
		} else {
			ExecuteAppError( data );
		}
	};

	const deleteApp = async () => {
		DeleteLoading();
		const { ok, data, } = await axiosDeleteApp( id );
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
						<h2>{name}</h2>
						<h3>{description}</h3>
						<h3>Exports: {exports}</h3>
						<h4>Created by: {created_by}</h4>
						<button onClick={deleteApp}>Delete</button>
						<section className="inputContainer">
							{
								Inputs && Inputs.map( input => (
									<div className="formElement" key={input.id}>
										<Input input={input} />
									</div>
								) )
							}
							<div className="fileInput">
								<div>Files</div>
								<input name="files" type="file" accept=".zip"></input>
							</div>
						</section>
						<button onClick={executeApp}>Run</button>
						<section className="outputContainer">
							<h2>Result</h2>
							{Result}
							<h2>Log</h2>
							{
								Log && Log.map( log => (
									<div className={styles.log} key={log.id}>{'>> '}{log.log}</div>
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

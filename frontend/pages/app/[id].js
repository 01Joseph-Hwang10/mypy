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
import Input from '@components/inputs/Input';


function AppDetail( {
	executeLoading : ExecuteLoading,
	executeAppSuccessful : ExecuteAppSuccessful,
	executeAppError : ExecuteAppError,
	result : Result,
	log : Log,
	inputs : Inputs,
	userId : UserId,
	createdBy : {
		id : CreatedUserId,
		first_name : CreatedUserName,
	},
	appSpec : { 
		name, 
		description,
		exports,
		created_by,
		id,
		app,
		has_file_input,
		cover_img,
	},
	retrieveLoading : RetrieveLoading,
	loadAppError : LoadAppError,
	loadAppSuccessful : LoadAppSuccessful,
	retrieveIsLoading : RetrieveIsLoading,
	executeIsLoading : ExecuteIsLoading,
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


	if ( RetrieveIsLoading ) return <div className="appLoading">Loading...</div>;
	return (
		<div id="appRoot">
			{
				cover_img ? (
					<div 
						className='backgroundImg'
						style={{ backgroundImage : cover_img, }}
					>{name}</div>
				) : (
					<div className='pseudoBackgroundImg'>{name}</div>
				)
			}
			<section className="appHeader">
				<h2>{name}</h2>
				<h3>{description}</h3>
				<h3>Exports: {exports}</h3>
				<h4>Created by: {CreatedUserName}</h4>
				{
					UserId == CreatedUserId && <button onClick={deleteApp}>Delete</button>
				}
			</section>
			<section className="inputContainer">
				{
					Inputs && Inputs.map( input => (
						<div className="formElement" key={input.id}>
							<Input input={input} />
						</div>
					) )
				}
				{
					has_file_input && (
						<div className="fileInput">
							<div>Files</div>
							<input name="files" type="file"></input>
						</div>
					)
				}
			</section>
			<button onClick={executeApp}>Run</button>
			<section className="outputContainer">
				{
					( ExecuteIsLoading && Result !== null ) ? (
						<div className="outputContainer__loading">Loading...</div>
					) : (
						<>
							<div className="outputContainer__result">
								<h2>Result</h2>
								{Result}
							</div>
							<div className="outputContainer__log">
								<h2>Log</h2>
								{
									Log && Log.map( log => (
										<div className='log' key={log.id}>{'>> '}{log.log}</div>
									) )
								}
							</div>
						</>
					)
				}
			</section>
		</div>
	);
}


const mapStateToProps = state => {
	return {
		result : state.executeApp.result,
		log : state.executeApp.log,
		inputs : state.retrieveApp.inputs,
		appSpec : state.retrieveApp.appSpec,
		createdBy : state.retrieveApp.createdBy,
		retrieveIsLoading : state.retrieveApp.loading,
		executeIsLoading : state.executeApp.loading,
		userId : state.auth.userId,
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

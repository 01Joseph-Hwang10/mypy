import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { loading as executeLoading, executeAppSuccessful, executeAppError, cleanAppPage } from '@slices/execute-app';
import { loading as retrieveLoading, loadAppSuccessful, loadAppError } from '@slices/retrieve-app';
import { loading as deleteLoading, deleteAppSuccessful, deleteAppError } from '@slices/delete-app';
import { executeApp as axiosExecuteApp } from '@slices/execute-app';
import { retrieveApp as axiosRetrieveApp } from '@slices/retrieve-app';
import { deleteApp as axiosDeleteApp } from '@slices/delete-app';
import executeAppDataForm from '@form/executeAppDataForm';
import Input from '@components/inputs/Input';
import { BASE_APP_URL, MEDIA_URL } from '@src/urls';
import ResultWrapper from '@components/outputs/Result';
import Link from 'next/link';


function AppDetail( {
	executeLoading : ExecuteLoading,
	executeAppSuccessful : ExecuteAppSuccessful,
	executeAppError : ExecuteAppError,
	result : Result,
	// log : Log,
	inputs : Inputs,
	userId : UserId,
	createdBy : {
		id : CreatedUserId,
		first_name : CreatedUserName,
	},
	appSpec : { 
		id,
		name, 
		description,
		exports,
		app,
		cover_img,
		server_number,
		port,
		output_type,
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
	cleanAppPage : CleanAppPage,
} ) {
    
	const router = useRouter();

	const retrieveApp = async () => {
		RetrieveLoading();
		const { query : { id, }, } = router;
		const { ok, data, } = await axiosRetrieveApp( id );
		if ( ok ) {
			LoadAppSuccessful( data );
		} else {
			LoadAppError( data );
		}
	};

	useEffect( ()=>{
		CleanAppPage();
		retrieveApp();
	}, [] );
    
	const executeApp = async () => {
		ExecuteLoading();
		const postData = executeAppDataForm( app, id );
		const appSpec = {
			server_number,
			port,
			name,
		};
		const { ok, data, } = await axiosExecuteApp( postData, appSpec );
		if ( ok ) {
			ExecuteAppSuccessful( data );
		} else {
			ExecuteAppError( data );
		}
	};

	const deleteApp = async () => {
		const sureToDelete = confirm( 'Are you sure to delete the app? This action is not retreatable!!' );
		if ( sureToDelete ) {
			DeleteLoading();
			const { ok, data, } = await axiosDeleteApp( id );
			if ( ok ) {
				DeleteAppSuccessful();
				router.push( `/mypy/${UserId}` );
			} else {
				DeleteAppError( data );
			}
		}
	};


	if ( RetrieveIsLoading ) return <div className="appLoading">Loading...</div>;
	return (
		<div id="appRoot">
			{
				cover_img ? (
					<div 
						className='backgroundImg'
						style={{ backgroundImage : `url(${MEDIA_URL}${cover_img})`, }}
					>{name}</div>
				) : (
					<div className='pseudoBackgroundImg'>{name}</div>
				)
			}
			<section className="appHeader">
				<div className="appHeader__generalInfo">
					<div className='infoWrapper'>
						<h2>{name}</h2>
						<h3>Exports: {exports}</h3>
						<span className="link">API Endpoint: <i>{`${BASE_APP_URL}:${port}/${name}`}</i></span>
						<h4>Created by: {CreatedUserName}</h4>
					</div>
					<div className="buttonWrapper">
						{
							UserId == CreatedUserId && (
								<>
									<Link href={`/app/${id}/update`} passHref>
										<button className="modifyButton">Modify App Page</button>
									</Link>
									{/* <button className="updateButton">Update App(Redeploy)</button> */}
									<button className="deleteButton" onClick={deleteApp}>Delete App</button>
								</>
							)
						}
					</div>
				</div>
				<div className="appHeader__description">
					<p>{description}</p>
				</div>
			</section>
			<section className="inputContainer">
				{
					Inputs && Inputs.map( input => (
						<div className="formElementWrapper" key={input.id}>
							<div className="formElement">
								<Input input={input} />
							</div>
						</div>
					) )
				}
				<div className="runButtonWrapper">
					<button className="runButton" onClick={executeApp}>{ExecuteIsLoading ? 'Loading...' : 'Run'}</button>
				</div>
			</section>
			<section className="outputContainer">
				<div className="outputContainer__result">
					<h2 className="subject">Result</h2>
					<div className="resultWrapper">
						{
							ExecuteIsLoading ? (
								<div className="outputContainer__loading">Loading...</div>
							) : (
								<ResultWrapper 
									outputType={output_type}
									result={Result}
								/>
							)
						}
					</div>
				</div>
				{/* <div className="outputContainer__log">
					<h2 className="subject">Log</h2>
					<div className="logWrapper">
						{
							ExecuteIsLoading && Result !== null ? (
								<div className="outputContainer__loading">Loading...</div>
							) : (
								<>
									{
										Log && Log.map( log => (
											<div className='log' key={log.id}>{'>> '}{log.log}</div>
										) )
									}
								</>
							)
						}
					</div>
				</div> */}
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
		cleanAppPage : () => dispatch( cleanAppPage() ),
	};
};


export default connect( mapStateToProps, mapDispatchToProps )( AppDetail );

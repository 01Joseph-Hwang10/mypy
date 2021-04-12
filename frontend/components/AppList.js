import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { 
	listApp,
	loadListSuccessful,
	loadListError,
	loading
} from '@slices/list-app';
import AppCard from '@components/AppCard';

function AppList( {
	isLoading : IsLoading,
	appList : AppList,
	loadListSuccessful : LoadListSuccessful,
	loadListError : LoadListError,
	loading : Loading,
	errorMessage : ErrorMessage,
	isSuccessful : IsSuccessful,
} ) {

	const axiosAppList = async () => {
		Loading();
		const { ok, data, } = await listApp();
		if ( ok ) {
			LoadListSuccessful( data );
		} else {
			LoadListError( data );
		}
	};

	useEffect( () => {
		axiosAppList();
	}, [] );

	if ( IsLoading || !AppList ) {
		return <div>Loading...</div>;
	}
	if ( IsSuccessful && AppList.length === 0 ) return <div>No data found</div>;
	if ( !IsSuccessful ) return <div>{ErrorMessage}</div>;
	return (
		AppList.map( app => (
			<AppCard key={app.id} {...app}>
				{app.name}
			</AppCard>
		) )
	);
}

const mapStateToProps = state => {
	return {
		appList : state.listApp.appList,
		isSuccessful : state.listApp.isSuccessful,
		isLoading : state.listApp.loading,
		errorMessage : state.listApp.errorMessage,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loadListSuccessful : ( appList ) => dispatch( loadListSuccessful( appList ) ),
		loadListError : ( error ) => dispatch( loadListError( error ) ),
		loading : () => dispatch( loading() ),
	};   
};


export default connect( mapStateToProps, mapDispatchToProps )( AppList );

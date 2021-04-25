import { listApp, listSelectedApp } from '@redux/slices/list-app';
import listSelectedAppDataForm from '@redux/form/listSelectedAppDataForm';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { showMessage } from '@redux/slices/message';
import AppList from '@components/AppList';

function AppListSection( {
	id,
	filter = true,
	appIdList,
	sectionName,
	showMessage : ShowMessage,
	header,
	footer,
} ) {

	const [ appList, setAppList, ] = useState( [] );
	const [ error, setError, ] = useState( null );
	const [ loading, setLoading, ] = useState( false );
	const [ isSuccessful, setIsSuccessful, ] = useState( false );

	const keyPrefix = ( sectionName ? sectionName.replace( ' ', '_' ) : null );

	useEffect( async ()=>{
		setLoading( true );
		const postData = listSelectedAppDataForm( id, appIdList );
		let ok, data;
		if ( filter ) {
			const { ok : resultOk, data : resultData, } = await listSelectedApp( postData );
			ok = resultOk;
			data = resultData;
		} else {
			const { ok : resultOk, data : resultData, } = await listApp();
			ok = resultOk;
			data = resultData;
		}
		if ( ok ) {
			setIsSuccessful( true );
			setAppList( data );
		} else {
			setIsSuccessful( false );
			setError( data );
			ShowMessage( { message : data, level : 'error', } );
		}
		setLoading( false );
	}, [] );

	const appListProps = {
		IsLoading : loading,
		AppList : appList,
		ErrorMessage : error,
		IsSuccessful : isSuccessful,
		keyPrefix,
	};


	return (
		<div className='appListSection'>
			<div className="appListHeaderWrapper">
				{header}
			</div>
			<AppList {...appListProps} />
			<div className="appListFooterWrapper">
				{footer}
			</div>
		</div>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		showMessage : ( data ) => dispatch( showMessage( data ) ),
	};
};

export default connect( null, mapDispatchToProps )( AppListSection );

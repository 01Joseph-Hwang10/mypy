import React from 'react';
import AppCard from '@components/AppCard';

function AppList( {
	IsLoading,
	AppList,
	ErrorMessage,
	IsSuccessful,
	keyPrefix,
	reloadAppList,
} ) {

	if ( IsLoading || !AppList ) return <div className="appList__message">Loading...</div>;
	if ( IsSuccessful && AppList.length === 0 ) return <div className="appList__message">No data found</div>;
	if ( !IsSuccessful ) return (
		<div className="appList__error">
			<span className="appList__errorMessage">{ErrorMessage || 'Data was not successfully retrieved'}</span>
			<button onClick={reloadAppList} className='appList__loadAgain'>Load Again</button>
		</div>
	);
	return (
		<div className="appList">
			{
				AppList.map( app => {
					const key = ( keyPrefix ? `${keyPrefix}_${app.id}` : app.id );
					return (
						<AppCard key={key} {...app} />
					);
				} )
			}
		</div>
	);
}


export default AppList;

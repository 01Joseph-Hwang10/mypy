import React from 'react';
import AppCard from '@components/AppCard';

function AppList( {
	IsLoading,
	AppList,
	ErrorMessage,
	IsSuccessful,
	keyPrefix,
} ) {

	if ( IsLoading || !AppList ) return <div>Loading...</div>;
	if ( IsSuccessful && AppList.length === 0 ) return <div>No data found</div>;
	if ( !IsSuccessful ) return <div>{ErrorMessage}</div>;
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

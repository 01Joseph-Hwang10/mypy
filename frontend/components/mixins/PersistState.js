import store from '@redux/store';
import React, { useEffect } from 'react';

function PersistState() {

	useEffect( ()=>{

		return () => {
			const states = JSON.stringify( store.getState() );
			window.localStorage.setItem( 'PERSIST_STATE', states );
		};
	} );

	return <></>;
}

export default PersistState;

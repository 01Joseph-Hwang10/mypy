import AppListHeader from '@components/AppListHeader';
import AppListSection from '@components/mixins/AppListSection';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import { retrieveMeError, retrieveMeSuccessful, retrieveUser } from '@redux/slices/retrieve-user';
import { showMessage } from '@redux/slices/message';

function PrivateMypyAppList( {
	me : Me,
	retrieveMeSuccessful : RetrieveMeSuccessful,
	retrieveMeError : RetrieveMeError,
	showMessage : ShowMessage,
} ) {

	useEffect( async () => {
		const { ok, data, } = await retrieveUser( window.localStorage.getItem( 'user_id' ) );
		if ( ok ) {
			RetrieveMeSuccessful( data );
		} else {
			RetrieveMeError( data );
			ShowMessage( { message : data, level : 'error', } );
		}
	}, [] );

	let myAppListProps, 
		importedAppListProps;

	if ( Me ) {
		const {
			id,
			my_apps,
			imported,
		} = Me;

		myAppListProps = {
			id,
			appIdList : my_apps,
			sectionName : 'My Apps',
		};

		importedAppListProps = {
			id,
			appIdList : imported,
			sectionName : 'Imported Apps',
		};
	}

	return (
		<div className="mypyAppListWrapper">
			<div className="appListWrapper myAppListWrapper">
				<AppListSection 
					{...myAppListProps} 
					header={
						<>
							<AppListHeader name={'My Apps'} />
							<Link href='/create'>
								<button className="createButton buttonRipple">
									<div>
									Create new app
									</div>
									<i className="bi bi-plus-circle-fill"></i>
								</button>
							</Link>
						</>
					}
				/>
			</div>
			<div className="appListWrapper importedAppListWrapper">
				<AppListSection 
					{...importedAppListProps}
					header={
						<AppListHeader name={'Imported Apps'} />
					}
				/>
			</div>
		</div>
	);
}


const mapStateToProps = state => {
	return {
		me : state.retrieveUser.me,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		retrieveMeSuccessful : response => dispatch( retrieveMeSuccessful( response ) ),
		retrieveMeError : response => dispatch( retrieveMeError( response ) ),
		showMessage : data => dispatch( showMessage( data ) ),
	};
};



export default connect( mapStateToProps, mapDispatchToProps )( PrivateMypyAppList );


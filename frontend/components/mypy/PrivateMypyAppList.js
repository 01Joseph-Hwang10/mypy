import AppListHeader from '@components/AppListHeader';
import AppListSection from '@components/mixins/AppListSection';
import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';

function PrivateMypyAppList( {
	me : Me,
} ) {

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

const mapDispatchToProps = null;


export default connect( mapStateToProps, mapDispatchToProps )( PrivateMypyAppList );


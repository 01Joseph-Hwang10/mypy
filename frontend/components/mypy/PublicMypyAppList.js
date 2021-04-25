import AppListSection from '@components/mixins/AppListSection';
import React from 'react';
import { connect } from 'react-redux';

function PublicMypyAppList( {
	imports : Imports,
} ) {

	const importedAppListProps = {
		appIdList : Imports,
		sectionName : 'Imported Apps',
	};

	return (
		<div className="mypyAppListWrapper">
			<div className="importedAppListWrapper">
				<AppListSection {...importedAppListProps} />
			</div>
		</div>
	);
}


const mapStateToProps = state => {
	return {
		imports : state.exportApp.imports,
	};
};

const mapDispatchToProps = null;


export default connect( mapStateToProps, mapDispatchToProps )( PublicMypyAppList );


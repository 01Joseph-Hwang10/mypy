import React from 'react';

function AppListHeader( {
	name,
} ) {
	return (
		<div className="appListHeader">
			<div className="nameWrapper">
				<span>{name}</span>
			</div>
			<div className='buttonsWrapper'>
				<button className="bi bi-chevron-down"></button>
			</div>
		</div>
	);
}

export default AppListHeader;

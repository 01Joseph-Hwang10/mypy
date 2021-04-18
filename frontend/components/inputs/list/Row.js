import React from 'react';

export default function Row( {
	id : key,
	deleteListRow,
} ) {

	const deleteSelf = () => {
		deleteListRow( key );
	};

	return (
		<div className='list__row'>
			<span>Input Item</span>
			<input></input>
			{ deleteListRow && <button onClick={deleteSelf}>Delete</button> }
		</div>
	);
}

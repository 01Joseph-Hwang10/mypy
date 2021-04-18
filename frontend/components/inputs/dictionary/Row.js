import React from 'react';

export default function Row( {
	id : key,
	deleteDictionaryRow,
} ) {

	const deleteSelf = () => {
		deleteDictionaryRow( key );
	};

	return (
		<div className="dict__row">
			<span>Key, value</span>
			<input className="dict__key" placeholder="key"></input>
			<input className="dict__value" placeholder="value"></input>
			{ deleteDictionaryRow && <button onClick={deleteSelf}>Delete</button> }
		</div>
	);
}

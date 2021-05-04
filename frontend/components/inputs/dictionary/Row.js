import React from 'react';

export default function Row( {
	id : key,
	deleteDictionaryRow,
} ) {

	const deleteSelf = () => {
		if ( deleteDictionaryRow ) {
			deleteDictionaryRow( key );
		} else {
			alert( "You can't delete a first row" );
		}
	};

	return (
		<div className="dict__row">
			<input className="dict__key" placeholder="key"></input>
			<input className="dict__value" placeholder="value"></input>
			<button className="bi bi-trash-fill" onClick={deleteSelf}></button>
		</div>
	);
}

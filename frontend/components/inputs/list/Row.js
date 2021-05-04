import React from 'react';

export default function Row( {
	id : key,
	deleteListRow,
	addListRow,
	setRow,
	row,
} ) {

	const deleteSelf = () => {
		if ( deleteListRow ) {
			deleteListRow( key );
		} else {
			alert( "You can't delete a first row" );
		}
	};

	const addNextRow = ( e ) => {
		if ( e.keyCode == 13 ) {
			if ( addListRow ) {
				addListRow();
			} else {
				const addButton = e.target
					.closest( '.list' )
					.querySelector( '.list__add' )
					.querySelector( 'button' );
				addButton.click();
			}
		}
	};

	return (
		<div className={[ 'list__row', `listRow${key}`, ].join( ' ' )}>
			<input onKeyDown={addNextRow} placeholder="value"></input>
			<button className="bi bi-trash-fill" onClick={deleteSelf}></button>
		</div>
	);
}

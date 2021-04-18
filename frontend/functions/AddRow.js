

export const AddRow = ( component, toAttach ) => {
	console.log( component );
	toAttach.appendChild( component );
	const rows = toAttach.querySelectorAll( '.row' );
	const addedRow = rows[ rows.length - 1 ];
	const input = addedRow.querySelectorAll( 'input' )[ 0 ];
	input.focus();
};
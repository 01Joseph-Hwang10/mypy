import React from 'react';
import Row from './dictionary/Row';
import { AddRow } from '@functions/AddRow';

function Dictionary( {
	input : {
		name,
		description,
	},
} ) {

	const addDictionaryRow = ( e ) => {
		const toAttach = e.target
			.closest( '.formElement__dict' )
			.querySelector( '.dict' );
		const rowComponent = React.createElement( Row, {} );
		AddRow( rowComponent, toAttach );
	};

	return (
		<div className="formElement__dict">
			<div>{name}</div>
			<div>{description}</div>
			<div className="dict">
				<div className="row">
					<span>Key, value</span>
					<input className="row__key" placeholder="key"></input>
					<input className="row__value" placeholder="value"></input>
				</div>
			</div>
			<div>
				<span>Key, value</span>
				<button onClick={addDictionaryRow}></button>
				<button onClick={addDictionaryRow}></button>
			</div>
		</div>
	);
}


export default Dictionary;
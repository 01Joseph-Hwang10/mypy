import React, { useState } from 'react';
import Row from './dictionary/Row';

function Dictionary( {
	input : {
		name,
		description,
		type,
	},
} ) {

	const [ row, setRow, ] = useState( [ <Row key={1} id={1} />, ] );

	const deleteDictionaryRow = ( key ) => {
		const newState = row.filter( 
			oneRow => Number( oneRow.key ) !== Number( key ) );
		setRow( newState );
	};

	const addDictionaryRow = () => {
		const newKey = row.length + 1;
		setRow(
			[
				...row, 
				<Row 
					key={newKey} 
					id={newKey} 
					addDictionaryRow={addDictionaryRow}
					deleteDictionaryRow={deleteDictionaryRow} 
				/>, 
			]
		);
	};

	return (
		<div className="formElement__dict">
			<div className="subject">
				<span className="name">{name}</span>
				<span>{`(${type})`}</span>
			</div>
			<div>{description}</div>
			<div className="dict">
				{row}
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
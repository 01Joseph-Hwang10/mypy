import React, { useState } from 'react';
import Row from './list/Row';

function List( {
	input : {
		name,
		description,
		type,
	},
} ) {

	const [ row, setRow, ] = useState( [ <Row key={1} id={1} setRow={setRow} />, ] );

	const deleteListRow = ( key ) => {
		const newState = row.filter( 
			oneRow => Number( oneRow.key ) !== Number( key ) );
		setRow( newState );
	};

	const addListRow = () => {
		const newKey = row.length + 1;
		setRow(
			[ 
				...row, 
				<Row 
					key={newKey} 
					id={newKey} 
					addListRow={addListRow}
					deleteListRow={deleteListRow} 
				/>, 
			]
		);
	};



	return (
		<div className="formElement__list">
			<div className="subject">
				<span className='name'>{name}</span>
				<span>{`(${type})`}</span>
			</div>
			<div>{description}</div>
			<div className="list">
				{row}
			</div>
			<div>
				<span>Input Item</span>
				<button onClick={addListRow}></button>
			</div>
		</div>
	);
}


export default List;

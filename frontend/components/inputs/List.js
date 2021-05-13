import React, { useState } from 'react';
import Row from './list/Row';

function List( {
	input : {
		name,
		description,
		type,
	},
	allowedToModify,
} ) {

	const [ row, setRow, ] = useState( [ <Row key={1} id={1} setRow={setRow} row={row} />, ] );

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
			<div className="description">
				<p>{description}</p>
			</div>
			<div className="inputWrapper">
				<div className="list">
					{row}
					<div className="list__add">
						<button className="bi bi-plus-circle" onClick={addListRow}></button>
					</div>
				</div>
			</div>
		</div>
	);
}


export default List;

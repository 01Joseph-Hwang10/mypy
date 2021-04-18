import React from 'react';
import Row from './list/Row';
import { AddRow } from '@functions/AddRow';

function List( {
	input : {
		name,
		description,
	},
} ) {

	const addListRow = ( e ) => {
		const toAttach = e.target
			.closest( '.formElement__list' )
			.querySelector( '.list' );
		const rowComponent = () => React.createElement( Row, {} );
		AddRow( rowComponent, toAttach );
	};

	return (
		<div className="formElement__list">
			<div>{name}</div>
			<div>{description}</div>
			<div className="list">
				<div className="row">
					<span>Input Item</span>
					<input></input>
				</div>
			</div>
			<div>
				<span>Input Item</span>
				<button onClick={addListRow}></button>
			</div>
		</div>
	);
}


export default List;

import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Row from './list/Row';

function List( {
	input : {
		name,
		description,
		type,
		variable_name,
	},
	allowedToModify,
	isEditing,
	toggleUpdate,
	updateInputSpec,
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
		<div className="formElement__list formElement__root">
			<div className="subject">
				<div className='listInputNameWrapper'>
					<div></div>
					<div className="listInputName name">
						{!isEditing && name}
						{isEditing && <input defaultValue={name}></input>}
					</div>
					<div>
						{allowedToModify && !isEditing && <button onClick={toggleUpdate} className="bi bi-pencil-square"></button>}
						{allowedToModify && isEditing && <button onClick={updateInputSpec} className="bi bi-check2-circle"></button>}
					</div>
				</div>
				<input type='hidden' defaultValue={variable_name}></input>
			</div>
			<div className="listInputDescription description">
				{!isEditing && <p>{description}</p>}
				{isEditing && <TextareaAutosize defaultValue={description} />}
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

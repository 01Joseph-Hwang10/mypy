import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import Row from './dictionary/Row';

function Dictionary( {
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
		<div className="formElement__dict formElement__root">
			<div className="subject">
				<div className='dictInputNameWrapper'>
					<div></div>
					<div className="dictInputName name">
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
			<div className="dictInputDescription description">
				{!isEditing && <p>{description}</p>}
				{isEditing && <TextareaAutosize defaultValue={description} />}
			</div>
			<div className="inputWrapper">
				<div className="dict">
					{row}
					<div className="dict__add">
						<button className="bi bi-plus-circle" onClick={addDictionaryRow}></button>
					</div>
				</div>
			</div>
		</div>
	);
}


export default Dictionary;
import { TEAL } from '@src/constants';
import React, { useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function Boolean( {
	input : {
		name,
		description,
		type,
		variable_name,
	},
	allowedToModify,
	isEditing,
	updateInputSpec,
	toggleUpdate,
} ) {

	const [ isChecked, setIsChecked, ] = useState( false );

	const styleChecked = {
		backgroundColor : `${TEAL}`,
	};
	const styleNotChecked = {
		backgroundColor : 'tomato',
	};

	const toggleIsChecked = ( ) => {

		if ( isChecked ) {
			setIsChecked( false );
		} else {
			setIsChecked( true );
		}
	};


	return (
		<div className="formElement__bool formElement__root">
			<div className='boolInputNameWrapper'>
				<div></div>
				<div className="boolInputName name">
					{!isEditing && name}
					{isEditing && <input defaultValue={name}></input>}
				</div>
				<div>
					{allowedToModify && !isEditing && <button onClick={toggleUpdate} className="bi bi-pencil-square"></button>}
					{allowedToModify && isEditing && <button onClick={updateInputSpec} className="bi bi-check2-circle"></button>}
				</div>
			</div>
			<div className="boolInputDescription description">
				{!isEditing && <p>{description}</p>}
				{isEditing && <TextareaAutosize defaultValue={description} />}
			</div>
			<div className="boolInputWrapper">
				{
					isChecked ? (
						<input name={variable_name} className="boolInput" type="checkbox" checked></input>
					) : (
						<input name={variable_name} className="boolInput" type="checkbox"></input>
					)
				}
				<button onClick={toggleIsChecked} style={isChecked ? styleChecked : styleNotChecked}>{isChecked ? 'True' : 'False'}</button>
			</div>
		</div>
	);
}


export default Boolean;

import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function Text( {
	input : {
		name,
		description,
		variable_name,
	},
	allowedToModify,
	isEditing,
	toggleUpdate,
	updateInputSpec,
} ) {
	return (
		<div className="formElement__text formElement__root">
			<div className='textInputNameWrapper'>
				<div></div>
				<div className="textInputName name">
					{!isEditing && name}
					{isEditing && <input defaultValue={name}></input>}
				</div>
				<div>
					{allowedToModify && !isEditing && <button onClick={toggleUpdate} className="bi bi-pencil-square"></button>}
					{allowedToModify && isEditing && <button onClick={updateInputSpec} className="bi bi-check2-circle"></button>}
				</div>
			</div>
			<div className="textInputDescription description">
				{!isEditing && <p>{description}</p>}
				{isEditing && <TextareaAutosize defaultValue={description} />}
			</div>
			<div className="textInputWrapper">
				<input className="textInput" name={variable_name} placeholder={name}></input>
			</div>
		</div>
	);
}


export default Text;

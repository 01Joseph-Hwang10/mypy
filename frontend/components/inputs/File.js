import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function File( {
	input : {
		name,
		description,
		type,
		variable_name,
	},
	isEditing,
	allowedToModify,
	toggleUpdate,
	updateInputSpec,
} ) {
	return (
		<div className="formElement__file formElement__root">
			<div className='fileInputNameWrapper'>
				<div></div>
				<div className="fileInputName name">
					{!isEditing && name}
					{isEditing && <input defaultValue={name}></input>}
				</div>
				<div>
					{allowedToModify && !isEditing && <button onClick={toggleUpdate} className="bi bi-pencil-square"></button>}
					{allowedToModify && isEditing && <button onClick={updateInputSpec} className="bi bi-check2-circle"></button>}
				</div>
			</div>
			<div className="fileInputDescription description">
				{!isEditing && <p>{description}</p>}
				{isEditing && <TextareaAutosize defaultValue={description} />}
			</div>
			<div className="fileInputWrapper">
				<input name={variable_name} type="file"></input>
			</div>
		</div>
	);
}

export default File;

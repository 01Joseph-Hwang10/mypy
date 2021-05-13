import React from 'react';

function File( {
	input : {
		name,
		description,
		type,
	},
	allowedToModify,
} ) {
	return (
		<div className="formElement__file">
			<span className="fileInputName name">{`${name}(${type})`}</span>
			<div className="fileInputDescription description">
				<p>{description}</p>
			</div>
			<div className="fileInputWrapper">
				<input name={name} type="file"></input>
			</div>
		</div>
	);
}

export default File;

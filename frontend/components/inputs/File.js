import React from 'react';

function File( {
	input : {
		name,
		description,
		type,
	},
} ) {
	return (
		<div className="formElement__file">
			<span className="fileInputName">{`${name}(${type})`}</span>
			<div className="fileInputDescription">
				<p>{description}</p>
			</div>
			<div className="fileInputWrapper">
				<input name={name} type="file"></input>
			</div>
		</div>
	);
}

export default File;

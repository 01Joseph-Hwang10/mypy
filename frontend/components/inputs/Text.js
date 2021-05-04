import React from 'react';

function Text( {
	input : {
		name,
		description,
		type,
	},
} ) {
	return (
		<div className="formElement__text">
			<span className="textInputName">{`${name}(${type})`}</span>
			<div className="textInputDescription">
				<p>{description}</p>
			</div>
			<div className="textInputWrapper">
				<input className="textInput" name={name} placeholder={description}></input>
			</div>
		</div>
	);
}


export default Text;

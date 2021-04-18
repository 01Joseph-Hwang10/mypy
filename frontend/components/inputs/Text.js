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
			<div>{`${name}(${type})`}</div>
			<div>{description}</div>
			<input className="textInput" name={name} placeholder={description}></input>
		</div>
	);
}


export default Text;

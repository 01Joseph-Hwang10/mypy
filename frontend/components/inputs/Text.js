import React from 'react';

function Text( {
	input : {
		name,
		description,
	},
} ) {
	return (
		<div className="formElement__text">
			<div>{name}</div>
			<div>{description}</div>
			<input name={name} placeholder={description}></input>
		</div>
	);
}


export default Text;

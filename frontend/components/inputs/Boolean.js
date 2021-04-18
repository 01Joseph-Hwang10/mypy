import React from 'react';

function Boolean( {
	input : {
		name,
		description,
	},
} ) {
	return (
		<div className="formElement__boolean">
			<div>{name}</div>
			<div>{description}</div>
			<input type="checkbox"></input>
		</div>
	);
}


export default Boolean;

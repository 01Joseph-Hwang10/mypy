import React from 'react';

function Boolean( {
	input : {
		name,
		description,
		type,
	},
} ) {
	return (
		<div className="formElement__bool">
			<div>{`${name}(${type})`}</div>
			<div>{description}</div>
			<input name={name} className="boolInput" type="checkbox"></input>
		</div>
	);
}


export default Boolean;

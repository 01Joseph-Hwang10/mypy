import { TEAL } from '@src/constants';
import React, { useState } from 'react';

function Boolean( {
	input : {
		name,
		description,
		type,
	},
	allowedToModify,
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
		<div className="formElement__bool">
			<div className="boolInputName name">{`${name}(${type})`}</div>
			<div className="boolInputDescription description">
				<p>{description}</p>
			</div>
			<div className="boolInputWrapper">
				{
					isChecked ? (
						<input name={name} className="boolInput" type="checkbox" checked></input>
					) : (
						<input name={name} className="boolInput" type="checkbox"></input>
					)
				}
				<button onClick={toggleIsChecked} style={isChecked ? styleChecked : styleNotChecked}>{isChecked ? 'True' : 'False'}</button>
			</div>
		</div>
	);
}


export default Boolean;

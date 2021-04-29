import React from 'react';

function CodeBox( {
	children,
} ) {
	return (
		<div className='codeBoxWrapper'>
			<div className="codeBox">
				{children}
			</div>
		</div>
	);
}

export default CodeBox;

import Message from '@components/Message';
import Initialize from '@components/mixins/Initialize';
// import PersistState from '@components/mixins/PersistState';
import React from 'react';

function BaseLayout( {
	children,
} ) {
	return (
		<>
			{/* <PersistState /> */}
			<Initialize />
			<Message />
			{children}
		</>
	);
}

export default BaseLayout;
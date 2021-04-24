import Footer from '@components/Footer';
import Message from '@components/Message';
import Initialize from '@components/mixins/Initialize';
import MobileNavBar from '@components/mobile/MobileNavBar';
import React from 'react';

function MobileLayout( {
	children,
} ) {
	return (
		<>
			<Initialize />
			<Message />
			<MobileNavBar />
			<div id="mainBody">
				{children}
			</div>
			<Footer />
		</>
	);
}

export default MobileLayout;
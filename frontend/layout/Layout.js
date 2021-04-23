import Footer from '@components/Footer';
import Message from '@components/Message';
import Initialize from '@components/mixins/Initialize';
import NavBar from '@components/NavBar';
import React from 'react';

function Layout( {
	children,
} ) {
	return (
		<>
			<Initialize />
			<Message />
			<NavBar />
			<div id="mainBody">
				{children}
			</div>
			<Footer />
		</>
	);
}

export default Layout;

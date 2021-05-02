import Footer from '@components/Footer';
import NavBar from '@components/NavBar';
import React from 'react';
import BaseLayout from './BaseLayout';

function Layout( {
	children,
} ) {
	return (
		<BaseLayout>
			<NavBar />
			<div id="mainBody">
				{children}
			</div>
			<Footer />
		</BaseLayout>
	);
}

export default Layout;

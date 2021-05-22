import Footer from '@components/Footer';
import React from 'react';
import BaseLayout from './BaseLayout';

function ServerSideLayout( {
	children,
} ) {
	return (
		<BaseLayout>
			<div id='mainBody'>
				{children}
			</div>
			<Footer />
		</BaseLayout>
	);
}

export default ServerSideLayout;

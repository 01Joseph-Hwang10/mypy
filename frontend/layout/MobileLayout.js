import Footer from '@components/Footer';
import MobileNavBar from '@components/mobile/MobileNavBar';
import React from 'react';
import BaseLayout from './BaseLayout';

function MobileLayout( {
	children,
} ) {
	return (
		<BaseLayout>
			<MobileNavBar />
			<div id="mainBody">
				{children}
			</div>
			<Footer />
		</BaseLayout>
	);
}

export default MobileLayout;
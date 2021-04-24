import React from 'react';
import Layout from './Layout';
import MobileLayout from './MobileLayout';

function LayoutManager( {
	children,
} ) {

	if ( typeof window === 'object' && !window.matchMedia( '(min-width: 640px)' ).matches ) {
		return (
			<MobileLayout>
				{children}
			</MobileLayout>
		);
	}

	return (
		<Layout>
			{children}
		</Layout>
	);
}

export default LayoutManager;

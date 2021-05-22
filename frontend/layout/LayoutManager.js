import React from 'react';
import Layout from './Layout';
import MobileLayout from './MobileLayout';
import ServerSideLayout from './ServerSideLayout';

function LayoutManager( {
	children,
} ) {

	if ( typeof window === 'object' ) {
		if ( window?.matchMedia( '(min-width: 640px)' )?.matches ) {
			return (
				<Layout>
					{children}
				</Layout>
			);
		} else {
			return (
				<MobileLayout>
					{children}
				</MobileLayout>
			);
		}
	} else {
		return (
			<ServerSideLayout>
				{children}
			</ServerSideLayout>
		);
	}
}

export default LayoutManager;

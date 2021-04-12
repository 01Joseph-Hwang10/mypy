import Link from 'next/link';
import React from 'react';

function AppCard( {
	children,
	id,
} ) {
	return (
		<Link as={`/app/${id}`} href='/app/[id]' passHref>
			<button>
				<h2>{children}</h2>
			</button>
		</Link>
	);
}


export default AppCard;


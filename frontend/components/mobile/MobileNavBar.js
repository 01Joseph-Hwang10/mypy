import React from 'react';
import Link from 'next/link';

function MobileNavBar() {
	return (
		<nav id="navigation">
			<div className="logoWrapper">
				<Link href='/'>
					MYPY
				</Link>
			</div>
			<div className="popUpMenu">
				<button className="bi bi-list"></button>
			</div>
		</nav>
	);
}

export default MobileNavBar;

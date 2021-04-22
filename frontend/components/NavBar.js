import React from 'react';
import Link from 'next/link';


function NavBar() {
	return (
		<nav id='navigation'>
			<div className="logoWrapper">
				<Link href='/'>
					MYPY
				</Link>
			</div>
			<div className="navButtons">
				<Link href='/tutorial'>
					Tutorial
				</Link>
				<Link href='/login'>
					Login
				</Link>
				<Link href='/mypy'>
					Mypy
				</Link>
			</div>
		</nav>
	);
}


export default NavBar;

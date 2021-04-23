import React from 'react';
import Link from 'next/link';


const NavBar = () => {

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
				<Link href='/auth'>
					Sign In/Out
				</Link>
				<Link href='/mypy'>
					Mypy
				</Link>
			</div>
		</nav>
	);
};


export default NavBar;

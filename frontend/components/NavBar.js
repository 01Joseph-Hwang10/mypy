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
			<div>
				<button className='navButton'>Tutorial</button>
				<button className='navButton'>Login</button>
				<button className='navButton'>Mypy</button>
			</div>
		</nav>
	);
}


export default NavBar;

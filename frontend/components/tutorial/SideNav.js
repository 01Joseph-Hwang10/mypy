import React from 'react';
import Link from 'next/link';

function SideNav() {
	return (
		<div className='tutorial__sideNav'>
			<Link href='/tutorial/ch0'>Quick Start</Link>
			<Link href='/tutorial/ch1'>Set entry point</Link>
			<Link href='/tutorial/ch2'>Log and Output</Link>
			<Link href='/tutorial/ch3'>Input</Link>
			<Link href='/tutorial/ch4'>File I/O</Link>
			<Link href='/tutorial/ch5'>Customize app page</Link>
		</div>
	);
}

export default SideNav;

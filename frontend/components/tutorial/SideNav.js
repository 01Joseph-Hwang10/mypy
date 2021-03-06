import React, { useEffect } from 'react';
import Link from 'next/link';
import { indicateCurrentPage } from '@functions/CurrentPageIndicator';

function SideNav() {
	
	const indicatePage = () => {
		indicateCurrentPage();
	};

	useEffect( ()=>{
		indicateCurrentPage();
	}, [] );

	return (
		<div className='tutorial__sideNav'>
			<Link onClick href='/tutorial/ch0'>
				<button className="btn0" onClick={indicatePage}>About Mypy</button>
			</Link>
			<Link onClick href='/tutorial/ch1'>
				<button className="btn1" onClick={indicatePage}>Quick Start</button>
			</Link>
			<Link onClick href='/tutorial/ch2'>
				<button className="btn2" onClick={indicatePage}>Deploying on mypy</button>
			</Link>
			<Link onClick href='/tutorial/ch3'>
				<button className="btn3" onClick={indicatePage}>Input</button>
			</Link>
			<Link onClick href='/tutorial/ch4'>
				<button className="btn4" onClick={indicatePage}>Error and Output</button>
			</Link>
			<Link onClick href='/tutorial/ch5'>
				<button className="btn5" onClick={indicatePage}>Customize app page</button>
			</Link>
			{/* <Link onClick href='/tutorial/ch6'>
				<button className="btn6" onClick={indicatePage}>Using as API</button>
			</Link> */}
			<Link onClick href='/tutorial/ch7'>
				<button className="btn7" onClick={indicatePage}>Using Modules</button>
			</Link>
		</div>
	);
}

export default SideNav;

import Link from 'next/link';
import React from 'react';
// import Search from './Search';

function SideBar() {
	return (
		<div className="sideBar">
			{/* <Search placeholder="Search for python IPO apps!" /> */}
			<div className="sideBar__aboutApp">
				<span>MYPY: Python app everywhere!</span>
				<span>
					MYPY serves your python app online! 
					<Link href='/tutorial/ch0'>Learn more!</Link>
				</span>
			</div>
			<div className="sideBar__buttons">
				<Link href='/create'>
					<button className="buttonRipple">Create new</button>
				</Link>
				<Link href='/tutorial'>
					<button className="buttonRipple">Tutorial</button>
				</Link>
			</div>
			{/* <div className="sideBar__survey">
				<span>Please tell us your app experience!</span>
				<span>Was the app useful?</span>
				<div>
					<button className="bi bi-hand-thumbs-up"></button>
					<button className="bi bi-hand-thumbs-down"></button>
				</div>
			</div> */}
			<div className="sideBar__extraContent">
				<span>
					This app is currently on testing, thus not stable. 
					It would be very thankful to report a bug or improvement.
				</span>
				<Link href='/feedback'>
					<button>Send Proposal</button>
				</Link>
			</div>
		</div>
	);
}

export default SideBar;

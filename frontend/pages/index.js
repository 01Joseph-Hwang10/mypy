import React from 'react';
import AppList from '@components/AppList';
import Link from 'next/link';
import Search from '@components/Search';

export default function Home() {
	return (
		<div id="contentRoot">
			<section className="mainContent">
				<div className="createButton">
					<div>
						<Link href='/create'>Create new app</Link>
					</div>
					<i className="bi bi-plus-circle-fill"></i>
				</div>
				<AppList />
			</section>
			<section className="sideBar">
				<Search />
				<div className="aboutApp">
					<h1>MYPY: Python app everywhere!</h1>
					<h3>MYPY supports python console to make your IPO executable!</h3>
					{/* <button>Tutorial</button>
					<button>About App</button>
					<button>Contact/Proposal</button> */}
				</div>
			</section>
		</div>
	);
}

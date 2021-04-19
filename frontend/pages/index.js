import React from 'react';
import AppList from '@components/AppList';
import Link from 'next/link';

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
				<h1>MYPY: Python app everywhere!</h1>
				<h3>MYPY supports python console to make your IPO executable!</h3>
			</section>
		</div>
	);
}

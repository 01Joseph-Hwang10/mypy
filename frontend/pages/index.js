import React from 'react';
import AppList from '@components/AppList';
import Link from 'next/link';
import Search from '@components/Search';

export default function Home() {
	return (
		<div id="contentRoot">
			<section className="mainContent">
				<Link href='/create'>
					<button className="createButton buttonRipple">
						<div>
							Create new app
						</div>
						<i className="bi bi-plus-circle-fill"></i>
					</button>
				</Link>
				<AppList />
			</section>
			<section className="sideBar">
				<Search />
				<div className="sideBar__aboutApp">
					<span>MYPY: Python app everywhere!</span>
					<span>
						MYPY serves your python app online! 
						<Link href='/about'>Learn more!</Link>
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
				<div className="sideBar__survey">
					<span>Please tell us your app experience!</span>
					<span>Was the app useful?</span>
					<div>
						<button className="bi bi-hand-thumbs-up"></button>
						<button className="bi bi-hand-thumbs-down"></button>
					</div>
				</div>
			</section>
		</div>
	);
}

import React from 'react';
import AppList from '@components/AppList';
import Link from 'next/link';
import SideBar from '@components/SideBar';
import LoginForm from '@components/login/LoginForm';
import { translateDistance } from '@functions/SignIn';

export default function Home() {


	const animationStyle = {
		transform : `translateX(${translateDistance}rem)`,
	};

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
			<section className="sideBarWrapper">
				<SideBar />
				<div id="loginFormWrapper" style={animationStyle}>
					<LoginForm />
				</div>
			</section>
		</div>
	);
}

import LoginForm from '@components/login/LoginForm';
import { translateDistance } from '@functions/SignIn';
import React from 'react';
import MyAppList from './MyAppList';
import MySideBar from './MySideBar';

function MypyPage() {

	const animationStyle = {
		transform : `translateX(${translateDistance}rem)`,
	};

	return (
		<div id="contentRoot">
			<section className='.mainContent'>
				<MyAppList />
			</section>
			<section className=".sideBarWrapper">
				<MySideBar />
				<div id="loginFormWrapper" style={animationStyle}>
					<LoginForm />
				</div>
			</section>
		</div>
	);
}

export default MypyPage;

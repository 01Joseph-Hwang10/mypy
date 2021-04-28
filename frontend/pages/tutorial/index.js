import LoginForm from '@components/login/LoginForm';
import SideNav from '@components/tutorial/SideNav';
import { translateDistance } from '@functions/SignIn';
import React from 'react';

function Tutorial() {

	const animationStyle = {
		transform : `translateX(${translateDistance}rem)`,
	};

	return (
		<div className='tutorialContentRoot'>
			<section className='tutorialSideBarWrapper'>
				<SideNav />
			</section>
			<section className="tutorialContent"></section>
			<div id="loginFormWrapper" style={animationStyle}>
				<LoginForm />
			</div>
		</div>
	);
}


export default Tutorial;
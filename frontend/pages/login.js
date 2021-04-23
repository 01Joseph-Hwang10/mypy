import LoginContent from '@components/login/LoginContent';
import LoginForm from '@components/login/LoginForm';
import React from 'react';

function login() {
	return (
		<div id="loginContentRoot">
			<LoginContent />
			<LoginForm />
		</div>
	);
}

export default login;

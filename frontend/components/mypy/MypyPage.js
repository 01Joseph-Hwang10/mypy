import LoginForm from '@components/login/LoginForm';
import { translateDistance } from '@functions/SignIn';
import React from 'react';
import PrivateMypyAppList from './PrivateMypyAppList';
import MypySideBar from './MypySideBar';
import { connect } from 'react-redux';
import PublicMypyAppList from './PublicMypyAppList';

function MypyPage( {
	signedIn : SignedIn,
} ) {

	const animationStyle = {
		transform : `translateX(${translateDistance}rem)`,
	};

	return (
		<div id="contentRoot">
			<section className='mainContent'>
				{
					SignedIn ? (
						<PrivateMypyAppList />
					) : (
						<PublicMypyAppList />
					)
				}
			</section>
			<section className="sideBarWrapper">
				<MypySideBar />
				<div id="loginFormWrapper" style={animationStyle}>
					<LoginForm />
				</div>
			</section>
		</div>
	);
}


const mapStateToProps = state => {
	return {
		signedIn : state.auth.signedIn,
	};
};


export default connect( mapStateToProps, null )( MypyPage );

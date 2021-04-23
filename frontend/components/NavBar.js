import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logout, signOut } from '@redux/slices/auth';
import { useRouter } from 'next/router';
import { showMessage, playAnimation } from '@redux/slices/message';


const NavBar = ( {
	signedIn : SignedIn,
	logout : Logout,
	showMessage : ShowMessage,
} ) => {

	const router = useRouter();

	const signOutClick = async () => {
		await signOut();
		Logout();
		router.push( '/' );
		ShowMessage( { message : "Goodbye :)", } );
		playAnimation();
	};

	return (
		<nav id='navigation'>
			<div className="logoWrapper">
				<Link href='/'>
					MYPY
				</Link>
			</div>
			<div className="navButtons">
				<Link href='/tutorial'>
					Tutorial
				</Link>
				{
					SignedIn ? (
						<button onClick={signOutClick}>Sign Out</button>
					) : (
						<Link href='/login'>
						Sign In
						</Link>
					)
				}
				<Link href='/mypy'>
					Mypy
				</Link>
			</div>
		</nav>
	);
};


const mapStateToProps = state => {
	return {
		signedIn : state.auth.signedIn,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		logout : () => dispatch( logout() ),
		showMessage : ( data ) => dispatch( showMessage( data ) ),
	};
};


export default connect( mapStateToProps, mapDispatchToProps )( NavBar );

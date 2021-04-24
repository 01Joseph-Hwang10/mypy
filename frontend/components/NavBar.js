import React, { useEffect } from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import { logout, signOut } from '@redux/slices/auth';
import { useRouter } from 'next/router';
import { showMessage, playAnimation } from '@redux/slices/message';
import { signInToggle } from '@functions/SignIn';
import { returnLoginElements } from '@functions/SignIn';


const NavBar = ( {
	signedIn : SignedIn,
	logout : Logout,
	showMessage : ShowMessage,
} ) => {

	const router = useRouter();

	const { signInButton, } = returnLoginElements();

	useEffect( ()=> {
		if ( signInButton ) {
			signInButton.removeAttribute( 'style' );
		}
	}, [ SignedIn, ] );

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
						<button onClick={signInToggle} className="signInButton">Sign In</button>
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

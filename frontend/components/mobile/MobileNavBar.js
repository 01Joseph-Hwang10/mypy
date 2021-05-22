import React, { useState } from 'react';
import Link from 'next/link';
import { logout, signOut } from '@redux/slices/auth';
import { showMessage } from '@redux/slices/message';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';

function MobileNavBar( {
	signedIn : SignedIn,
	logout : Logout,
	showMessage : ShowMessage,
} ) {

	const router = useRouter();
	const [ visible, setVisible, ] = useState( false );

	const signOutClick = async () => {
		await signOut();
		Logout();
		router.push( '/mypy' );
		setVisible( false );
	};

	const styleAtVisible = {
		// display : 'flex',
		transform : 'rotateX(0deg)',
	};

	const styleAtNotVisible = {
		// display : 'none',
		transform : 'rotateX(-90deg)',
	};

	const toggleVisible = () => {
		if ( visible ) {
			setVisible( false );
		} else {
			setVisible( true );
		}
	};

	return (
		<nav id="navigation">
			<div className="logoWrapper">
				<Link href='/'>
					MYPY
				</Link>
			</div>
			<div className="popUpMenu">
				<button onClick={toggleVisible} className="popUpMenuButton bi bi-list"></button>
				<div style={visible ? styleAtVisible : styleAtNotVisible} className="popUpMenuItems">
					<Link href='/'><button onClick={toggleVisible}>Browse Apps</button></Link>
					<Link href='/mypy'><button onClick={toggleVisible}>MYPY</button></Link>
					<Link href='/tutorial'><button onClick={toggleVisible}>Tutorial</button></Link>
					{
						SignedIn ? (
							<button onClick={signOutClick}>Sign Out</button>
						) : (
							<Link href='/login'><button onClick={toggleVisible}>Sign In</button></Link>
						)
					}
				</div>
			</div>
		</nav>
	);
}

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


export default connect( mapStateToProps, mapDispatchToProps )( MobileNavBar );

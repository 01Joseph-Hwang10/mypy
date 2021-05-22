import React from 'react';
import Link from 'next/link';
import { SIGN_UP } from '@src/urls';
import { connect } from 'react-redux';
import { loading, signInError, signInSuccessful, signIn, toggleSignUp, googleSignIn as axiosGoogleSignIn } from '@redux/slices/auth';
import SignInDataForm from '@redux/form/SignInDataForm';
import { useRouter } from 'next/router';
import { showMessage } from '@redux/slices/message';
import { cleanUp } from '@functions/SignIn';
import GoogleLogin from 'react-google-login';
import { googleSignUpDataForm } from '@redux/form/SignUpDataForm';


function LoginForm( {
	isLoading : IsLoading,
	error : ErrorMessage,
	signedIn : SignedIn,
	loading : Loading,
	signInSuccessful : SignInSuccessful,
	signInError : SignInError,
	showMessage : ShowMessage,
	toggleSignUp : ToggleSignUp,
} ) {

	const router = useRouter();
	const { route, } = router;

	const emailSignIn = async ( e ) => {
		e.preventDefault();
		Loading();
		const postData = SignInDataForm( e );
		const { ok, data, } = await signIn( postData );
		if ( ok ) {
			const { user_id, } = data;
			SignInSuccessful( user_id );
			const dividedRoute = route.split( '/' );
			if (
				window.matchMedia( '(min-width: 640px)' ).matches &&
				dividedRoute[ dividedRoute.length - 1 ] !== 'login'
			) {
				cleanUp();
			} else {
				router.push( '/' );
			}
			ShowMessage( { message : "Hello :)", } );
		} else {
			SignInError( "Sign In Failed! You may submitted wrong email or password" );
		}
	};

	const googleSignIn = async ( response ) => {
		const { tokenId, } = response;
		console.log( tokenId );
		const postData = googleSignUpDataForm( tokenId );
		const { ok, data, } = await axiosGoogleSignIn( postData );
		if ( ok ) {
			const { user_id, } = data;
			SignInSuccessful( user_id );
			const dividedRoute = route.split( '/' );
			if (
				window.matchMedia( '(min-width: 640px)' ).matches &&
				dividedRoute[ dividedRoute.length - 1 ] !== 'login'
			) {
				cleanUp();
			} else {
				router.push( '/mypy' );
			}
			ShowMessage( { message : "Hello :)", } );
		} else {
			SignInError( "Sign In Failed! Please try another method to login or try it later" );
		}
	};



	return (
		<div className="loginForm">
			<div className="loginForm__main">
				<div className="socialLogins">
					{/* <span>Sign In With...</span> */}
					<div className="socialLogins__buttons">
						<GoogleLogin 
							clientId='502846912783-u6geb0s3adj8f16l8qm5dqedb9r03tb9.apps.googleusercontent.com'
							render={renderProps => (
								<button className="gSignInWrapper" onClick={renderProps.onClick} disabled={renderProps.disabled} id="gSignInWrapper">
									<div id="customBtn" className="customGPlusSignIn">
										<span className="icon bi bi-google"></span>
										<span className="buttonText">Sign In With Google</span>
									</div>
								</button>
							)}
							buttonText='Login'
							onSuccess={response => googleSignIn( response )}
							onFailure={()=>alert( 'Google sign in failed. Please try it later or try another sign in method.' )}
							cookiePolicy={'single_host_origin'}
						/>
					</div>
				</div>
				<form onSubmit={emailSignIn} className="emailLogin">
					<span className="emailLogin__subject">...or with Email</span>
					<input required className="emailLogin__email" type='email' placeholder='email'></input>
					<input required className="emailLogin__password" type='password' placeholder="password"></input>
					{
						IsLoading ? (
							<button disabled className="loadingButton">Loading...</button>
						) : (
							<button className="submitButton">Sign In</button>
						)
					}
					{
						ErrorMessage !== null && <span className="emailLogin__error">{ErrorMessage}</span>
					}
				</form>
				<div className="signUp signUpButton">
					<button onClick={ToggleSignUp}>Have no account? <Link href='/login/signup'>Sign Up</Link></button>
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		isLoading : state.auth.loading,
		error : state.auth.error,
		signedIn : state.auth.signedIn,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loading : () => dispatch( loading() ),
		signInSuccessful : ( response ) => dispatch( signInSuccessful( response ) ),
		signInError : ( response ) => dispatch( signInError( response ) ),
		showMessage : ( data ) => dispatch( showMessage( data ) ),
		toggleSignUp : () => dispatch( toggleSignUp() ),
	};
};


export default connect( mapStateToProps, mapDispatchToProps )( LoginForm );

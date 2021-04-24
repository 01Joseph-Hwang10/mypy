import React from 'react';
import Link from 'next/link';
import { SIGN_UP } from '@src/urls';
import { connect } from 'react-redux';
import { loading, signInError, signInSuccessful, signIn } from '@redux/slices/auth';
import SignInDataForm from '@redux/form/SignInDataForm';
import { useRouter } from 'next/router';
import { showMessage, playAnimation } from '@redux/slices/message';
import { cleanUp } from '@functions/SignIn';

function LoginForm( {
	isLoading : IsLoading,
	error : ErrorMessage,
	signedIn : SignedIn,
	loading : Loading,
	signInSuccessful : SignInSuccessful,
	signInError : SignInError,
	showMessage : ShowMessage,
} ) {

	const router = useRouter();

	const signInSubmit = async ( e ) => {
		e.preventDefault();
		Loading();
		const postData = SignInDataForm( e );
		const { ok, data, } = await signIn( postData );
		if ( ok ) {
			const { user_id, } = data;
			SignInSuccessful( user_id );
			if ( window.matchMedia( '(min-width: 640px)' ).matches ) {
				cleanUp();
			} else {
				router.push( '/' );
			}
			ShowMessage( { message : "Hello :)", } );
		} else {
			SignInError( "Sign In Failed! You may submitted wrong email or password" );
		}
	};

	return (
		<div className="loginForm">
			<div className="loginForm__main">
				<div className="socialLogins">
					<span>Sign In With...</span>
					<div className="socialLogins__buttons">
						<button className="googleLogin">
							<i className="bi bi-google"></i>
						</button>
						<button className="kakaoLogin">
							<i className='bi bi-chat-fill'></i>
						</button>
					</div>
				</div>
				<form onSubmit={signInSubmit} className="emailLogin">
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
				<div className="signUp">
					<span>Have no account? <Link href={SIGN_UP}>Sign Up</Link></span>
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
	};
};


export default connect( mapStateToProps, mapDispatchToProps )( LoginForm );

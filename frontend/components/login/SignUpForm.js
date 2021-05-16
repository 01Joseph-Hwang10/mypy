import React from 'react';
import { loading as signInLoading, signIn, signInError, signInSuccessful, toggleSignUp } from '@slices/auth';
import { connect } from 'react-redux';
import { createUser, createUserError, createUserSuccessful, loading as signUpLoading } from '@redux/slices/create-user';
import SignUpDataForm, { getSignUpData } from '@redux/form/SignUpDataForm';
import { makeSignInDataForm } from '@redux/form/SignInDataForm';
import { showMessage } from '@redux/slices/message';
import { useRouter } from 'next/router';

function SignUpForm( {
	onSignUp : OnSignUp,
	toggleSignUp : ToggleSignUp,
	isLoading : IsLoading,
	isSuccessful : IsSuccessful,
	error : Error,
	nameError : NameError,
	emailError : EmailError,
	passwordError : PasswordError,
	signUpLoading : SignUpLoading,
	createUserSuccessful : CreateUserSuccessful,
	createUserError : CreateUserError,
	signInLoading : SignInLoading,
	signInSuccessful : SignInSuccessful,
	signInError : SignInError,
	showMessage : ShowMessage,
} ) {

	const router = useRouter();

	const onSubmit = async ( e ) => {
		e.preventDefault();
		SignUpLoading();
		const signUpPostData = SignUpDataForm( e );
		const { ok : signUpOk, data : signUpData, } = await createUser( signUpPostData );
		if ( signUpOk ) {
			CreateUserSuccessful();
			SignInLoading();
			const { email, password, } = getSignUpData( e );
			const SignInPostData = makeSignInDataForm( email, password );
			const { ok : signInOk, data : signInData, } = await signIn( SignInPostData );
			if ( signInOk ) {
				const { user_id, } = signInData;
				SignInSuccessful( user_id );
				router.push( `/mypy/${user_id}` );
				ShowMessage( { message : `Welcome!!`, } );
			} else {
				SignInError( 'Sign In Failed!!' );
				ShowMessage( { message : 'Sign In Failed!!', level : 'error', } );
				router.push( '/login' );
			}
		} else {
			CreateUserError( signUpData );
		}
	};

	return (
		<div className="signupForm">
			<div className='signupForm__main'>
				<form onSubmit={onSubmit} className="emailLogin">
					<span className="emailLogin__signup">Sign Up</span>
					<div className="notice">
						<span>
                            NOTE: Password lost and found is currently not supported 
                            since we don&apos;t have a domain for sending email. 
                            Sorry for the inconvenience
						</span>
					</div>
					<input required className="emailLogin__name" type="text" placeholder="name"></input>
					{ NameError && NameError.map( ( error, index ) => <><span key={index} className="errorMessage">{error}<br /></span></> )}
					<input required className="emailLogin__email" type="email" placeholder="email"></input>
					{ EmailError && EmailError.map( ( error, index ) => <><span key={index} className="errorMessage">{error}<br /></span></> )}
					<input required className="emailLogin__password" type="password" placeholder="password"></input>
					{ PasswordError && PasswordError.map( ( error, index ) => <><span key={index} className="errorMessage">{error}<br /></span></> )}
					<input required className="emailLogin__passwordConfirm" type="password" placeholder="passwordConfirm"></input>
					<button type='submit' className="submitButton">Sign Up</button>
					{ OnSignUp && <button className="cancelButton" onClick={ToggleSignUp}>Cancel</button>}
				</form>
			</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		onSignUp : state.auth.onSignUp,
		isLoading : state.createUser.loading,
		isSuccessful : state.createUser.isSuccessful,
		error : state.createUser.error,
		emailError : state.createUser.emailError,
		passwordError : state.createUser.passwordError,
		nameError : state.createUser.nameError,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		toggleSignUp : () => dispatch( toggleSignUp() ),
		signUpLoading : () => dispatch( signUpLoading() ),
		createUserSuccessful : () => dispatch( createUserSuccessful() ),
		createUserError : ( response ) => dispatch( createUserError( response ) ),
		signInLoading : () => dispatch( signInLoading() ),
		signInSuccessful : ( response ) => dispatch( signInSuccessful( response ) ),
		signInError : ( response ) => dispatch( signInError( response ) ),
		showMessage : ( data ) => dispatch( showMessage( data ) ),
	};
};


export default connect( mapStateToProps, mapDispatchToProps )( SignUpForm );

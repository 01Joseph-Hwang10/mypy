import React from 'react';
import { toggleSignUp } from '@slices/auth';
import { connect } from 'react-redux';
import { createUser, createUserError, createUserSuccessful, loading } from '@redux/slices/create-user';
import SignUpDataForm from '@redux/form/SignUpDataForm';

function SignUpForm( {
	onSignUp : OnSignUp,
	toggleSignUp : ToggleSignUp,
	isLoading : IsLoading,
	isSuccessful : IsSuccessful,
	error : Error,
	nameError : NameError,
	emailError : EmailError,
	passwordError : PasswordError,
	loading : Loading,
	createUserSuccessful : CreateUserSuccessful,
	createUserError : CreateUserError,
} ) {

	const onSubmit = async ( e ) => {
		e.preventDefault();
		Loading();
		const postData = SignUpDataForm( e );
		const { ok, data, } = await createUser( postData );
		if ( ok ) {
			// You need to axios again
			CreateUserSuccessful();
		} else {
			CreateUserError( data );
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
					{ NameError && <span className="errorMessage">{NameError}</span>}
					<input required className="emailLogin__email" type="email" placeholder="email"></input>
					{ EmailError && <span className="errorMessage">{EmailError}</span>}
					<input required className="emailLogin__password" type="password" placeholder="password"></input>
					{ PasswordError && <span className="errorMessage">{PasswordError}</span>}
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
		loading : () => dispatch( loading() ),
		createUserSuccessful : () => dispatch( createUserSuccessful() ),
		createUserError : ( response ) => dispatch( createUserError( response ) ),
	};
};


export default connect( mapStateToProps, mapDispatchToProps )( SignUpForm );

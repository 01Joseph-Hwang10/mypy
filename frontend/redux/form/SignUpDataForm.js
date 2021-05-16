

export const getSignUpData = ( e ) => {
	const form = e.target;
	const email = form.querySelector( '.emailLogin__email' ).value;
	const name = form.querySelector( '.emailLogin__name' ).value;
	const password = form.querySelector( '.emailLogin__password' ).value;
	const passwordConfirm = form.querySelector( '.emailLogin__passwordConfirm' ).value;

	return {
		email,
		name,
		password,
		passwordConfirm,
	};
};

const SignUpDataForm = ( e ) => {
	const formData = new FormData();
	const { email, name, password, passwordConfirm, } = getSignUpData( e );

	formData.append( 'email', email );
	formData.append( 'first_name', name );
	formData.append( 'password', password );
	formData.append( 'password_confirm', passwordConfirm );

	return formData;
};


export default SignUpDataForm;


export const googleSignUpDataForm = ( id_token ) => {
	const formData = new FormData();

	formData.append( 'id_token', id_token );

	return formData;
};

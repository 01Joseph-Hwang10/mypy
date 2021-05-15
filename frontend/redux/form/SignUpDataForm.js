

const SignUpDataForm = ( e ) => {
	const form = e.target;
	const formData = new FormData();
	const email = form.querySelector( '.emailLogin__email' ).value;
	const name = form.querySelector( '.emailLogin__name' ).value;
	const password = form.querySelector( '.emailLogin__password' ).value;
	const passwordConfirm = form.querySelector( '.emailLogin__passwordConfirm' ).value;

	formData.append( 'email', email );
	formData.append( 'name', name );
	formData.append( 'password', password );
	formData.append( 'passwordConfirm', passwordConfirm );

	return formData;
};


export default SignUpDataForm;

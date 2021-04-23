

const SignInDataForm = ( e ) => {
	const form = e.target;
	const formData = new FormData();
	const email = form.querySelector( '.emailLogin__email' ).value;
	const password = form.querySelector( '.emailLogin__password' ).value;

	formData.append( 'username', email );
	formData.append( 'password', password );

	return formData;
};


export default SignInDataForm;

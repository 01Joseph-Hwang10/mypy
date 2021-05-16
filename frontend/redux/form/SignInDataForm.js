

export const makeSignInDataForm = ( username, password ) => {
	const formData = new FormData();
	formData.append( 'username', username );
	formData.append( 'password', password );

	return formData;
};


const SignInDataForm = ( e ) => {
	const form = e.target;
	const email = form.querySelector( '.emailLogin__email' ).value;
	const password = form.querySelector( '.emailLogin__password' ).value;

	const formData = makeSignInDataForm( email, password );

	return formData;
};


export default SignInDataForm;

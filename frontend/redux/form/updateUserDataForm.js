

const updateUserDataForm = ( e ) => {
	const formData = new FormData();
	let object = {};
	const form = e.target.closest( '.mypySideBar__info' );
    
	const inputs = form.querySelectorAll( 'input' );
	const textarea = form.querySelectorAll( 'textarea' );

	const data = [ ...inputs, ...textarea, ];

	data.forEach( input => {
		formData.append( input.name, input.value );
		object[ input.name ] = input.value;
	} );

	return [ formData, object, ];
};

export default updateUserDataForm;
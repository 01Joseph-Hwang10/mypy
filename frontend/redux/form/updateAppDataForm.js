
const updateAppDataForm = ( e ) => {
	const form = e.target;
	const name = form.querySelector( '.name' ).value;
	const description = form.querySelector( '.description' ).value;
	const coverImg = form.querySelector( '.coverImg' ).files;

	const formData = new FormData();
	formData.append( 'name', name );
	formData.append( 'description', description );
	if ( coverImg?.[ 0 ] ) {
		formData.append( 'cover_img', coverImg[ 0 ] );
		formData.append( 'has_cover_img', true );
	} else {
		formData.append( 'has_cover_img', false );
	}

	return formData;
};


export default updateAppDataForm;


export const updateInputSpecDataForm = ( e ) => {
	const form = e.target.closest( '.formElement__root' );
	const nameInput = form
		.querySelector( '.name' )
		.querySelector( 'input' )
		.value;
	const descriptionInput = form
		.querySelector( '.description' )
		.querySelector( 'textarea' )
		.value;

	const formData = new FormData();
	formData.append( 'name', nameInput );
	formData.append( 'description', descriptionInput );

	const inputData = {
		'name' : nameInput,
		'description' : descriptionInput,
	};

	return [ formData, inputData, ];
};

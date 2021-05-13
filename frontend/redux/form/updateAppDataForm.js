
const updateAppDataForm = ( e ) => {
	const form = e.target;
	const name = form.querySelector( '.name' ).value;
	const description = form.querySelector( '.description' ).value;
	const coverImg = form.querySelector( '.coverImg' ).files;

	const formData = new FormData();
	formData.append( 'name', name );
	formData.append( 'description', description );
	if ( coverImg ) {
		formData.append( 'cover_img', coverImg[ 0 ] );
		formData.append( 'has_cover_img', true );
	} else {
		formData.append( 'has_cover_img', true );
	}

	return formData;
};


export default updateAppDataForm;

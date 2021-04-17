
const executeAppDataForm = (  app, id  ) => {
	const formData = new FormData();
	const forms = document.querySelectorAll( '.formElement' );
	let variables = {};
	for ( let i = 0; i < forms.length; i++ ) {
		const input = forms[ i ].querySelector( 'input' );
		const key = input.name;
		const value = input.value;
		variables[ key ] = value;
	}
	let files = false;
	const fileInput = document.querySelector( '.fileInput' ).files;
	if ( fileInput ) {
		files = fileInput[ 0 ];
	}

	formData.append( 'app', app );
	formData.append( 'variables', JSON.stringify( variables ) );
	formData.append( 'files', files );
	formData.append( 'id', id );

	return formData;
};


export default executeAppDataForm;

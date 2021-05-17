
const executeAppDataForm = (  app, id  ) => {
	const formData = new FormData();

	// Variables section
	let variables = {};

	const qAll = selector => {
		if ( document.querySelectorAll( selector ) ) {
			return document.querySelectorAll( selector );
		}
		return false;
	};

	const textInput = qAll( '.formElement__text' );
	const listInput = qAll( '.formElement__list' );
	const dictInput = qAll( '.formElement__dict' );
	const boolInput = qAll( '.formElement__bool' );
	const fileInput = qAll( '.formElement__file' );

	if ( textInput ) {
		textInput.forEach( element => {
			const input = element.querySelector( 'input' );
			const key = input.name;
			const value = input.value;
			variables[ key ] = value;
		} );
	}

	if ( listInput ) {

		listInput.forEach( element => {
			let value = [];
			const key = element
				.querySelector( '.subject' )
				.querySelector( 'input' ).value;
			const inputs = element.querySelectorAll( 'input' );
			inputs.forEach( input => {
				const listItem = input.value;
				if ( listItem ) {
					value.push( listItem );
				}
			} );
			variables[ key ] = value;
		} );
	}

	if ( dictInput ) {
		
		dictInput.forEach( element => {
			let value = {};
			const key = element
				.querySelector( '.subject' )
				.querySelector( 'input' ).value;
			const forms = element.querySelectorAll( '.dict__row' );
			forms.forEach( form => {
				const dictKey = form.querySelector( '.dict__key' ).value;
				const dictValue = form.querySelector( '.dict__value' ).value;
				if ( dictKey && dictValue ) {
					value[ dictKey ] = dictValue;
				}
			} );
			variables[ key ] = value;
		} );
	}

	if ( boolInput ) {

		boolInput.forEach( element => {
			const input = element.querySelector( 'input' );
			const key = input.name;
			const value = ( input.checked ? true : false );
			variables[ key ] = value;
		} );
	}

	let files = false;
	if ( fileInput ) {
		files = true;
		fileInput.forEach( element => {
			const input = element.querySelector( 'input' );
			const key = input.name;
			const file = input.files[ 0 ];
			formData.append( key, file );
		} );
	}

	
	formData.append( 'app', app );
	formData.append( 'variables', JSON.stringify( variables ) );
	formData.append( 'id', id );
	
	if ( files ) {
		formData.append( 'has_file_input', true );
	} else {
		formData.append( 'has_file_input', false );
	}

	return formData;
};


export default executeAppDataForm;

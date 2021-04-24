
const createAppDataForm = ( e ) => {
	const form = e.target;
	const formData = new FormData();
	const appName = form.querySelector( '#name' ).value;
	const description = form.querySelector( '#description' ).value || '';
	const app = form.querySelector( '#app' ).files[ 0 ];
	formData.append( 'name', appName );
	formData.append( 'description', description );
	formData.append( 'app', app );
	return formData;
};


export default createAppDataForm;

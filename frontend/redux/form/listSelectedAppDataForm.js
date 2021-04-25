

const listSelectedAppDataForm = ( userId = null, appIdList ) => {
	const formData = new FormData();
	formData.append( 'user_id', userId );
	formData.append( 'app_ids', JSON.stringify( appIdList ) );

	return formData;
};



export default listSelectedAppDataForm;

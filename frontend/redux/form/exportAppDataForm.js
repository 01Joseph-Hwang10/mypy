

const ExportAppDataForm = ( id, isAdding, userId ) =>  {
	const formData = new FormData();
	formData.append( 'id', id );
	formData.append( 'isAdding', isAdding );
	formData.append( 'user_id', userId );

	return formData;
};


export default ExportAppDataForm;

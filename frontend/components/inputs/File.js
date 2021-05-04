import React from 'react';

function File() {
	return (
		<div className="formElement__file">
			<span className="fileInputName">Files</span>
			<div className="fileInputWrapper">
				<input name="files" type="file"></input>
			</div>
		</div>
	);
}

export default File;

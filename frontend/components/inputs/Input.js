import { 
	DICTIONARY_COMPONENT, 
	LIST_COMPONENT, 
	BOOLEAN_COMPONENT, 
	TEXT_COMPONENT
} from '@src/constants';
import { InputDecider } from 'functions/InputDecider';
import React, { useState } from 'react';
import Text from '@components/inputs/Text';
import List from '@components/inputs/List';
import Dictionary from '@components/inputs/Dictionary';
import Boolean from '@components/inputs/Boolean';
import File from './File';
import { connect } from 'react-redux';
import { updateInputSpecDataForm } from '@redux/form/updateAppDataForm';
import { showMessage } from '@redux/slices/message';
import { updateInputSpec as axiosUpdateInputSpec } from '@slices/update-app';

function Input( {
	input : {
		name : Name,
		description : Description, 
		variable_name : VariableName,
		type : Type,
		id : Id,
	},
	createdBy : {
		id : CreatedUserId,
	},
	userId : UserId,
} ) {

	const [ isEditing, setIsEditing, ] = useState( false );
	const [ name, setName, ] = useState( Name );
	const [ description, setDescription, ] = useState( Description );
	const [ loading, setLoading, ] = useState( false );

	const input = {
		name,
		description,
		variable_name : VariableName,
		type : Type,
	};

	const updateInputSpec = async ( e ) => {
		setLoading( true );
		const [ formData, inputData, ] = updateInputSpecDataForm( e );
		formData.append( 'id', Id );
		const { ok, data, } = await axiosUpdateInputSpec( formData );
		if ( ok ) {
			setIsEditing( false );
			const {
				name : newName,
				description : newDescription,
			} = inputData;
			setName( newName );
			setDescription( newDescription );
		} else {
			showMessage( { message : "Update failed. Please try it later", level : 'error', } );
		}
		setLoading( false );
	};

	const toggleUpdate = ( e ) => {
		setIsEditing( true );
		const form = e.target.closest( '.formElement__root' );
		const button = form.querySelector( 'button' );
		const stopEditing = ( event ) => {
			if ( !form.contains( event.target ) && event.target !== button ) {
				setIsEditing( false );
				document.removeEventListener( 'click', stopEditing );
			}
		};
		document.addEventListener( 'click', stopEditing );
	};

	const componentType = InputDecider( Type );

	if ( componentType === LIST_COMPONENT ) {
		return <List 
			input={input} 
			updateInputSpec={updateInputSpec} 
			allowedToModify={UserId == CreatedUserId}
			isEditing={isEditing}
			toggleUpdate={toggleUpdate}
			loading={loading}
		/>;
	}
	if ( componentType === TEXT_COMPONENT ) {
		return <Text 
			input={input} 
			updateInputSpec={updateInputSpec} 
			allowedToModify={UserId == CreatedUserId}
			isEditing={isEditing}
			toggleUpdate={toggleUpdate}
			loading={loading}
		/>;
	}
	if ( componentType === DICTIONARY_COMPONENT ) {
		return <Dictionary 
			input={input} 
			updateInputSpec={updateInputSpec} 
			allowedToModify={UserId == CreatedUserId}
			isEditing={isEditing}
			toggleUpdate={toggleUpdate}
			loading={loading}
		/>;
	}
	if ( componentType === BOOLEAN_COMPONENT ) {
		return <Boolean 
			input={input} 
			updateInputSpec={updateInputSpec} 
			allowedToModify={UserId == CreatedUserId}
			isEditing={isEditing}
			toggleUpdate={toggleUpdate}
			loading={loading}
		/>;
	}
	return <File 
		input={input} 
		updateInputSpec={updateInputSpec} 
		allowedToModify={UserId == CreatedUserId}
		isEditing={isEditing}
		toggleUpdate={toggleUpdate}
		loading={loading}
	/>;
}
	
	
const mapStateToProps = state => {
	return {
		appSpec : state.retrieveApp.appSpec,
		createdBy : state.retrieveApp.createdBy,
		userId : state.auth.userId,
	};
};

const mapDispatchToProps = null;


export default connect( mapStateToProps, mapDispatchToProps )( Input );

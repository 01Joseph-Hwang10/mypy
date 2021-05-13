import { 
	DICTIONARY_COMPONENT, 
	LIST_COMPONENT, 
	BOOLEAN_COMPONENT, 
	TEXT_COMPONENT
} from '@src/constants';
import { InputDecider } from 'functions/InputDecider';
import React from 'react';
import Text from '@components/inputs/Text';
import List from '@components/inputs/List';
import Dictionary from '@components/inputs/Dictionary';
import Boolean from '@components/inputs/Boolean';
import File from './File';
import { connect } from 'react-redux';

function Input( {
	input,
	createdBy : {
		id : CreatedUserId,
	},
	userId : UserId,
} ) {

	const updateInputSpec = async ( e ) => {};

	const componentType = InputDecider( input.type );

	if ( componentType === LIST_COMPONENT ) {
		return <List 
			input={input} 
			updateInputSpec={updateInputSpec} 
			allowedToModify={UserId == CreatedUserId}
		/>;
	}
	if ( componentType === TEXT_COMPONENT ) {
		return <Text 
			input={input} 
			updateInputSpec={updateInputSpec} 
			allowedToModify={UserId == CreatedUserId}
		/>;
	}
	if ( componentType === DICTIONARY_COMPONENT ) {
		return <Dictionary 
			input={input} 
			updateInputSpec={updateInputSpec} 
			allowedToModify={UserId == CreatedUserId}
		/>;
	}
	if ( componentType === BOOLEAN_COMPONENT ) {
		return <Boolean 
			input={input} 
			updateInputSpec={updateInputSpec} 
			allowedToModify={UserId == CreatedUserId}
		/>;
	}
	return <File 
		input={input} 
		updateInputSpec={updateInputSpec} 
		allowedToModify={UserId == CreatedUserId}
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

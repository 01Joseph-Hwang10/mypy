import { 
	DICTIONARY_COMPONENT, 
	LIST_COMPONENT, 
	BOOLEAN_COMPONENT 
} from '@src/constants';
import { InputDecider } from 'functions/InputDecider';
import React from 'react';
import Text from '@components/inputs/Text';
import List from '@components/inputs/List';
import Dictionary from '@components/inputs/Dictionary';
import Boolean from '@components/inputs/Boolean';

function Input( {
	input,
} ) {

	const componentType = InputDecider( input.type );

	if ( componentType === LIST_COMPONENT ) {
		return <List input={input} />;
	}
	if ( componentType === DICTIONARY_COMPONENT ) {
		return <Dictionary input={input} />;
	}
	if ( componentType === BOOLEAN_COMPONENT ) {
		return <Boolean input={input} />;
	}
	return <Text input={input} />;
}


export default Input;

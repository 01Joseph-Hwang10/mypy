import { 
	BOOL, 
	BOOLEAN_COMPONENT, 
	DICT, 
	DICTIONARY_COMPONENT, 
	FROZENSET, 
	LIST, 
	LIST_COMPONENT, 
	SET, 
	TEXT_COMPONENT, 
	TUPLE 
} from "@src/constants";


export const InputDecider = ( type ) => {

	if ( [ LIST, TUPLE, SET, FROZENSET, ].includes( type ) ) {
		return LIST_COMPONENT;
	}
	if ( type === DICT ) {
		return DICTIONARY_COMPONENT;
	} 
	if ( type === BOOL ) {
		return BOOLEAN_COMPONENT;
	}
	return TEXT_COMPONENT;
};


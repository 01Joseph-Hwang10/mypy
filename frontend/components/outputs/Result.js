import { JSON } from '@src/constants';
import React from 'react';

function ResultWrapper( {
	outputType,
	result,
} ) {

	if ( !outputType || !result ) return <></>;
	if ( outputType == JSON ) return result.toString();
	return result;
}

export default ResultWrapper;

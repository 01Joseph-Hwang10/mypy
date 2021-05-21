import { JSON, MD } from '@src/constants';
import React from 'react';
import ReactMarkdown from 'react-markdown';

function ResultWrapper( {
	outputType,
	result,
} ) {

	if ( !outputType || !result ) return <></>;
	if ( outputType == JSON ) return result.toString();
	if ( outputType == MD ) return <ReactMarkdown>{result}</ReactMarkdown>;
	return result;
}

export default ResultWrapper;

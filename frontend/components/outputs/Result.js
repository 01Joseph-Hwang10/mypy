import { JPG, JSON, MD, PNG } from '@src/constants';
import React from 'react';
import ReactMarkdown from 'react-markdown';

function ResultWrapper( {
	outputType,
	result,
} ) {

	if ( !outputType || !result ) return <></>;
	if ( outputType === JSON ) return <div className='result__json'>{result.toString()}</div>;
	if ( outputType === MD ) return ( <div className="result__md defaultStyle"><ReactMarkdown>{result}</ReactMarkdown></div> );
	if ( outputType === PNG || outputType === JPG ) return <img className="result__img" src={`data:image/*;base64,${result}`}></img>;
	return <div className="result__other">{result}</div>;
}

export default ResultWrapper;

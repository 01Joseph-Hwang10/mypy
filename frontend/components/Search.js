import React from 'react';

function Search( {
	placeholder,
} ) {
	return (
		<div className='searchBar'>
			<form>
				<input placeholder={placeholder}></input>
				<button className="bi bi-search"></button>
			</form>
		</div>
	);
}


export default Search;

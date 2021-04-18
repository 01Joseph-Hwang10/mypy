import React from 'react';

export default function Row() {
	return (
		<div className="row">
			<span>Key, value</span>
			<input className="row__key" placeholder="key"></input>
			<input className="row__value" placeholder="value"></input>
		</div>
	);
}

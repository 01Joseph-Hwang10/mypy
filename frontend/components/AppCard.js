import Link from 'next/link';
import React from 'react';

function AppCard( {
	id,
	name,
	description,
	created_by : createdBy,
	exports,
} ) {
	return (
		<Link as={`/app/${id}`} href='/app/[id]' passHref>
			<button className="appCard">
				<div className="appCard__name">
					<span>{name}</span>
				</div>
				<div className="appCard__description">
					<p className="truncate-overflow">{description}</p>
				</div>
				<div className="appCard__extraInfo">
					<span>{exports} Exports</span>
				</div>
			</button>
		</Link>
	);
}


export default AppCard;


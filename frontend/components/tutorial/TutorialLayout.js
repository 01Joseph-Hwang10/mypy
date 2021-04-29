import SideNav from '@components/tutorial/SideNav';
import React from 'react';

function TutorialLayout( {
	children,
} ) {

	return (
		<div className='tutorialContentRoot'>
			<section className='tutorialSideBarWrapper'>
				<SideNav />
			</section>
			<section className="tutorialContent">
				{children}
			</section>
		</div>
	);
}


export default TutorialLayout;
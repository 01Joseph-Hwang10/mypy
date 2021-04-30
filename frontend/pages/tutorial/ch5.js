import TutorialLayout from '@components/tutorial/TutorialLayout';
import React from 'react';
import Link from 'next/link';

function customizeAppPage() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial__customizeAppPage">
				<h1>Customize App Page</h1>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch4'>
						<span>
							File I/O <i className="bi bi-arrow-left-circle"></i>
						</span>
					</Link>
				</div>
			</div>
		</TutorialLayout>
	);
}

export default customizeAppPage;

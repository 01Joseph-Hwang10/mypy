import TutorialLayout from '@components/tutorial/TutorialLayout';
import React from 'react';
import Link from 'next/link';

function input() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial__input">
				<h1>Input</h1>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch2'>
						<span>
							Log and Output <i className="bi bi-arrow-left-circle"></i>
						</span>
					</Link>
					<Link href='/tutorial/ch4'>
						<span>
							File I/O <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
				</div>
			</div>
		</TutorialLayout>
	);
}

export default input;

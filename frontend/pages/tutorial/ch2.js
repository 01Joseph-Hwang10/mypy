import TutorialLayout from '@components/tutorial/TutorialLayout';
import React from 'react';
import Link from 'next/link';

function logAndOutput() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial__logAndOutput">
				<h1>Log And Output</h1>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch1'>
						<span>
							Deploying on mypy <i className="bi bi-arrow-left-circle"></i>
						</span>
					</Link>
					<Link href='/tutorial/ch3'>
						<span>
							Input <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
				</div>
			</div>
		</TutorialLayout>
	);
}

export default logAndOutput;

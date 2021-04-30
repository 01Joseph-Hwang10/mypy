import TutorialLayout from '@components/tutorial/TutorialLayout';
import React from 'react';
import Link from 'next/link';

function FileIO() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial__fileIO">
				<h1>File I/O</h1>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch3'>
						<span>
							Input <i className="bi bi-arrow-left-circle"></i>
						</span>
					</Link>
					<Link href='/tutorial/ch5'>
						<span>
							Customize app page <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
				</div>
			</div>
		</TutorialLayout>
	);
}

export default FileIO;

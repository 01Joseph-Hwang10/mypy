import TutorialLayout from '@components/tutorial/TutorialLayout';
import Link from 'next/link';
import React from 'react';

function Tutorial() {

	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial__welcome">
				<h1>Welcome to the tutorial of making MYPY App!!!</h1>
				<p>
				In this tutorial, 
				you&apos;ll learn everything you need to know about
				making your own MYPY app!!
				</p>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch0'>
						<span>
							About Mypy <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
					<Link href='/tutorial/ch1'>
						<span>
							Quick Start <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
					<Link href='/tutorial/ch2'>
						<span>
							Deploying on mypy <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
					<Link href='/tutorial/ch3'>
						<span>
							Input <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
					<Link href='/tutorial/ch4'>
						<span>
							Error and Output <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
					<Link href='/tutorial/ch5'>
						<span>
							Customize app page <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
					<Link href='/tutorial/ch7'>
						<span>
							Using Modules <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
				</div>
			</div>
		</TutorialLayout>
	);
}


export default Tutorial;
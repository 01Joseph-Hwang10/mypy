import TutorialLayout from '@components/tutorial/TutorialLayout';
import React from 'react';
import Link from 'next/link';

function ch0() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial__about">
				<h1>About Mypy</h1>
				<h2>MYPY: The fastest way to serve a python application!</h2>
				<p>
                    MYPY is python specific cloud platform 
                    which serves application and API written with python.
					<br/> <br />
                    Currently, MYPY is focused on serving simple IPO application and api.
                    IPO refers apps recieves input, processes input, and returns output.
					<br/> <br />
                    For example, one can make stock price crawler and deploy it to mypy, 
                    making it accessible at anywhere, with any device assuming that 
                    one has an internet. 
					<br/> <br />
                    Also for example, you can use that as an API for your financial website,
                    assuming that you&apos;re operating financial website.
					<br/> <br />
                    Since it is in prototype stage, 
                    there would exist some inconvenience and unstableness.
                    Feel free to make a complain or proposal, or any type of feedback :)
				</p>
				<div className="feedbackButtonWrapper">
					<Link href='/feedback'>
						<button>Send Feedback</button>
					</Link>
				</div>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch1'>
						<span>
							Quick Start <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
				</div>
			</div>
		</TutorialLayout>
	);
}

export default ch0;

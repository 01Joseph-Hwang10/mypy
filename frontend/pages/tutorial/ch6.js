import React from 'react';
import Link from 'next/link';
import TutorialLayout from '@components/tutorial/TutorialLayout';

function usingAsAPI() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial__usingAsAPI">
				<h1>Using As API</h1>
				<h2>We&apos;ll learn about how to use your app deployed to mypy as an API</h2>
				<p>
                    At your app page, you&apos;ll be able to find the url of api endpoint of your app.
                    You can fetch a http request to this endpoint to get a response of your app as an API.
					<br /> <br />
                    If the app recieves input, keep in mind that
					<strong>
                        every request data sent to the endpoint must have the &quot;Content-Type&quot; of 
                        &quot;multipart/form-data&quot;. 
					</strong>
                    Otherwize you&apos;ll not able to get the proper response from your API.
				</p>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch5'>
						<span>
							Customizing App Page <i className="bi bi-arrow-left-circle"></i>
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

export default usingAsAPI;

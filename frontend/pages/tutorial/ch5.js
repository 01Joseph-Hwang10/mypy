import TutorialLayout from '@components/tutorial/TutorialLayout';
import React from 'react';
import Link from 'next/link';

function customizeAppPage() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial__customizeAppPage">
				<h1>Customizing App Page</h1>
				<h2>We&apos;ll see how to customize the app page in this chapter</h2>
				<p>
					If the app was sucessfully deployed, then you can customize your app page.
					<br /> <br />
					If you are the author of the app, you will have the access to the button 
					&quot;Update&quot; and &quot;Delete&quot;. By clicking update, you can change 
					input description, app cover image, app description, etc.
				</p>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch4'>
						<span>
							Log and Output <i className="bi bi-arrow-left-circle"></i>
						</span>
					</Link>
					<Link href='/tutorial/ch6'>
						<span>
							Using As API <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
				</div>
			</div>
		</TutorialLayout>
	);
}

export default customizeAppPage;

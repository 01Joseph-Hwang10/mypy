import CodeBox from '@components/mixins/CodeBox';
import TutorialLayout from '@components/tutorial/TutorialLayout';
import React from 'react';
import Link from 'next/link';

function UsingModules() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial_usingModules">
				<h1>Using Modules</h1>
				<h2>We&apos;ll learn about how to install dependencies and to implement modules to your app</h2>
				<p>
                    To install dependencies, you should
                    (1) Create requirements.txt file
                    (2) at the root folder of your app.
					<br /> <br />
                    For example, let&apos;s say you want to make a web crawler with third party libraries: BeautifulSoup and requests.
                    In this case, the folder scheme will look like as shown below.
				</p>
				<h3>
				webcrawler <br />
				|- index.py <br />
                |- requirements.txt <br/>
                |- functions/ <br />
                |-- functions1.py <br />
                |-- functions2.py <br />
                ...
				</h3>
				<p>And the requirements.txt might look like as shown below</p>
				<CodeBox>
					<span className="comment"># requirements.txt</span> 
					<span className="breakLine"></span>
					<span>bs4==4.9.0</span>
					<span>requests==2.25.1</span>
					<span className="breakLine"></span>
				</CodeBox>
				<p>
                    Side note, one widely known way to generate requirements.py
                    can be done by using the command shown below.
				</p>
				<CodeBox>
					<span>&gt;&gt; pip freeze &gt; requirements.txt</span>
				</CodeBox>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch6'>
						<span>
							Using As API <i className="bi bi-arrow-left-circle"></i>
						</span>
					</Link>
				</div>
			</div>
		</TutorialLayout>
	);
}

export default UsingModules;

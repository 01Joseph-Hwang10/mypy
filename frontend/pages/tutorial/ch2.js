import TutorialLayout from '@components/tutorial/TutorialLayout';
import React from 'react';
import Link from 'next/link';
import CodeBox from '@components/mixins/CodeBox';

function logAndOutput() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial__logAndOutput">
				<h1>Log And Output</h1>
				<h2>
					We&apos;ll going to go through about logging and returning output in this chapter
				</h2>
				<h3>#1 Logging</h3>
				<p>
					If the app is executed, every message from &quot;print&quot; function will be logged and displayed at your app page.
					It would be easier to understand that you&apos;ll going to see every message at the log as if it is like a python console.
				</p>
				<CodeBox>
					<span>from some.where import some_func</span>
					<span className="breakLine"></span>
					<span>def main():</span>
					<span className="breakLine"></span>
					<span className="tabbed">result = some_func()</span>
					<span className="tabbed">
						print(&quot;Result successfully calculated!!&quot;) <strong>&lt;= This will be logged</strong>
					</span>
					<span className="breakLine"></span>
					<span className="tabbed">return result</span>
					<span className="breakLine"></span>
				</CodeBox>
				<h3>#2 Output</h3>
				<p>
					Currently, only JSON stringifiable data is supported as output.
				</p>
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

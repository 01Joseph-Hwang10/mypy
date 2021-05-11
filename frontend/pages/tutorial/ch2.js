import CodeBox from '@components/mixins/CodeBox';
import TutorialLayout from '@components/tutorial/TutorialLayout';
import React from 'react';
import Link from 'next/link';

function deployingOnMypy() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial__deployingOnMypy">
				<h1>Deploying On Mypy</h1>
				<h2>
				This chapter deals about 
				how to deploy your python app onto mypy
				</h2>
				<p>
					Before start, be aware that mypy is currently not for serving server like flask, django, etc.
					Mypy currently is focused at serving python written IPO apps.(IPO stands for Input-Process-Output)
					The fundamental purpose of mypy is to help users focus on their app&apos;s functionality by 
					automatically generate input UI and to simplify the deployment process which can be used at personal app using,
					prototyping, etc. So in sum, mypy is a platform for uploading python written IPO apps which recieve input by python console, 
					automatically generating UI and simplifing the deployment process.
				</p>
				<h3>#1. Set Up The Entry Point</h3>
				<p>
					First you need to set up the entry point for index. What all you need is,
					(1) A function named &quot;main&quot;, 
					(2) which recieves no argument, 
					(3) in the &quot;index.py&quot; 
					(4) which is at root folder,
					since mypy uses it as the entry point of the function
					and actually executes the &quot;main&quot; funciton.
					<br /> <br />
					And execute the functions you want to at the &quot;main&quot; function, and return the result value of it
				</p>
				<CodeBox>
					<span className="comment"># index.py</span>
					<span className="breakLine"></span>
					<span>from somewhere import some_function_you_want_to_execute</span>
					<span className="breakLine"></span>
					<span>def main():</span>
					<span className="breakLine"></span>
					<span className='tabbed'>result = some_function_you_want_to_execute()</span>
					<span className="breakLine"></span>
					<span className="tabbed">return result</span>
					<span className="breakLine"></span>
				</CodeBox>
				<h3>#2. Zip The Root Folder Of Your App</h3>
				<p>
					If you&apos;ve done building app, zip the root folder of your app recursively
					so that you can upload the zipped file to mypy. For example, if the file scheme looks like below,
				</p>
				<h4>
					my_app/ <br />
					|- index.py <br />
					|- module1.py <br />
					|- module2.py <br />
					|- ... <br />
				</h4>
				<p>
					you need to zip &quot;my_app&quot; folder to upload on mypy.
				</p>
				<h3>#3. Upload The Zipfile To Mypy</h3>
				<p>
					If the zipfile is generated, then you&apos;re all done! 
					In mypy, just click &quot;Create New&quot; button at home or your app page and upload that zipfile
					to make your own mypy app!
				</p>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch1'>
						<span>
							Quick Start <i className="bi bi-arrow-left-circle"></i>
						</span>
					</Link>
					<Link href='/tutorial/ch3'>
						<span>
							Log and Output <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
				</div>
			</div>
		</TutorialLayout>
	);
}

export default deployingOnMypy;

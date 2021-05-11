import TutorialLayout from '@components/tutorial/TutorialLayout';
import React from 'react';
import Link from 'next/link';
import CodeBox from '@components/mixins/CodeBox';

function quickStart() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial__quickStart">
				<h1>Quick Start</h1>
				<h2>
				We&apos;ll learn how to deploy mypy app
				by making simple calculator in this tutorial
				</h2>
				<p>
					The calculator we&apos;ll build recieves 1 numbers,
					and do one of basic calculations with them:
					addition, subtraction, multiplication, and division.
					<br /> <br />
					First, we&apos;ll make the &quot;main&quot; function in 
					&quot;index.py&quot; at the root folder of your app to make sure 
					that our server can read the entry point of your app
				</p>
				<CodeBox>
					<span className="comment">
						# index.py 
						<strong> &lt;= This name is mandatory!</strong>
					</span>
					<span className='breakLine'></span>
					<span>
						def main():
						<strong> &lt;= This name is mandatory too!</strong>
					</span>
					<span className="comment tabbed"># we&apos;ll execute our codes here</span>
					<span className="breakLine"></span>
				</CodeBox>
				<p>
					Then, we&apos;ll recieve three inputs. 
					Two of them is integers which will be calculated, 
					and the other one is the type of calculation we&apos;ll operate.
					You can define the user input by assigning a type of it, 
					before the &quot;main&quot; function is defined.
				</p>
				<CodeBox>
					<span className="comment"># index.py</span>
					<span className="breakLine"></span>
					<span>
						num1 = float()
					</span>
					<span>
						num2 = float()
					</span>
					<span>
						operation = str()
					</span>
					<span className="breakLine"></span>
					<span>def main():</span>
					<span className="breakLine"></span>
					<span className="comment tabbed"># we&apos;ll execute our codes here</span>
					<span className="breakLine"></span>
				</CodeBox>
				<p>
					Mypy reads the input functions, and the types of them, 
					and renders input UI to your app page 
					as it is like the actual app. 
					<br /> <br/>
					For the case of the example above, mypy will convert &quot;num0&quot;
					and will render it as the float input UI supported by us.
					<br /> <br/>
					Note that if there is no type coversion at input function,
					the data type of the input will be saved as &quot;string&quot;, 
					and will be rendered as the string input UI.
				</p>
				<p>
					Now, let&apos;s do the calculations part. 
					We&apos;ll make another python file called &quot;calculation.py&quot;
					and will make a function named &quot;calculate&quot;. 
					This function will simply recieve inputs we recieved at &quot;index.py&quot;
					and will do the operation according to client&apos;s input.
				</p>
				<CodeBox>
					<span className="comment"># calculation.py</span>
					<span className='breakLine'></span>
					<span>def calculate(a,b,operation_type):</span>
					<span className='breakLine'></span>
					<span className="tabbed">if operation_type == &quot;add&quot;:</span>
					<span className="doubleTabbed">return a+b</span>
					<span className="tabbed">if operation_type == &quot;subtract&quot;:</span>
					<span className="doubleTabbed">return a-b</span>
					<span className="tabbed">if operation_type == &quot;multiply&quot;:</span>
					<span className="doubleTabbed">return a+b</span>
					<span className="tabbed">if operation_type == &quot;divide&quot;:</span>
					<span className="doubleTabbed">return a+b</span>
					<span className="tabbed">return &quot;Unsupported operation type!&quot;</span>
					<span className='breakLine'></span>
				</CodeBox>
				<p>
					We&apos;ll now import the function we&apos;ve created above to &quot;index.py&quot;
					and will use it for the output value. Side note, &quot;calculation.py&quot; is made at 
					root folder of this app.
				</p>
				<CodeBox>
					<span className="comment"># index.py</span>
					<span className="breakLine"></span>
					<span>from calculation import calculate</span>
					<span className="breakLine"></span>
					<span>
						num1 = float()
					</span>
					<span>
						num2 = float()
					</span>
					<span>
						operation = str()
					</span>
					<span className="breakLine"></span>
					<span>def main():</span>
					<span className="breakLine"></span>
					<span className="tabbed">result = calculate(num1, num2, operation)</span>
					<span className="breakLine"></span>
					<span className="tabbed">return result</span>
					<span className="breakLine"></span>
				</CodeBox>
				<p>
				If you finished building app, 
				zip your root folder and simply upload the file to mypy as a mypy app.
					<br /> <br />
				In the case of this example, if we say the name of the root folder to be &quot;calculator&quot;,
				the folder scheme would be seem like below.
				</p>
				<h3>
				calculator <br />
				|- index.py <br />
				|- calculator.py <br />
				</h3>
				<p>
				So what we need to do is just to <strong>zip the &quot;calculator&quot; and upload it to mypy.</strong>
				Then mypy will automatically make the app for you with your code!
                Click &quot;Create New&quot; button at home page or mypy page to create your own new app!
					{/* Insert the result preview */}
				</p>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch0'>
						<span>
							About mypy <i className="bi bi-arrow-left-circle"></i>
						</span>
					</Link>
					<Link href='/tutorial/ch2'>
						<span>
							Deploying on mypy <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
				</div>
			</div>
		</TutorialLayout>
	);
}

export default quickStart;

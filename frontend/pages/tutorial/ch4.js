import TutorialLayout from '@components/tutorial/TutorialLayout';
import React from 'react';
import Link from 'next/link';
import CodeBox from '@components/mixins/CodeBox';

function logAndOutput() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial__logAndOutput">
				<h1>Error And Output</h1>
				<h2>
					We&apos;ll going to go through about error and returning output in this chapter
				</h2>
				{/* <h3>#1 Logging</h3>
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
				</CodeBox> */}
				<h3>#1 Error</h3>
				<p>
					If an error occured at the application, the error message will be printed out at result section of app page.
					Since mypy is in prototype stage, we apologize that we don&quot;t really have great tool for logging and error handling.
				</p>
				<h3>#2 Output</h3>
				<p>
					It is recommended to return the output value of your app. 
					If the app has no return value, the message of whether process was successfully done will be displayed 
					at result section.
				</p>
				<CodeBox>
					<span>from some.where import some_func</span>
					<span className="breakLine"></span>
					<span>def main():</span>
					<span className="breakLine"></span>
					<span className="tabbed">result = some_func()</span>
					<span className="tabbed">
						print(&quot;Result successfully calculated!!&quot;)
					</span>
					<span className="breakLine"></span>
					<span className="tabbed">
						return result<strong>&lt;= Return value recommended</strong>
					</span>
					<span className="breakLine"></span>
				</CodeBox>
				<h2>
					Mypy currently supports 4 output type: .json, markdown, images, and .txt. 
					If the output is not match with one of that for extensions except .txt,
					your output will eventually be returned with the type of plain text: .txt.
					Side note, those extensions don&apos;t mean file extensions, but mimetypes. 
				</h2>
				<h3>#2.1 JSON output</h3>
				<p>
					JSON output would be useful when you are going to use the application
					with the major purpose of API. Your return value at &quot;main&quot; function
					at &quot;index.py&quot; can be, in this case, any python built in data type that 
					can be converted to JSON. Here below is the example code of returning python dictionary
					with given data which would be converted as JSON later.
				</p>
				<CodeBox>
					<span className="comment"># index.py</span>
					<span className="breakLine"></span>
					<span>name = str()</span>
					<span>description = str()</span>
					<span>image_url = str()</span>
					<span className="breakLine"></span>
					<span>def main():</span>
					<span className="breakLine"></span>
					<span className="tabbed">specification = {'{'}</span>
					<span className="doubleTabbed">&quot;name&quot;: name,</span>
					<span className="doubleTabbed">&quot;description&quot;: description,</span>
					<span className="doubleTabbed">&quot;image_url&quot;: image_url,</span>
					<span className="tabbed">{'}'}</span>
					<span className="breakLine"></span>
					<span className="tabbed">
							return specification
					</span>
					<span className="breakLine"></span>
				</CodeBox>
				{/* <h3>#2.2 CSV output</h3>
				<p>
					CSV output has its own UI support by mypy
					and will be displayed as spreadsheet.
					In this case, your return value at &quot;main&quot; function 
					at &quot;index.py&quot; should be string of csv. 
					Side note, it is important to notice that the return value of the function
					would be &quot;string&quot;, not a csv file.
				</p>
				<CodeBox>
					<span className="comment"># index.py</span>
					<span className="breakLine"></span>
					<span>name = str()</span>
					<span>description = str()</span>
					<span>image_url = str()</span>
					<span className="breakLine"></span>
					<span>def main():</span>
					<span className="breakLine"></span>
					<span className='tabbed'>csv_source = &quot;&quot;&quot;</span>
					<span className="tabbed"></span>
					<span className="breakLine"></span>
					<span className="tabbed">
							return specification
					</span>
					<span className="breakLine"></span>
				</CodeBox> */}
				<h3>#2.2 Markdown output</h3>
				<p>
					If your app returns markdown as its value, it will be displayed at result section
					with its format preserved. In this case, &quot;main&quot; function
					at &quot;index.py&quot; should return string of markdown. Example is appended below.
				</p>
				<CodeBox>
					<span className="comment"># index.py</span>
					<span className="breakLine"></span>
					<span>def main():</span>
					<span className="breakLine"></span>
					<span className='tabbed'>markdown = &quot;&quot;&quot;</span>
					<span className="tabbed"># This is sample markdown example!!\n</span>
					<span className="tabbed">lorem ipsum dolor met ... \n</span>
					<span className="tabbed">&quot;&quot;&quot;</span>
					<span className="breakLine"></span>
					<span className="tabbed">
							return markdown
					</span>
					<span className="breakLine"></span>
				</CodeBox>
				<h3>#2.3 Image output</h3>
				<p>
					Currently there are two available image extensions that can be returned by your app: .jpg, .jpeg and .png.
					The return value of &quot;main&quot; function at &quot;index.py&quot; should be binary object.
				</p>
				<h3>#2.4 TXT output</h3>
				<p>
					Text output only returns result text at the app result. 
					It is quite clean way to display the result since it does not have
					any UI support or logging support. Just text at the result section at your app page.
					<br /> <br />
					At &quot;main&quot; function at &quot;index.py&quot;, string type value is recommended 
					since otherwise the thing will not go on as you expected.
				</p>
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

export default logAndOutput;

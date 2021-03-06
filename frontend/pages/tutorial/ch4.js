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
				</p> */}
				<h3>#1 Error</h3>
				<p>
					If an error occured at the application, the error message will be printed out at result section of app page.
					Also if that is the case, every output from &quot;print&quot; function will be logged and be displayed at your result section of your app.
				</p>
				<CodeBox>
					<span>from some.where import some_func</span>
					<span className="breakLine"></span>
					<span>some_input=str()</span>
					<span className="breakLine"></span>
					<span>def main():</span>
					<span className="breakLine"></span>
					<span className='tabbed'>if len(some_input) &gt; 100:</span>
					<span className="doubleTabbed">
						print(&quot;Too long input!!&quot;)
						<strong>&lt;= This will be logged</strong>
					</span>
					<span className="doubleTabbed">
						raise ValueError(&quot;A length of the input should not be greater than 100&quot;)
						<strong>&lt;= This will be logged too!</strong>
					</span>
					<span className="breakLine"></span>
					<span className="tabbed">result = some_func()</span>
					<span className="tabbed">return result</span>
					<span className="breakLine"></span>
				</CodeBox>
				<p>
					It is recommended to predict the error which might occur because of unwanted user input, and handle the error manually.
					Also it is recommended to test your code before deploying it to mypy since the deployment might take some time.
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
				<p>
					Mypy currently supports 3 output type: .json, markdown, and .txt. 
					If the output is not match with one of that for extensions except .txt,
					your output will eventually be returned with the type of plain text: .txt.
					Side note, those extensions don&apos;t mean file extensions, but mimetypes. 
				</p>
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
					<span className="tabbed"># This is sample markdown example!!\n\n</span>
					<span className="tabbed">lorem ipsum dolor met ... \n</span>
					<span className="tabbed">&quot;&quot;&quot;</span>
					<span className="breakLine"></span>
					<span className="tabbed">
							return markdown
					</span>
					<span className="breakLine"></span>
				</CodeBox>
				{/* <h3>#2.3 Image output</h3>
				<p>
					Currently there are two available image extensions that can be returned by your app: .jpg, .jpeg and .png.
					The return value of &quot;main&quot; function at &quot;index.py&quot; should be 
					either &quot;Image&quot; object from &quot;Pillow&quot; which is python imaging library or binary object(Python data type of &quot;bytes&quot;).
					Here below is short example of making image with crossline on black background which is the example of pillow documentation.
				</p>
				<CodeBox>
					<span className="comment"># index.py</span>
					<span className="breakLine"></span>
					<span>from PIL import Image, ImageDraw</span>
					<span className="breakLine"></span>
					<span>def main():</span>
					<span className="breakLine"></span>
					<span className='tabbed'>im = Image.new(&quot;L&quot;, size=(100, 100))</span>
					<span className="tabbed">draw = ImageDraw.Draw(im)</span>
					<span className="tabbed">draw.line((0, 0) + im.size, fill=128)</span>
					<span className="tabbed">draw.line((0, im.size[1], im.size[0], 0), fill=128)</span>
					<span className="breakLine"></span>
					<span className="tabbed">
							return im
					</span>
					<span className="breakLine"></span>
				</CodeBox>
				<p>
					Or you can return binary object like the code example below.
				</p>
				<CodeBox>
					<span className="comment"># index.py</span>
					<span className="breakLine"></span>
					<span>from PIL import Image, ImageDraw</span>
					<span>import io</span>
					<span className="breakLine"></span>
					<span>def main():</span>
					<span className="breakLine"></span>
					<span className='tabbed'>im = Image.new(&quot;L&quot;, size=(100, 100))</span>
					<span className="tabbed">draw = ImageDraw.Draw(im)</span>
					<span className="tabbed">draw.line((0, 0) + im.size, fill=128)</span>
					<span className="tabbed">draw.line((0, im.size[1], im.size[0], 0), fill=128)</span>
					<span className="breakLine"></span>
					<span className="tabbed">fp = io.BytesIO()</span>
					<span className="tabbed">im.save(fp, format=&quot;PNG&quot;)</span>
					<span className="tabbed">result = fp.getvalue()</span>
					<span className="tabbed">
							return result
					</span>
					<span className="breakLine"></span>
				</CodeBox> */}
				<h3>#2.3 TXT output</h3>
				<p>
					Text output returns result text at the app result. 
					It is quite clean way to display the result. 
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

import TutorialLayout from '@components/tutorial/TutorialLayout';
import React from 'react';
import Link from 'next/link';
import CodeBox from '@components/mixins/CodeBox';

function input() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial__input">
				<h1>Input</h1>
				<h2>We&apos;ll see the type of inputs and how to recieve inputs from user of api consumer</h2>
				<p>
					To recieve client input, there are several rules to follow 
					so that our code compiler can generate the input specification, 
					generate input user interface for your application,
					and deploy your app as an API.
				</p>
				<h3>#1. Python built in data types and what mypy supports</h3>
				<p>
					According to w3schools.com, there are total 14 built in data types in python:
					str, int, float, complex, list, tuple, range, dict, set, frozenset, bool, bytes, bytearray, memoryview.
					Among these, data types mypy supports are those of followings.
				</p>
				<h4>
					Text / Numeric Types: str, int, float, complex <br />
					Sequence / Set Types: list, tuple, set, frozenset <br />
					Mapping Type: dict <br />
					Boolean Type: bool <br />
				</h4>
				<h3>#2. How to recieve client input of python built in data types</h3>
				<p>
					To recieve client input, you should 
					<strong>
						(1) Assign the variable of type which your app wants to recieve,
						(2) At &quot;index.py&quot; which &quot;main&quot; function exists,
						(3) Before the &quot;main&quot; function is assigned.
					</strong>
					Here below is the example code of recieving integer and list input
				</p>
				<CodeBox>
					<span className="comment"># index.py</span>
					<span className="breakLine"></span>
					<span className="from somewhere import some_operation"></span>
					<span className='breakLine'></span>
					<span>iteration = int()</span>
					<span>target_list = list()</span>
					<span className='breakLine'></span>
					<span>def main():</span>
					<span className='breakLine'></span>
					<span className="tabbed">result = some_operation(target_list, iteration)</span>
					<span className="tabbed">return result</span>
					<span className="breakLine"></span>
				</CodeBox>
				<p>
					In this case, mypy will make two input specification, 
					&quot;iteration&quot; with type &quot;integer&quot; and
					&quot;target_list&quot; with type &quot;list&quot;.
					Then based on the specification, user interface of that specific
					input type will be generated at your mypy app page.
					<br /> <br />
					You can use real value during the development. In the example above, 
					one might set &quot;iteration&quot; as &quot;3&quot; 
					and &quot;target_list&quot; as &quot;[2, 4, 5, 9]&quot; for test purpose.
					Just make sure to change that variable 
					to the input type want to recieve from client when you&apos;re about to deploy your app.
					<br /> <br />
					Note that input assignment should be done ONLY at &quot;index.py&quot; and
					the variable should be used ONLY at &quot;index.py&quot;.
					It is not able to import that variable at the other python script file.
					That will simply not work if the app is deployed to mypy.
				</p>
				<h3>#3. How to recieve client input of file</h3>
				<p>
					To recieve file input, you should
					<strong>
						(1) Assign the variable of file extention 
						(2) one file extension as string or multiple file extension as string seperated with comma,
						(3) At &quot;index.py&quot; which &quot;main&quot; function exists,
						(4) Before the &quot;main&quot; function is assigned. 
					</strong>
					Here below is the example code of recieving a file with extensions of &quot;.csv, .txt&quot;
				</p>
				<CodeBox>
					<span className="comment"># index.py</span>
					<span className="breakLine"></span>
					<span>from somewhere import make_specification</span>
					<span className='breakLine'></span>
					<span>product_list=&quot;.csv, .txt&quot;</span>
					<span className="breakLine"></span>
					<span>def main():</span>
					<span className="breakLine"></span>
					<span className="tabbed">with open(product_list, &quot;r&quot;) as f:</span>
					<span className="doubleTabbed">rows = f.readlines()</span>
					<span className="breakLine"></span>
					<span className="tabbed">specs=[]</span>
					<span className="tabbed">for row in rows:</span>
					<span className="doubleTabbed">spec = make_specification(row)</span>
					<span className="doubleTabbed">specs.append(spec)</span>
					<span className="breakLine"></span>
					<span className="tabbed">return specs</span>
					<span className="breakLine"></span>
				</CodeBox>
				{/* <p>
					You can use the server file system during runtime. At runtime, 
					a variable named &quot;__FILES_ROOT&quot; which is string of the path 
					whose path can be temporarily used to store your file input.
					Here below is another example recieving zip file with 2 .csv files zipped and storing it to server file system.
				</p>
				<CodeBox>
					<span className="comment"># index.py</span>
					<span className="breakLine"></span>
					<span>from somewhere import process_data</span>
					<span>from zipfile import ZipFile</span>
					<span className='breakLine'></span>
					<span>your_zipfile=&quot;.zip&quot;</span>
					<span className="breakLine"></span>
					<span>def main():</span>
					<span className="breakLine"></span>
					<span className='tabbed'>with ZipFile(your_zipfile) as zf:</span>
					<span className='doubleTabbed'>for file in zf.namelist():</span>
					<span className="tripleTabbed">zf.extract(file, __FILES_ROOT)</span>
					<span className="breakLine"></span>
					<span className='tabbed'>with open(os.path.join(__FILES_ROOT, &quot;your_zipfile_name/csv1.csv&quot;), &quot;r&quot;) as f:</span>
					<span className="doubleTabbed">csv1 = f.readlines()</span>
					<span className="breakLine"></span>
					<span className='tabbed'>with open(os.path.join(__FILES_ROOT, &quot;your_zipfile_name/csv2.csv&quot;), &quot;r&quot;) as f:</span>
					<span className="doubleTabbed">csv2 = f.readlines()</span>
					<span className="tabbed comment"># Something will occur with1 files extracted from zipfile</span>
					<span className="tabbed">processed = process_data(csv1, csv2)</span>
					<span className="breakLine"></span>
					<span className="tabbed">return processed</span>
					<span className="breakLine"></span>
				</CodeBox> */}
				<p>
					There are several restrictions at file input. 
					<strong>
						(1) Each file should not exceed 10 megabytes,
						(2) Total file number should not exceed 3.
					</strong>
					Since mypy is in prototype stage, mypy is not capable to serve big, heavy files. Sorry for the inconvenience.
				</p>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch3'>
						<span>
							Log and Output <i className="bi bi-arrow-left-circle"></i>
						</span>
					</Link>
					<Link href='/tutorial/ch5'>
						<span>
							Customizing App Page <i className="bi bi-arrow-right-circle"></i>
						</span>
					</Link>
				</div>
			</div>
		</TutorialLayout>
	);
}

export default input;

import CodeBox from '@components/mixins/CodeBox';
import TutorialLayout from '@components/tutorial/TutorialLayout';
import React from 'react';
import Link from 'next/link';

function UsingModules() {
	return (
		<TutorialLayout>
			<div className="tutorialContent__root tutorial_usingModules">
				<h1>Using Modules</h1>
				<h2>We&apos;ll learn about how to install dependencies and to implement modules to your app, and also going to see prohibited modules among python built in modules</h2>
				<h3>#1. Dependencies</h3>
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
				<h3>#2. Prohibited modules</h3>
				<p>
					There are some prohibited modules for security reasons, which are the followings: 
					&quot;sys&quot;, &quot;subprocess&quot;. <br /> <br />
					Also, following functions, data, and a class from &quot;os&quot;module are also prohibited to use
				</p>
				<p>
					os.ctermid <br />
					os.environ <br />
					os.environb <br />
					os.chdir <br />
					os.fchdir <br />
					os.getcwd <br />
					os.fsencode <br />
					os.fsdecode <br />
					os.fspath <br />
					os.PathLike <br />
					os.getenv <br />
					os.getenvb <br />
					os.get_exec_path <br />
					os.getegid <br />
					os.geteuid <br />
					os.getgid <br />
					os.getgrouplist <br />
					os.getgroups <br />
					os.getlogin <br />
					os.getpgid <br />
					os.getpgrp <br />
					os.getpid <br />
					os.getppid <br />
					os.getpriority <br />
					os.PRIO_PROCESS <br />
					os.PRIO_PGRP <br />
					os.PRIO_USER <br />
					os.getresuid <br />
					os.getresgid <br />
					os.getuid <br />
					os.initgroups <br />
					os.putenv <br />
					os.setegid <br />
					os.seteuid <br />
					os.setgid <br />
					os.setgroups <br />
					os.setpgrp <br />
					os.setpgid <br />
					os.setpriority <br />
					os.setregid <br />
					os.setresgid <br />
					os.setresuid <br />
					os.setreuid <br />
					os.getsid <br />
					os.setsid <br />
					os.setuid <br />
					os.strerror <br />
					os.supports_bytes_environ <br />
					os.umask <br />
					os.uname <br />
					os.unsetenv <br />
				</p>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch5'>
						<span>
							Customize app page <i className="bi bi-arrow-left-circle"></i>
						</span>
					</Link>
				</div>
			</div>
		</TutorialLayout>
	);
}

export default UsingModules;

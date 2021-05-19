import TutorialLayout from '@components/tutorial/TutorialLayout'
import React from 'react'

function UsingModules() {
    return (
        <TutorialLayout>
            <div className="tutotialContent__root tutorial_usingModules">
                <h1>Using Modules</h1>
                <h2>We&apos;ll learn about how to install dependencies and to implement modules to your app</h2>
                <p></p>
				<div className="tutorial_onContentNavigation">
					<Link href='/tutorial/ch6'>
						<span>
							Using As API <i className="bi bi-arrow-left-circle"></i>
						</span>
					</Link>
				</div>
            </div>
        </TutorialLayout>
    )
}

export default UsingModules

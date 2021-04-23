import React from 'react';
import NavBar from '@components/NavBar';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import Footer from '@components/Footer';


class MyDocument extends Document {
	static async getInitialProps( ctx ) {
		const initialProps = await Document.getInitialProps( ctx );
		return { ...initialProps, };
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<NavBar />
					<div id='mainBody'>
						<Main />
					</div>
					<Footer />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

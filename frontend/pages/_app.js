import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '@redux/store';
import '@styles/globals.scss';
import Layout from 'layout/Layout';

class MyApp extends App {
	render() {
		const { Component, pageProps, ...others } = this.props;
		return (
			<Provider store={store}>
				<Layout {...pageProps} {...others}>
					<Component {...pageProps}></Component>
				</Layout>
			</Provider>
		);
	}
}

const makeStore = () => store;
const wrapper = createWrapper( makeStore );

export default wrapper.withRedux( MyApp );

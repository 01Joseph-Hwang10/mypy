import App from 'next/app';
import React from 'react';
import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import store from '@redux/store';
import '@styles/globals.scss';
import LayoutManager from '@layout/LayoutManager';

class MyApp extends App {
	render() {
		const { Component, pageProps, ...others } = this.props;
		return (
			<Provider store={store}>
				<LayoutManager>
					<Component {...pageProps} />
				</LayoutManager>
			</Provider>
		);
	}
}

const makeStore = () => store;
const wrapper = createWrapper( makeStore );

export default wrapper.withRedux( MyApp );

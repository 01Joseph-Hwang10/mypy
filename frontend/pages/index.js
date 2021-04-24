import React, { useEffect } from 'react';
import AppList from '@components/AppList';
import Link from 'next/link';
import SideBar from '@components/SideBar';
import LoginForm from '@components/login/LoginForm';
import { translateDistance } from '@functions/SignIn';
import { connect } from 'react-redux';
import { listApp, loading, loadListError, loadListSuccessful } from '@redux/slices/list-app';

function Home( {
	isLoading : IsLoading,
	appList : ListApps,
	loadListSuccessful : LoadListSuccessful,
	loadListError : LoadListError,
	loading : Loading,
	errorMessage : ErrorMessage,
	isSuccessful : IsSuccessful,
} ) {


	const animationStyle = {
		transform : `translateX(${translateDistance}rem)`,
	};

	const axiosAppList = async () => {
		Loading();
		const { ok, data, } = await listApp();
		if ( ok ) {
			LoadListSuccessful( data );
		} else {
			LoadListError( data );
		}
	};

	useEffect( () => {
		axiosAppList();
	}, [] );

	const appListProps = {
		IsLoading,
		AppList : ListApps,
		ErrorMessage,
		IsSuccessful,
	};

	return (
		<div id="contentRoot">
			<section className="mainContent">
				<Link href='/create'>
					<button className="createButton buttonRipple">
						<div>
							Create new app
						</div>
						<i className="bi bi-plus-circle-fill"></i>
					</button>
				</Link>
				<AppList {...appListProps} />
			</section>
			<section className="sideBarWrapper">
				<SideBar />
				<div id="loginFormWrapper" style={animationStyle}>
					<LoginForm />
				</div>
			</section>
		</div>
	);
}


const mapStateToProps = state => {
	return {
		appList : state.listApp.appList,
		isSuccessful : state.listApp.isSuccessful,
		isLoading : state.listApp.loading,
		errorMessage : state.listApp.errorMessage,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		loadListSuccessful : ( appList ) => dispatch( loadListSuccessful( appList ) ),
		loadListError : ( error ) => dispatch( loadListError( error ) ),
		loading : () => dispatch( loading() ),
	};   
};


export default connect( mapStateToProps, mapDispatchToProps )( Home );

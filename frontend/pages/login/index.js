import LoginForm from '@components/login/LoginForm';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function login( {
	signedIn : SignedIn,
	userId : UserId,
} ) {

	const router = useRouter();

	useEffect( ()=>{
		if ( SignedIn ) {
			router.push( `/mypy/${UserId}` );
		}
	} );

	return (
		<div id="loginContentRoot">
			<LoginForm />
		</div>
	);
}

const mapStateToProps = state => {
	return {
		signedIn : state.auth.signedIn,
		userId : state.auth.userId,
	};
};

export default connect( mapStateToProps, null )( login );

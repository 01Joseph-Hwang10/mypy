import { logout, signOut } from '@redux/slices/auth';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function Logout( {
	logout : dispatchLogout,
} ) {

	const router = useRouter();

	useEffect( async () => {
		await signOut();
		dispatchLogout();
		router.push( '/' );
	}, [] );

	return (
		<div>
            
		</div>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		logout : () => dispatch( logout() ),
	};
};

export default connect( null, mapDispatchToProps )( Logout );

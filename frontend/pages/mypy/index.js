import MypyPage from '@components/mypy/MypyPage';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

function MypyPublic( {
	signedIn : SignedIn,
	userId : UserId,
} ) {

	const router = useRouter();

	useEffect( ()=> {
		if ( SignedIn ) {
			router.push( `/mypy/${UserId}` );
		}
	}, [ SignedIn, ] );

	if ( SignedIn ) return <></>;
	return (
		<>
			<MypyPage />
		</>
	);
}

const mapStateToProps = state => {
	return {
		signedIn : state.auth.signedIn,
		userId : state.auth.userId,
	};
};


export default connect( mapStateToProps, null )( MypyPublic );

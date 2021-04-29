import MypyPage from '@components/mypy/MypyPage';
import React from 'react';
import { connect } from 'react-redux';

function MypyPrivate() {

	return (
		<MypyPage />
	);
}


const mapStateToProps = null;

const mapDispatchToProps = null;


export default connect( mapStateToProps, mapDispatchToProps )( MypyPrivate );

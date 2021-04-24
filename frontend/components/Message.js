import React from 'react';
import { connect } from 'react-redux';

function Message( {
	message : Message,
} ) {

	const animationStyle = {
		transform : 'translateY(-3rem)',
	};

	return (
		<div className="messageWrapper">
			<div className="message" style={animationStyle}>{Message}</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		message : state.message.message,
	};
};

export default connect( mapStateToProps, null )( Message );

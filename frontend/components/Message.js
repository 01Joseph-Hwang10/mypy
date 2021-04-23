import React from 'react';
import { connect } from 'react-redux';

function Message( {
	message : Message,
} ) {
	return (
		<div className="messageWrapper">
			<div className="message" style={{
				transform : 'translateY(-3rem)',
			}}>{Message}</div>
		</div>
	);
}

const mapStateToProps = state => {
	return {
		message : state.message.message,
	};
};

export default connect( mapStateToProps, null )( Message );
